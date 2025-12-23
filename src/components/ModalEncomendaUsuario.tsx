import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, ExpandOutlined, FileTextOutlined, HistoryOutlined, LinkOutlined, RocketOutlined, StopOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Image, Modal, Row, Space, Steps, Tag, Timeline, Typography } from "antd";
import type React from "react";
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext";
import type { EncomendaResponseBody } from "../types/encomenda.type";
import { formatarDataHoraAPI } from "../util/datas.util";
import { getOrderStatusColor, getOrderStatusLabel, getStatusStep } from "../util/encomenda.util";

const { Text, Paragraph } = Typography;

export const ModalEncomendaUsuario: React.FC<{
  encomendaSelecionada: EncomendaResponseBody | undefined,
  orderModalVisible: boolean,
  fechar: (state: boolean) => void
}> = ({ encomendaSelecionada, orderModalVisible, fechar }) => {

  const { encontrarNomePorId } = useCategoriasProduto()

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined style={{ color: '#13C2C2' }} />
          <span>Detalhes da Encomenda #{encomendaSelecionada?.id}</span>
        </Space>
      }
      open={orderModalVisible}
      onCancel={() => fechar(false)}
      footer={[
        <Button key="close" onClick={() => fechar(false)}>
          Fechar
        </Button>
      ]}
      width={600}
    >
      {encomendaSelecionada && (
        <div>
          {encomendaSelecionada.status !== 'CANCELADO' ? (
            <Steps
              current={getStatusStep(encomendaSelecionada.status)}
              size="small"
              style={{ marginBottom: 24 }}
              items={[
                { title: 'Em Análise', icon: <ClockCircleOutlined /> },
                { title: 'Em Produção', icon: <RocketOutlined /> },
                { title: 'Finalizado', icon: <CheckCircleOutlined /> }
              ]}
            />
          ) : (
            <Alert
              message="Encomenda Cancelada"
              type="error"
              showIcon
              icon={<StopOutlined />}
              style={{ marginBottom: 24 }}
            />
          )}

          {encomendaSelecionada.imagemReferencia && (
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <Image
                src={encomendaSelecionada.imagemReferencia[0]}
                alt="Imagem de referência"
                style={{ maxHeight: 200, borderRadius: 8 }}
              />
            </div>
          )}

          <Card
            size="small"
            style={{
              background: '#E6FFFB',
              borderRadius: 12,
              marginBottom: 16
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text type="secondary">
                  <FileTextOutlined style={{ marginRight: 8 }} />
                  Descrição
                </Text>
                <Paragraph style={{ marginBottom: 0, marginTop: 4 }}>
                  {encomendaSelecionada.descricao}
                </Paragraph>
              </div>
            </Space>
          </Card>

          <Row gutter={[16, 16]}>
            <Col xs={12}>
              <Card size="small" style={{ borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Categoria</Text>
                <div>
                  <Tag color="cyan" style={{ marginTop: 4 }}>
                    {encontrarNomePorId(encomendaSelecionada.categoria_reference)}
                  </Tag>
                </div>
              </Card>
            </Col>
            <Col xs={12}>
              <Card size="small" style={{ borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ExpandOutlined style={{ marginRight: 4 }} />
                  Dimensões
                </Text>
                <div>
                  <Text strong style={{ color: '#13C2C2' }}>
                    {encomendaSelecionada.altura}cm x {encomendaSelecionada.comprimento}cm
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={12}>
              <Card size="small" style={{ borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <CalendarOutlined style={{ marginRight: 4 }} />
                  Data do Pedido
                </Text>
                <div>
                  <Text strong>
                    {formatarDataHoraAPI(encomendaSelecionada.dataEncomenda)}
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={12}>
              <Card size="small" style={{ borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Status</Text>
                <div>
                  <Tag color={getOrderStatusColor(encomendaSelecionada.status)} style={{ marginTop: 4 }}>
                    {getOrderStatusLabel(encomendaSelecionada.status)}
                  </Tag>
                </div>
              </Card>
            </Col>
          </Row>

          {encomendaSelecionada.referencias && (
            <Card size="small" style={{ borderRadius: 8, marginTop: 16 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                <LinkOutlined style={{ marginRight: 4 }} />
                Link de Referência
              </Text>
              <div>
                <a
                  href={encomendaSelecionada.referencias}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#13C2C2' }}
                >
                  {encomendaSelecionada.referencias}
                </a>
              </div>
            </Card>
          )}

          {encomendaSelecionada.respostas && encomendaSelecionada.respostas.length > 0 && (
            <Card
              size="small"
              title={
                <Space>
                  <HistoryOutlined />
                  <span>Atualizações ({encomendaSelecionada.respostas.length})</span>
                </Space>
              }
              style={{ marginTop: 16 }}
            >
              <Timeline
                items={encomendaSelecionada.respostas.map((resposta, index) => ({
                  color: 'cyan',
                  children: (
                    <div key={index}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {formatarDataHoraAPI(resposta.data)}
                      </Text>
                      <Paragraph style={{ marginBottom: 0, marginTop: 4, whiteSpace: 'pre-wrap' }}>
                        {resposta.mensagem}
                      </Paragraph>
                    </div>
                  )
                }))}
              />
            </Card>
          )}
        </div>
      )}
    </Modal>
  )
}