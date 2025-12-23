import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Card, Col, Popconfirm, Row, Space, Tag } from "antd"
import type { CategoriaResponseBody } from "../../types/cateogiras.type"
import { useCategoriasProduto } from "../../contexts/CategoriasProdutoContext"
import { useNotificacao } from "../../providers/NotificacaoProvider"

export const Conteudo: React.FC<{
  handleAddCategory: () => void,
  categorias: CategoriaResponseBody[] | undefined,
  handleEditCategory: (cat: CategoriaResponseBody) => void
}> = ({ handleAddCategory, handleEditCategory, categorias }) => {

  const { excluirCategoria } = useCategoriasProduto()

  const handleExcluir = async (id: string) => {
    const res = await excluirCategoria(id)
    notificacao({
      message: res.message,
      type: (res.ok) ? 'info' : 'error'
    })
  }

  const notificacao = useNotificacao();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card
          title="Categorias"
          style={{ borderRadius: 12 }}
          extra={
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={handleAddCategory}
            >
              Adicionar
            </Button>
          }
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {categorias?.map((cat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  background: '#FAFAFA',
                  borderRadius: 8
                }}
              >
                <Tag color="cyan">{cat.nome}</Tag>
                <Space>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => handleEditCategory(cat)}
                  />
                  <Popconfirm
                    title="Remover categoria?"
                    description="Produtos desta categoria não serão removidos."
                    onConfirm={() => handleExcluir(cat.id)}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                  </Popconfirm>
                </Space>
              </div>
            ))}
          </Space>
        </Card>
      </Col>
    </Row>
  )
}