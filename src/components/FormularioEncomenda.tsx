import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload
} from 'antd';
import React from 'react';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormularioEncomenda: React.FC = () => {
  // const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  return (
    <Form
      labelCol={{ span: 'auto', }}
      wrapperCol={{ span: 'auto' }}
      layout="vertical"
      disabled={false}
      style={{
        maxWidth: 600,
        minWidth: 400
        // backgroundColor: 'red',
      }}
    >
      <Form.Item label="Categoria do pedido" required>
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Referências">
        <Input placeholder='Link de imagem ou descrição de um modelo que goste, informe aqui.'/>
      </Form.Item>

      <Form.Item label="Enviar referências por foto" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload action="/upload.do" listType="picture-card">
          <button
            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
            type="button"
          >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item label="Tamanho em comprimento (cm)">
        <InputNumber min={0} style={{ width: '100%' }}/>
      </Form.Item>

      <Form.Item label="Tamanho em altura (cm)">
        <InputNumber min={0} style={{ width: '100%' }}/>
      </Form.Item>

      <Form.Item label="Descrição do pedido" required>
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button size='middle'>Enviar encomenda</Button>
      </Form.Item>

    </Form>
  );
};

export default () => <FormularioEncomenda />;