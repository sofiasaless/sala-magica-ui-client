import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Table } from "antd"
import { colors } from "../../theme/colors"
import type { Produto } from "../../types/produto.type"
import type { ColunaProduto } from "./types"

export const Produtos: React.FC<{
  handleAddProduct: () => void,
  produtos: Produto[] | undefined,
  productColumns: ColunaProduto[]
}> = ({handleAddProduct, produtos, productColumns}) => {
  return (
    <Card
      style={{ borderRadius: 12 }}
      title="Gerenciar Produtos"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
          style={{ background: colors.primary, borderColor: colors.primary }}
        >
          Novo Produto
        </Button>
      }
    >
      <Table
        dataSource={produtos}
        columns={productColumns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 600 }}
      />
    </Card>
  )
}