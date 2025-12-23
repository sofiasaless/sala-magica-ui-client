import { CalendarOutlined, LinkOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Modal, Row, Space, Tag, Typography } from "antd";
import type { NotificacaoResponseBody } from "../types/notificacao.type";
import { getNotificationTypeColor, getNotificationTypeIcon, getNotificationTypeLabel } from "./ItemNotificacao";
import { formatarDataHoraAPI } from "../util/datas.util";
import { useEffect } from "react";
import { useNotificacoes } from "../contexts/NotificacoesContext";

const { Title, Text, Paragraph } = Typography;

export const ModalNotificacaoUsuario: React.FC<{
  selectedNotification: NotificacaoResponseBody | undefined,
  fecharModal: () => void,
  modalVisivel: boolean
}> = ({ selectedNotification, fecharModal, modalVisivel }) => {

  const { marcarNotComoLida } = useNotificacoes()

  useEffect(() => {
    if (selectedNotification) {
      if (!selectedNotification.lido) {
        console.info(`marcando not de id ${selectedNotification.id} como lida.....`)
        marcarNotComoLida(selectedNotification.id as string);
      }
    }
  }, [selectedNotification])

  return (
    <Modal
      title={
        <Space>
          {selectedNotification && getNotificationTypeIcon(selectedNotification.tipo)}
          <span>Detalhes da Notificação</span>
        </Space>
      }
      open={modalVisivel}
      onCancel={() => fecharModal()}
      footer={[
        selectedNotification?.url && (
          <Button
            key="action"
            type="primary"
            onClick={() => {
              if (selectedNotification.url) {
                // onNavigate(selectedNotification.url);
              }
              fecharModal();
            }}
            style={{ background: '#13C2C2', borderColor: '#13C2C2' }}
          >
            Ver Mais
          </Button>
        ),
        <Button key="close" onClick={() => fecharModal()}>
          Fechar
        </Button>
      ].filter(Boolean)}
      width={500}
    >
      {selectedNotification && (
        <div>
          {/* Notification Header */}
          <div style={{ marginBottom: 16 }}>
            <Space align="center" style={{ marginBottom: 8 }}>
              <Avatar
                size={48}
                style={{ background: getNotificationTypeColor(selectedNotification.tipo) }}
                icon={getNotificationTypeIcon(selectedNotification.tipo)}
              />
              <div>
                <Title level={5} style={{ marginBottom: 0 }}>
                  {selectedNotification.titulo}
                </Title>
                <Space size="small">
                  <Tag color={getNotificationTypeColor(selectedNotification.tipo)}>
                    {getNotificationTypeLabel(selectedNotification.tipo)}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    <CalendarOutlined style={{ marginRight: 4 }} />
                    {formatarDataHoraAPI(selectedNotification.dataNotificacao)}
                  </Text>
                </Space>
              </div>
            </Space>
          </div>

          <Card
            size="small"
            style={{
              background: '#F6FFED',
              borderRadius: 12,
              border: `1px solid ${getNotificationTypeColor(selectedNotification.tipo)}20`
            }}
          >
            <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
              {selectedNotification.mensagem}
            </Paragraph>
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={12}>
              <Card size="small" style={{ borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Tipo</Text>
                <div>
                  <Tag color={getNotificationTypeColor(selectedNotification.tipo)} style={{ marginTop: 4 }}>
                    {getNotificationTypeLabel(selectedNotification.tipo)}
                  </Tag>
                </div>
              </Card>
            </Col>
            <Col xs={12}>
              <Card size="small" style={{ borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Status</Text>
                <div>
                  <Tag color={selectedNotification.lido ? 'default' : 'cyan'} style={{ marginTop: 4 }}>
                    {selectedNotification.lido ? 'Lida' : 'Não lida'}
                  </Tag>
                </div>
              </Card>
            </Col>
          </Row>

          {selectedNotification.url && (
            <Card size="small" style={{ borderRadius: 8, marginTop: 16 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                <LinkOutlined style={{ marginRight: 4 }} />
                Link Relacionado
              </Text>
              <div>
                <a
                  href={selectedNotification.url}
                  onClick={(e) => {
                    e.preventDefault();
                    // onNavigate(selectedNotification.url!);
                    fecharModal();
                  }}
                  style={{ color: '#13C2C2' }}
                >
                  {selectedNotification.url}
                </a>
              </div>
            </Card>
          )}
        </div>
      )}
    </Modal>
  )
}