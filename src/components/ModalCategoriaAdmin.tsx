import { PictureOutlined } from "@ant-design/icons"
import { Alert, Form, Input, Modal, Space } from "antd"
import type React from "react"
import { useEffect } from "react"
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext"
import { useNotificacao } from "../providers/NotificacaoProvider"
import { colors } from "../theme/colors"
import type { CategoriaRequestBody, CategoriaResponseBody } from "../types/cateogiras.type"

export const ModalCategoriaAdmin: React.FC<{
  editingCategory: CategoriaResponseBody | null,
  fecharModal: (state: boolean) => void,
  open: boolean,
}> = ({ editingCategory, open, fecharModal }) => {

  const [categoryForm] = Form.useForm<CategoriaRequestBody>();

  const { atualizarCategoria, adicionarCategoria } = useCategoriasProduto()

  const notificacao = useNotificacao()

  const handleSalvarCategoria = async () => {
    let res
    if (editingCategory) {
      res = await atualizarCategoria(editingCategory.id, categoryForm.getFieldValue('nome'));
    } else {
      res = await adicionarCategoria(categoryForm.getFieldValue('nome'));
    }
    notificacao({
      message: res.message,
      type: (res.ok)?'success':'error'
    })
  }

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
      onOk={handleSalvarCategoria}
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