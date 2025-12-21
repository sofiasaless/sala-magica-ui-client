import { BulbOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined, HistoryOutlined, LoadingOutlined, RocketOutlined, SendOutlined, StopOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Divider, Image, Modal, Popconfirm, Row, Space, Steps, Tag, Timeline, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext";
import { useEncomendas } from "../hooks/useEncomendas";
import { useNotificacao } from "../providers/NotificacaoProvider";
import { AiHelperService } from "../service/ai-helper.service";
import { colors } from "../theme/colors";
import type { EncomendaResponseBody, EncomendaStatus } from "../types/encomenda.type";
import { formatarDataHoraAPI } from "../util/datas.util";
import { getStatusColor, getStatusStep } from "../util/encomenda.util";

const { Text, Paragraph } = Typography;

export const ModalEncomendaAdmin: React.FC<{
  orderModalVisible: boolean,
  selectedOrder: EncomendaResponseBody | null,
  fecharModal: (state: boolean) => void,
  solicitantes: Map<string, string>
}> = ({ orderModalVisible, selectedOrder, fecharModal, solicitantes }) => {

  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

  const { encontrarNomePorId } = useCategoriasProduto();

  const { ataulizarEncomenda } = useEncomendas()

  const { responderEncomenda, isEnviandoResp } = useEncomendas()

  const notificacao = useNotificacao()

  const [status, setStatus] = useState<EncomendaStatus>('NOVA')

  const [respota, setResposta] = useState<string>('')

  const handleGerarRespostaComIA = async () => {
    setIsGeneratingResponse(true)
    if (selectedOrder) {
      const hookRes = await AiHelperService.sugerirRespostaEncomenda({
        categoria: encontrarNomePorId(selectedOrder?.categoria_reference) as string,
        cliente_nome: solicitantes.get(selectedOrder.solicitante) as string,
        descricao_encomenda: selectedOrder.descricao,
        status_encomenda: status
      })

      if (hookRes.ok) setResposta(hookRes.datas?.sugestao!);
      notificacao({
        message: hookRes.message,
        type: (hookRes.ok) ? 'success' : 'error'
      })
    }
    setIsGeneratingResponse(false)
  }

  const handleAtualizarStatusEncomenda = async (status: EncomendaStatus, id_encomenda: string) => {
    const hookRes = await ataulizarEncomenda({ status: status }, id_encomenda);
    notificacao({
      message: hookRes.message,
      type: (hookRes.ok) ? 'success' : 'error'
    })
    if (hookRes.ok && selectedOrder) {
      setStatus(status)
    }
  }

  const handleResponderEncomenda = async () => {
    const hookRes = await responderEncomenda({
      order: {
        solicitante: selectedOrder?.solicitante as string,
        id: selectedOrder?.id!
      },
      response: respota
    })
    notificacao({
      message: hookRes.message,
      type: (hookRes.ok) ? 'success' : 'error'
    })
  }

  useEffect(() => {
    if (selectedOrder) {
      setStatus(selectedOrder.status);
      setResposta('')
    }
  }, [selectedOrder])

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
          {status !== 'CANCELADO' ? (
            <Steps
              current={getStatusStep(status)}
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

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card size="small" title="Informações do Pedido">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text type="secondary">Cliente:</Text>
                    <Text strong style={{ marginLeft: 8 }}>{solicitantes.get(selectedOrder.solicitante) ?? 'Carregando...'}</Text>
                  </div>
                  <div>
                    <Text type="secondary">Categoria:</Text>
                    <Tag color="cyan" style={{ marginLeft: 8 }}>{encontrarNomePorId(selectedOrder.categoria_reference)}</Tag>
                  </div>
                  <div>
                    <Text type="secondary">Data do Pedido:</Text>
                    <Text style={{ marginLeft: 8 }}>
                      {formatarDataHoraAPI(selectedOrder.dataEncomenda)}
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

          {selectedOrder.referencias && (
            <Card size="small" title="Links de Referência" style={{ marginTop: 16 }}>
              <a href={selectedOrder.referencias} target="_blank" rel="noopener noreferrer">
                {selectedOrder.referencias}
              </a>
            </Card>
          )}

          <Divider />

          <Card size="small" title="Alterar Status" style={{ marginBottom: 16 }}>
            <Space wrap>
              <Button
                icon={<ClockCircleOutlined />}
                onClick={() => handleAtualizarStatusEncomenda('EM ANÁLISE', selectedOrder.id!)}
                disabled={status === 'EM ANÁLISE'}
              >
                Em Análise
              </Button>
              <Button
                type="primary"
                icon={<RocketOutlined />}
                onClick={() => handleAtualizarStatusEncomenda('EM PRODUÇÃO', selectedOrder.id!)}
                disabled={status === 'EM PRODUÇÃO'}
                style={{ background: '#722ED1', borderColor: '#722ED1' }}
              >
                Em Produção
              </Button>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAtualizarStatusEncomenda('FINALIZADO', selectedOrder.id!)}
                disabled={status === 'FINALIZADO'}
                style={{ background: '#52C41A', borderColor: '#52C41A' }}
              >
                Finalizado
              </Button>
              <Popconfirm
                title="Cancelar encomenda?"
                description="Esta ação não pode ser desfeita."
                onConfirm={() => handleAtualizarStatusEncomenda('CANCELADO', selectedOrder.id!)}
                okText="Sim, cancelar"
                cancelText="Não"
              >
                <Button
                  danger
                  icon={<StopOutlined />}
                  disabled={status === 'CANCELADO'}
                >
                  Cancelar
                </Button>
              </Popconfirm>
            </Space>
          </Card>

          {selectedOrder.respostas && selectedOrder.respostas.length > 0 && (
            <Card
              size="small"
              title={
                <Space>
                  <HistoryOutlined />
                  <span>Respostas enviadas ({selectedOrder.respostas.length})</span>
                </Space>
              }
              style={{ marginTop: 16 }}
            >
              <Timeline
                items={selectedOrder.respostas.map((resposta, index) => ({
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
                    onClick={handleGerarRespostaComIA}
                    disabled={isGeneratingResponse}
                    style={{ background: colors.primary, borderColor: colors.primary }}
                  >
                    {isGeneratingResponse ? 'Gerando...' : 'Gerar com IA'}
                  </Button>
                }
                style={{ marginBottom: 12 }}
              />
              <TextArea
                rows={5}
                value={respota}
                onChange={(e) => setResposta(e.target.value)}
                placeholder="Digite sua mensagem para o cliente..."
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={isEnviandoResp}
                onClick={handleResponderEncomenda}
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
