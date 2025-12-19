import { BulbOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined, LoadingOutlined, RocketOutlined, SendOutlined, StopOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Image, Modal, Popconfirm, Row, Space, Steps, Tag, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { colors } from "../theme/colors";
import type { EncomendaResponseBody } from "../types/encomenda.type";
import React, { useState } from "react";
import { getStatusColor, getStatusStep } from "../util/encomenda.util";

const { Text, Paragraph } = Typography;

export const ModalEncomendaAdmin: React.FC<{
  orderModalVisible: boolean,
  selectedOrder: EncomendaResponseBody | null,
  fecharModal: (state: boolean) => void
}> = ({orderModalVisible, selectedOrder, fecharModal}) => {

  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined style={{ color: colors.primary }} />
          <span>Detalhes da Encomenda #{selectedOrder?.id}</span>
        </Space>
      }
      open={orderModalVisible}
      onCancel={() => fecharModal(false)}
      footer={null}
      width={700}
    >
      {selectedOrder && (
        <div>
          {selectedOrder.status !== 'CANCELADO' ? (
            <Steps
              current={getStatusStep(selectedOrder.status)}
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

          {/* EncomendaResponseBody Info */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card size="small" title="Informações do Pedido">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text type="secondary">Cliente:</Text>
                    <Text strong style={{ marginLeft: 8 }}>{selectedOrder.solicitante}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Categoria:</Text>
                    <Tag color="cyan" style={{ marginLeft: 8 }}>{selectedOrder.categoria_reference}</Tag>
                  </div>
                  <div>
                    <Text type="secondary">Data do Pedido:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {new Date(selectedOrder.data_envio).toLocaleDateString('pt-BR')}
                    </Text>
                  </div>
                  {(selectedOrder.altura || selectedOrder.comprimento) && (
                    <div>
                      <Text type="secondary">Dimensões:</Text>
                      <Text style={{ marginLeft: 8 }}>
                        {selectedOrder.altura && `${selectedOrder.altura}cm (altura)`}
                        {selectedOrder.altura && selectedOrder.comprimento && ' x '}
                        {selectedOrder.comprimento && `${selectedOrder.comprimento}cm (comprimento)`}
                      </Text>
                    </div>
                  )}
                  <div>
                    <Text type="secondary">Status:</Text>
                    <Tag color={getStatusColor(selectedOrder.status)} style={{ marginLeft: 8 }}>
                      {selectedOrder.status}
                    </Tag>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card size="small" title="Descrição">
                <Paragraph style={{ marginBottom: 0 }}>
                  {selectedOrder.descricao}
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Reference Images */}
          {selectedOrder.imagemReferencia && selectedOrder.imagemReferencia.length > 0 && (
            <Card size="small" title="Imagens de Referência" style={{ marginTop: 16 }}>
              <Image.PreviewGroup>
                <Space>
                  {selectedOrder.imagemReferencia.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Referência ${index + 1}`}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  ))}
                </Space>
              </Image.PreviewGroup>
            </Card>
          )}

          {/* Reference URLs */}
          {selectedOrder.referencias && (
            <Card size="small" title="Links de Referência" style={{ marginTop: 16 }}>
              <a href={selectedOrder.referencias} target="_blank" rel="noopener noreferrer">
                {selectedOrder.referencias}
              </a>
            </Card>
          )}

          <Divider />

          {/* Status Actions */}
          <Card size="small" title="Alterar Status" style={{ marginBottom: 16 }}>
            <Space wrap>
              <Button
                icon={<ClockCircleOutlined />}
                // onClick={() => handleUpdateOrderStatus('EM ANÁLISE')}
                disabled={selectedOrder.status === 'EM ANÁLISE'}
              >
                Em Análise
              </Button>
              <Button
                type="primary"
                icon={<RocketOutlined />}
                // onClick={() => handleUpdateOrderStatus('EM PRODUÇÃO')}
                disabled={selectedOrder.status === 'EM PRODUÇÃO'}
                style={{ background: '#722ED1', borderColor: '#722ED1' }}
              >
                Em Produção
              </Button>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                // onClick={() => handleUpdateOrderStatus('FINALIZADO')}
                disabled={selectedOrder.status === 'FINALIZADO'}
                style={{ background: '#52C41A', borderColor: '#52C41A' }}
              >
                Finalizado
              </Button>
              <Popconfirm
                title="Cancelar encomenda?"
                description="Esta ação não pode ser desfeita."
                // onConfirm={() => handleUpdateOrderStatus('CANCELADO')}
                okText="Sim, cancelar"
                cancelText="Não"
              >
                <Button
                  danger
                  icon={<StopOutlined />}
                  disabled={selectedOrder.status === 'CANCELADO'}
                >
                  Cancelar
                </Button>
              </Popconfirm>
            </Space>
          </Card>

          {/* Send Response */}
          <Card
            size="small"
            title={
              <Space>
                <SendOutlined />
                <span>Enviar Resposta ao Cliente</span>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="Sugestão com IA"
                description="Use a IA para gerar uma mensagem personalizada baseada no status e detalhes do pedido."
                type="info"
                showIcon
                icon={<BulbOutlined />}
                action={
                  <Button
                    size="small"
                    type="primary"
                    icon={isGeneratingResponse ? <LoadingOutlined /> : <ThunderboltOutlined />}
                    // onClick={generateAIResponse}
                    // disabled={isGeneratingResponse}
                    style={{ background: colors.primary, borderColor: colors.primary }}
                  >
                    {isGeneratingResponse ? 'Gerando...' : 'Gerar com IA'}
                  </Button>
                }
                style={{ marginBottom: 12 }}
              />
              <TextArea
                rows={5}
                // value={responseText}
                // onChange={(e) => setResponseText(e.target.value)}
                placeholder="Digite sua mensagem para o cliente..."
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                // onClick={handleSendResponse}
                style={{ background: colors.primary, borderColor: colors.primary }}
              >
                Enviar Mensagem
              </Button>
            </Space>
          </Card>
        </div>
      )}
    </Modal>
  )
}
