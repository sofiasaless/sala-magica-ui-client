import { Card, Table } from "antd"
import type { EncomendaResponseBody } from "../../types/encomenda.type"
import type { ColunaEncomenda } from "./types"

export const Encomendas: React.FC<{
  encomendas: EncomendaResponseBody[],
  encomendasColunas: ColunaEncomenda[],
  handleViewOrder: (encomenda: EncomendaResponseBody) => void
}> = ({encomendas, encomendasColunas, handleViewOrder}) => {
  return (
    <Card style={{ borderRadius: 12 }} title="Gerenciar Encomendas">
      <Table
        dataSource={encomendas}
        columns={encomendasColunas}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 600 }}
        onRow={(record) => ({
          onClick: () => handleViewOrder(record),
          style: { cursor: 'pointer' }
        })}
      />
    </Card>
  )
}