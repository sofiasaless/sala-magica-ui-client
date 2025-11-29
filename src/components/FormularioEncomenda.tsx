import { PlusOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload
} from 'antd';
import React, { useEffect, useState } from 'react';
import { categorias_ } from '../constants/categorias.constant';
import { useAuthUser } from '../hooks/useAuthUser';
import { useNotificacao } from '../providers/NotificacaoProvider';
import { CloudinaryService } from '../service/cloudnary.service';
import { EncomendaService } from '../service/encomenda.service';
import type { Encomenda } from '../types/encomenda.type';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormularioEncomenda: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const { isAutenticado } = useAuthUser()

  const [fotos, setFotos] = useState<File[]>([])

  const [form] = Form.useForm<Encomenda>();
  
  const floatNotificacao = useNotificacao();

  const handleEnviar = async (valores: Encomenda) => {
    try {
      const urlsDasImagens = await Promise.all(
        fotos.map((foto) => CloudinaryService.enviarImagem(foto))
      )

      const encomendaFinal: Encomenda = {
        ...valores,
        imagemReferencia: urlsDasImagens
      }

      const resultado = await EncomendaService.enviarEncomenda(encomendaFinal);

      floatNotificacao({
        message: resultado.titulo,
        description: resultado.mensagem,
        placement: 'bottom'
      })

      form.resetFields();

    } catch (error) {
      floatNotificacao({
        message: 'Erro ao enviar a encomenda',
        description: 'Tente novamente mais tarde'
      })
    }
  }


  useEffect(() => {
    if (!isAutenticado) setComponentDisabled(true)
  }, [isAutenticado])

  return (
    <>
      <Alert
        style={{
          display: (isAutenticado) ? 'none' : ''
        }}
        description="Você precisa ter uma conta na Sala Mágica para enviar encomendas."
        type="warning"
        showIcon
      />

      <Form
        form={form}
        labelCol={{ span: 'auto', }}
        wrapperCol={{ span: 'auto' }}
        layout="vertical"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
          minWidth: 400
          // backgroundColor: 'red',
        }}
        onFinish={handleEnviar}
      >
        <Form.Item label="Categoria do pedido" required name='categoria'>
          <Select>
            {categorias_.map((categoria, indice) => (
              <Select.Option key={indice} value={categoria}>{categoria}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Referências" name='referencias'>
          <Input onChange={(e) => form.setFieldValue('referencias', e.target.value)} placeholder='Link de imagem ou descrição de um modelo que goste, informe aqui.' />
        </Form.Item>

        <Form.Item label="Enviar referências por foto" valuePropName="fileList" getValueFromEvent={normFile} name='imagemReferencia'>
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // impede upload automático
            onChange={({ fileList }) => {
              const arquivos = fileList.map((f) => f.originFileObj as File)
              setFotos(arquivos)
            }}
          >
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>


        <Form.Item label="Tamanho em comprimento (cm)" name='comprimento'>
          <InputNumber onChange={(e) => form.setFieldValue('comprimento', e?.valueOf())} min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Tamanho em altura (cm)" name='altura'>
          <InputNumber onChange={(e) => form.setFieldValue('altura', e?.valueOf())} min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Descrição do pedido" required name='descricao'
          rules={[
            { required: true, message: 'Por favor, descreva um pocuo de como quer sua encomenda.' }
          ]}
        >
          <TextArea onChange={(e) => form.setFieldValue('descricao', e.target.value)} rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" size='middle'>Enviar encomenda</Button>
        </Form.Item>

      </Form>
    </>
  );
};

export default () => <FormularioEncomenda />;