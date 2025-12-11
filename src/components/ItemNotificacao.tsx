import { Avatar, List, Tag } from "antd"
import { colors } from "../theme/colors"
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import type React from "react"

export const ItemNotificacao: React.FC<{notification: any}> = ( { notification } ) => {
  return (
    <List.Item
      style={{
        // background: notification.read ? 'transparent' : '#E6FFFB',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8
      }}
    // onClick={() => markNotificationAsRead(notification.id)}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            style={{
              background:
                notification.type === 'success'
                  ? '#52C41A'
                  : notification.type === 'warning'
                    ? '#FAAD14'
                    : colors.primary
            }}
            icon={
              notification.type === 'success' ? (
                <CheckCircleOutlined />
              ) : (
                <ClockCircleOutlined />
              )
            }
          />
        }
        title={notification.message}
        description={new Date(notification.createdAt).toLocaleDateString('pt-BR')}
      />
      {!notification.read && (
        <Tag color="cyan" style={{ marginLeft: 8 }}>Nova</Tag>
      )}
    </List.Item>
  )
}