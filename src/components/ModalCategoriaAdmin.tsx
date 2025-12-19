import { PictureOutlined } from "@ant-design/icons"
import { Alert, Form, Input, Modal, Space } from "antd"
import { colors } from "../theme/colors"
import type React from "react"
import type { CategoriaResponseBody } from "../types/cateogiras.type"
import { useEffect } from "react"

export const ModalCategoriaAdmin: React.FC<{
  editingCategory: CategoriaResponseBody | null,
  fecharModal: (state: boolean) => void,
  open: boolean,
}> = ({ editingCategory, open, fecharModal }) => {

  const [categoryForm] = Form.useForm<CategoriaResponseBody>();

  useEffect(() => {
    if (editingCategory) {
      categoryForm.setFieldsValue(editingCategory);
    } else {
      categoryForm.resetFields()
    }
  }, [editingCategory])

  return (
    <Modal
      title={
        <Space>
          <PictureOutlined style={{ color: colors.primary }} />
          <span>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</span>
        </Space>
      }
      open={open}
      // onOk={handleSaveCategory}
      onCancel={() => fecharModal(false)}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form form={categoryForm} layout="vertical">
        <Form.Item
          name="nome"
          label="Nome da Categoria"
          rules={[{ required: true, message: 'Informe o nome da categoria' }]}
        >
          <Input size="large" placeholder="Ex: Murais, Painéis, etc." />
        </Form.Item>
        <Alert
          message="Dica"
          description="As categorias ajudam os clientes a encontrar produtos mais facilmente. Escolha nomes claros e objetivos."
          type="info"
          showIcon
        />
      </Form>
    </Modal>
  )
}