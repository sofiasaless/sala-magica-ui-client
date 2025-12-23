import { Avatar, Button, List, Space, Tag } from "antd"
import type React from "react"
import type { NotificacaoResponseBody, TipoNotificacao } from "../types/notificacao.type"
import { BellOutlined, EyeOutlined, FileTextOutlined, MailOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { colors } from "../theme/colors";

export const getNotificationTypeIcon = (tipo: TipoNotificacao) => {
  switch (tipo) {
    case 'PRODUTO': return <ShoppingCartOutlined />;
    case 'ENCOMENDA': return <FileTextOutlined />;
    case 'ENCOMENDA_RESPOSTA': return <MailOutlined />;
    case 'SISTEMA': return <BellOutlined />;
    default: return <BellOutlined />;
  }
};

export const getNotificationTypeColor = (tipo: TipoNotificacao) => {
  switch (tipo) {
    case 'PRODUTO': return colors.primary;
    case 'ENCOMENDA': return '#722ED1';
    case 'ENCOMENDA_RESPOSTA': return '#52C41A';
    case 'SISTEMA': return '#FAAD14';
    default: return colors.primary;
  }
};

export const getNotificationTypeLabel = (tipo: TipoNotificacao) => {
  switch (tipo) {
    case 'PRODUTO': return 'Produto';
    case 'ENCOMENDA': return 'Encomenda';
    case 'ENCOMENDA_RESPOSTA': return 'Resposta de Encomenda';
    case 'SISTEMA': return 'Sistema';
    default: return 'Notificação';
  }
};

export const ItemNotificacao: React.FC<{
  notification: NotificacaoResponseBody
  handleViewNotification: (not: NotificacaoResponseBody) => void
}> = ({ notification, handleViewNotification }) => {
  return (
    <List.Item
      style={{
        background: notification.lido ? 'transparent' : '#E6FFFB',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        cursor: 'pointer'
      }}
      onClick={() => handleViewNotification(notification)}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            style={{
              background: getNotificationTypeColor(notification.tipo)
            }}
            icon={getNotificationTypeIcon(notification.tipo)}
          />
        }
        title={
          <Space>
            <span>{notification.titulo}</span>
            <Tag color={getNotificationTypeColor(notification.tipo)} style={{ fontSize: 10 }}>
              {getNotificationTypeLabel(notification.tipo)}
            </Tag>
          </Space>
        }
        description={new Date(notification.dataNotificacao).toLocaleDateString('pt-BR')}
      />
      <Space>
        {!notification.lido && (
          <Tag color="cyan">Nova</Tag>
        )}
        <Button
          type="text"
          icon={<EyeOutlined />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleViewNotification(notification);
          }}
        />
      </Space>
    </List.Item>
  )
}