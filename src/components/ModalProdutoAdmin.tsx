import { Col, Form, Input, InputNumber, Modal, Row, Select, Switch } from "antd"
import type React from "react"
import type { CategoriaResponseBody } from "../types/cateogiras.type"
import type { Produto } from "../types/produto.type"
import { useEffect } from "react"

export const ModalProdutoAdmin: React.FC<{
  editingProduct: Produto | null,
  isModalOpen: boolean,
  fecharModal: (state: boolean) => void
  categorias: CategoriaResponseBody[] | undefined
}> = ({ editingProduct, isModalOpen, categorias, fecharModal }) => {

  const [form] = Form.useForm();

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        ...editingProduct,
        image: editingProduct?.imagemCapa
      });
    } else {
      form.resetFields()
    }
  }, [editingProduct])

  return (
    <Modal
      title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
      open={isModalOpen}
      // onOk={handleSaveProduct}
      onCancel={() => fecharModal(false)}
      okText="Salvar"
      cancelText="Cancelar"
      width={600}
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
          <Input.TextArea rows={3} />
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
            <Form.Item name="originalPrice" label="Preço Original (Promoção)">
              <InputNumber
                prefix="R$"
                size="large"
                style={{ width: '100%' }}
                min={0}
                precision={2}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
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
          <Col xs={12}>
            <Form.Item
              name="inStock"
              label="Disponível"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch checkedChildren="Sim" unCheckedChildren="Não" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="image" label="URL da Imagem" rules={[{ required: true }]}>
          <Input size="large" placeholder="https://..." />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item name="altura" label="Altura (cm)">
              <InputNumber
                size="large"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="comprimento" label="Compimento (cm)">
              <InputNumber
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