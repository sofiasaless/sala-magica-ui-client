import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined, RocketOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic, Steps, Table } from "antd";
import { useEffect, useState } from "react";
import { useEncomendas } from "../../hooks/useEncomendas";
import { colors } from "../../theme/colors";
import type { EncomendaResponseBody } from "../../types/encomenda.type";
import type { ColunaEncomenda } from "./types";
import { useUsuarios } from "../../hooks/useUsuarios";
import { useAuth } from "../../contexts/AuthContext";

export const VisaoGeral: React.FC<{
  encomendas: EncomendaResponseBody[]
  encomendasColunas: ColunaEncomenda[],
  qtdProdutos: number | undefined,
  handleViewOrder: (payload: EncomendaResponseBody) => void,
  navegar: (key: string) => void
}> = ({ encomendas, qtdProdutos, encomendasColunas, handleViewOrder, navegar }) => {

  const { contarEncomendas } = useEncomendas()
  const { contarUsuarios } = useUsuarios()
  const [qtdUltimoMes, setQtdUltimoMes] = useState<number>()
  const [qtdUsuarios, setQtdUsuarios] = useState<number>()

  const { isAutenticado } = useAuth()

  useEffect(() => {
    const carregarInfos = async () => {
      // total do ultimo mes
      const res_um = await contarEncomendas({
        ultimoMes: true
      })
      setQtdUltimoMes(res_um.datas?.total)

      const res_us = await contarUsuarios();
      setQtdUsuarios(res_us.datas?.total)
    }

    carregarInfos();
  }, [isAutenticado])

  const stats = [
    { title: 'Produtos Ativos', value: qtdProdutos, icon: <ShoppingOutlined />, color: colors.primary },
    { title: 'Pedidos Este Mês', value: qtdUltimoMes, icon: <FileTextOutlined />, color: '#FAAD14', suffix: <ArrowUpOutlined style={{ color: '#52C41A' }} /> },
    { title: 'Clientes Ativos', value: qtdUsuarios, icon: <UserOutlined />, color: '#1677FF' },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {stats.map((stat, index) => (
          <Col xs={12} md={6} key={index}>
            <Card
              style={{
                borderRadius: 12,
                borderLeft: `4px solid ${stat.color}`
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card
            title="Pedidos Recentes"
            style={{ borderRadius: 12 }}
            extra={<Button onClick={() => navegar('encomendas')} type="link">Ver todos</Button>}
          >
            <Table
              dataSource={encomendas.slice(0, 3)}
              columns={encomendasColunas.filter(col => col.key !== 'actions')}
              rowKey="id"
              pagination={false}
              size="small"
              onRow={(record) => ({
                onClick: () => handleViewOrder(record),
                style: { cursor: 'pointer' }
              })}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Status de Produção" style={{ borderRadius: 12 }}>
            <Steps
              direction="vertical"
              size="small"
              current={2}
              items={[
                {
                  title: 'Pedidos Pendentes',
                  description: `${encomendas.filter(o => o.status === 'EM ANÁLISE').length} aguardando análise`,
                  icon: <ClockCircleOutlined />
                },
                {
                  title: 'Em Produção',
                  description: `${encomendas.filter(o => o.status === 'EM PRODUÇÃO').length} pedidos`,
                  icon: <RocketOutlined />
                },
                {
                  title: 'Finalizados',
                  description: `${encomendas.filter(o => o.status === 'FINALIZADO').length} prontos`,
                  icon: <CheckCircleOutlined />
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}