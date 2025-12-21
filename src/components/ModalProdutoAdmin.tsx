import { PlusOutlined } from "@ant-design/icons"
import { Card, Col, Form, Input, InputNumber, Modal, Row, Select, Switch, Upload, type UploadFile } from "antd"
import type React from "react"
import { useEffect, useState } from "react"
import { useProdutosGeral } from "../hooks/useProdutosGeral"
import { useNotificacao } from "../providers/NotificacaoProvider"
import type { CategoriaResponseBody } from "../types/cateogiras.type"
import type { Produto } from "../types/produto.type"
import { CloudinaryService } from "../service/cloudnary.service"
import type { HookResponse } from "../types/hookResponse.type"

export const ModalProdutoAdmin: React.FC<{
  editingProduct: Produto | null,
  isModalOpen: boolean,
  fecharModal: (state: boolean) => void
  categorias: CategoriaResponseBody[] | undefined
}> = ({ editingProduct, isModalOpen, categorias, fecharModal }) => {

  const [form] = Form.useForm<Partial<Produto>>();

  const notificacao = useNotificacao()

  const { cadastrarProduto, atualizarProduto } = useProdutosGeral()

  const handleUpNewImages = async () => {
    let imgs: string[] = [];

    const novasImagens = arquivosImgs
      .filter(file => !!file.originFileObj)
      .map(file => file.originFileObj as File);

    if (novasImagens.length > 0) {
      imgs = await Promise.all(
        novasImagens.map(img => CloudinaryService.enviarImagem(img))
      );
    }

    const imagensSobreviventes =
      editingProduct?.imagens?.filter(img =>
        arquivosImgs.some(imgObj => imgObj.url === img)
      ) ?? [];

    imgs = imgs.concat(imagensSobreviventes);

    let imgCapa = '';

    if (arquivoImgCapa.length > 0) {
      if (arquivoImgCapa[0].originFileObj) {
        imgCapa = await CloudinaryService.enviarImagem(
          arquivoImgCapa[0].originFileObj as File
        );
      } else {
        imgCapa = arquivoImgCapa[0].url as string;
      }
    }

    return {
      imgCapa,
      imgs
    };
  };

  const [isSalvando, setIsSalvando] = useState<boolean>(false)
  const handleSalvar = async () => {
    try {
      setIsSalvando(true)

      const values = form.getFieldsValue()

      const imgResponse = await handleUpNewImages();

      const payload: Partial<Produto> = {
        ...values,
        imagemCapa: imgResponse.imgCapa,
        imagens: imgResponse.imgs
      }

      console.info(payload)

      let res: HookResponse<Partial<Produto>> = {} as HookResponse<Partial<Produto>>
      // se chegar um produto visualizar, significa que se trata da atualização de um produto
      if (editingProduct) {
        res = await atualizarProduto(payload, editingProduct.id as string);
      } else {
        res = await cadastrarProduto(payload)
      }

      notificacao({
        message: res.message,
        type: (res.ok) ? 'success' : 'error'
      })
    } catch (error: any) {
      notificacao({
        message: error.message,
        type: 'error'
      })
    } finally {
      setIsSalvando(false)
    }
  }

  const [arquivoImgCapa, setArquivoImgCapa] = useState<UploadFile[]>([]);
  const [arquivosImgs, setArquivosImgs] = useState<UploadFile[]>([]);



  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        ...editingProduct,
        imagemCapa: editingProduct?.imagemCapa
      });

      setArquivoImgCapa([{ uid: '1', name: 'image.png', status: 'done', url: form.getFieldValue('imagemCapa') }]);
      const formatados: UploadFile<any>[] = (form.getFieldValue('imagens') as string[]).map((img, indice) => {
        return { uid: indice.toString(), name: 'image.png', status: 'done', url: img }
      })
      setArquivosImgs(formatados);
    } else {
      setArquivoImgCapa([])
      setArquivosImgs([])
      form.resetFields()
    }
  }, [editingProduct])

  return (
    <Modal
      title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
      open={isModalOpen}
      onOk={handleSalvar}
      onCancel={() => {
        fecharModal(false)
      }}
      okText="Salvar"
      cancelText="Cancelar"
      width={600}
      loading={isSalvando}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="titulo"
          label="Nome do Produto"
          rules={[{ required: true, message: 'Informe o nome' }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="modelagem"
          label="Modelagem e confecção"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item
              name="preco"
              label="Preço"
              rules={[{ required: true }]}
            >
              <InputNumber
                prefix="R$"
                size="large"
                style={{ width: '100%' }}
                min={0}
                precision={2}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              name="categoria_reference"
              label="Categoria"
              rules={[{ required: true }]}
            >
              <Select
                size="large"
                options={categorias?.map(c => ({ label: c.nome, value: c.id }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item
              name="ativo"
              label="Disponível"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>
          </Col>
        </Row>
        <Card size="default" title="Imagem de capa" style={{ marginTop: 16 }}>
          <Upload
            listType="picture-card"
            fileList={arquivoImgCapa}
            maxCount={1}
            beforeUpload={() => false}
            onChange={({ fileList }) => {
              setArquivoImgCapa(fileList.slice(-1));
            }}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Capa do produto</div>
            </button>
          </Upload>
        </Card>
        <Card size="small" title="Imagens" style={{ marginTop: 16 }}>
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={() => false}
            fileList={arquivosImgs}
            onChange={({ fileList }) => {
              setArquivosImgs(fileList);
            }}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Imagens do produto</div>
            </button>
          </Upload>
        </Card>
        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item name="altura" label="Altura (cm)">
              <InputNumber
                name="altura"
                size="large"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="comprimento" label="Compimento (cm)">
              <InputNumber
                name="comprimento"
                size="large"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}