import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Table } from "antd"
import { colors } from "../../theme/colors"
import type { Produto } from "../../types/produto.type"
import type { ColunaProduto } from "./types"
import { useState } from "react"

interface TablePaginationProps {
  pageSize: number,
  totalProdutos: number | undefined,
  paginarAdiante: () => Promise<void>
  paginarVoltar: () => Promise<void>
}

export const Produtos: React.FC<{
  handleAddProduct: () => void,
  produtos: Produto[] | undefined,
  productColumns: ColunaProduto[],
  paginationProps: TablePaginationProps
}> = ({ handleAddProduct, produtos, productColumns, paginationProps }) => {

  const [page, setPage] = useState<number>(1)

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
        pagination={{
          pageSize: paginationProps.pageSize,
          current: page,
          simple: {
            readOnly: true
          },
          onChange: (pageClicked) => {
            if (pageClicked > page) {
              setPage(pageClicked)
              paginationProps.paginarAdiante()              
            } else {
              setPage(pageClicked)
              paginationProps.paginarVoltar()
            }
          },
          total: paginationProps.totalProdutos
        }}
        scroll={{ x: 600 }}
      />
    </Card>
  )
}