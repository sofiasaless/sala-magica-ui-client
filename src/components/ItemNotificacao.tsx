import { Avatar, List, Tag } from "antd"
import { colors } from "../theme/colors"
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import type React from "react"
import type { NotificacaoResponseBody } from "../types/notificacao.type"
import { formatarDataHoraAPI } from "../util/datas.util"

export const ItemNotificacao: React.FC<{notification: NotificacaoResponseBody}> = ( { notification } ) => {
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
                notification.lido === true
                  ? '#52C41A'
                  : notification.lido === false
                    ? '#FAAD14'
                    : colors.primary
            }}
            icon={
              notification.lido === true ? (
                <CheckCircleOutlined />
              ) : (
                <ClockCircleOutlined />
              )
            }
          />
        }
        title={notification.titulo}
        description={formatarDataHoraAPI(notification.dataNotificacao)}
      />
      {!notification.lido && (
        <Tag color="cyan" style={{ marginLeft: 8 }}>Nova</Tag>
      )}
    </List.Item>
  )
}