import { Button, Divider, Space, Tag, Typography } from "antd";
import type React from "react";
import type { EncomendaResponseBody } from "../types/encomenda.type";
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext";
import { getStatusColor } from "../util/encomenda.util";
import { EyeOutlined } from "@ant-design/icons";
import { colors } from "../theme/colors";
const { Text, Paragraph } = Typography;

export const CardEncomenda: React.FC<{ 
  encomenda: EncomendaResponseBody,
  handleViewOrder: (encomenda: EncomendaResponseBody) => void
}> = ({ encomenda, handleViewOrder }) => {

  const { encontrarNomePorId } = useCategoriasProduto();

  return (
    <div style={{ paddingBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <Text strong>Encomenda #{encomenda.id}</Text>
        <Tag color={getStatusColor(encomenda.status)}>
          {(encomenda.status === 'NOVA' || encomenda.status === undefined) ? 'ENVIADA' : encomenda.status}
        </Tag>
      </div>
      <Paragraph
        type="secondary"
        ellipsis={{ rows: 2 }}
        style={{ marginBottom: 8, marginTop: 4 }}
      >
        {encomenda.descricao}
      </Paragraph>
      <Space split={<Divider type="vertical" />}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {encontrarNomePorId(encomenda.categoria_reference)}
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {encomenda.altura}cm x {encomenda.comprimento}cm
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {new Date().toLocaleDateString('pt-BR')}
        </Text>
      </Space>
      
      <div style={{ marginTop: 12 }}>
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleViewOrder(encomenda)}
          style={{
            background: colors.primary,
            borderColor: colors.primary,
            borderRadius: 6
          }}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  )
}