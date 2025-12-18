import { Divider, Space, Tag, Typography } from "antd";
import type React from "react";
import type { EncomendaResponseBody } from "../types/encomenda.type";
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext";
const { Text, Paragraph } = Typography;

export const CardEncomenda: React.FC<{ encomenda: EncomendaResponseBody }> = ({ encomenda }) => {
  
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'quoted': return 'blue';
      case 'approved': return 'cyan';
      case 'production': return 'purple';
      case 'completed': return 'green';
      default: return 'default';
    }
  };

  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Aguardando Orçamento';
      case 'quoted': return 'Orçamento Enviado';
      case 'approved': return 'Aprovado';
      case 'production': return 'Em Produção';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  const { encontrarNomePorId } = useCategoriasProduto();

  return (
    <div style={{ paddingBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <Text strong>Encomenda #{encomenda.id}</Text>
        <Tag color={getOrderStatusColor('production')}>
          {getOrderStatusLabel('production')}
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
    </div>
  )
}