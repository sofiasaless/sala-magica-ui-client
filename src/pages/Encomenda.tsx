import {
  BuildTwoTone,
  BulbOutlined,
  CrownTwoTone,
  FireTwoTone,
  LoadingOutlined,
  MessageTwoTone,
  PictureOutlined,
  RocketOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Grid,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
  Upload
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCategoriasProduto } from '../contexts/CategoriasProdutoContext';
import { useEncomendas } from '../hooks/useEncomendas';
import { useNotificacao } from '../providers/NotificacaoProvider';
import { CloudinaryService } from '../service/cloudnary.service';
import { colors } from '../theme/colors';
import type { EncomendaRequestBody } from '../types/encomenda.type';
import { AiHelperService } from '../service/ai-helper.service';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

export function FormularioEncomenda() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  const [form] = Form.useForm<EncomendaRequestBody>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fotos, setFotos] = useState<File[]>([])

  const [previewData, setPreviewData] = useState<Partial<EncomendaRequestBody> | null>(null);

  const screens = useBreakpoint();

  const floatNotificacao = useNotificacao();

  const { usuario, isAutenticado } = useAuth()

  const { enviar } = useEncomendas()

  const handleEnviar = async (valores: EncomendaRequestBody) => {
    const urlsDasImagens = await Promise.all(
      fotos.map((foto) => CloudinaryService.enviarImagem(foto))
    )

    const encomendaFinal: EncomendaRequestBody = {
      ...valores,
      solicitante: usuario?.uid || '',
      referencias: valores.referencias || '',
      imagemReferencia: urlsDasImagens
    }

    const resultado = await enviar(encomendaFinal);

    if (!resultado.ok) {
      floatNotificacao({
        type: 'error',
        message: 'Erro ao enviar encomenda',
        description: resultado.message
      })
      return
    }

    floatNotificacao({
      type: 'success',
      message: resultado.message,
      description: 'Em breve entraremos em contato!',
      placement: 'bottom'
    })

    form.resetFields();

  }

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    if (values.descricao || values.categoria_reference || values.altura || values.comprimento || values.referencias) {
      setPreviewData(values);
    }
  };

  const benefits = [
    { icon: <CrownTwoTone twoToneColor={colors.secondary} />, title: 'Design Exclusivo', description: 'Peça criada especialmente para você' },
    { icon: <BuildTwoTone twoToneColor={colors.primary} />, title: 'Medidas Personalizadas', description: 'Adaptamos ao seu espaço' },
    { icon: <MessageTwoTone twoToneColor={colors.secondary} />, title: 'Atendimento Direto', description: 'Converse pelo WhatsApp' },
    { icon: <FireTwoTone twoToneColor={colors.primary} />, title: 'Qualidade Artesanal', description: 'Feito à mão com carinho' }
  ];

  const { categoriasProdutos, encontrarNomePorId } = useCategoriasProduto()

  useEffect(() => {
    if (!isAutenticado) setComponentDisabled(true)
  }, [isAutenticado])

  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);

  const getDescriptionWordCount = (): number => {
    const description = form.getFieldValue('descricao') || '';
    return description.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
  };

  const canUseAI = (): boolean => {
    const categoria = form.getFieldValue('categoria_reference');
    return !!categoria && getDescriptionWordCount() >= 10;
  };

  const notificacao = useNotificacao()

  const handleAISuggestion = async () => {
    setIsGeneratingSuggestion(true)
    const resultado = await AiHelperService.sugerirDescricaoEncomenda({
      categoria: encontrarNomePorId(form.getFieldValue('categoria_reference'))!,
      descricaoInicial: form.getFieldValue('descricao')
    })

    if (resultado.ok) {
      notificacao({
        message: resultado.message,
        type: 'success',
        placement: 'bottom'
      })
      form.setFieldValue('descricao', resultado.datas?.sugestao);
      setIsGeneratingSuggestion(false)
      return
    }

    notificacao({
      message: resultado.message,
      type: 'error',
      placement: 'bottom'
    })
    setIsGeneratingSuggestion(false)
  }


  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title
          level={1}
          style={{
            color: '#08979C',
            marginBottom: 8
          }}
        >
          Encomenda Personalizada
        </Title>
        <Paragraph style={{ fontSize: 18, color: '#595959', maxWidth: 600, margin: '0 auto' }}>
          Não encontrou o que procura? Transformamos sua ideia em realidade!
          Descreva o que você imagina e envie para orçamento.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 48 }}>
        {benefits.map((benefit, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card
              style={{
                textAlign: 'center',
                borderRadius: 16,
                background: index % 2 === 0 ? '#E6FFFB' : '#FFF7E6',
                border: 'none',
                height: '100%'
              }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ fontSize: 40, marginBottom: 8 }}>{benefit.icon}</div>
              <Text strong style={{ display: 'block', marginBottom: 4, color: '#262626' }}>
                {benefit.title}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {benefit.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <Space>
                <RocketOutlined style={{ color: '#13C2C2' }} />
                <span>Descreva sua Encomenda</span>
              </Space>
            }
            style={{ borderRadius: 16 }}
          >
            <Form
              disabled={componentDisabled}
              form={form}
              layout="vertical"
              onValuesChange={handleFormChange}
              onFinish={handleEnviar}
            >
              <Form.Item
                name="categoria_reference"
                label="Categoria do Produto"
                rules={[{ required: true, message: 'Selecione uma categoria' }]}
              >
                <Select
                  placeholder="Selecione a categoria"
                  size="large"
                  options={categoriasProdutos?.map(cat => ({
                    label: cat.nome,
                    value: cat.id
                  }))}
                />
              </Form.Item>

              <Form.Item
                name="descricao"
                label="Descrição Detalhada"
                rules={[{ required: true, message: 'Descreva sua encomenda' }]}
              >
                <TextArea
                  placeholder="Descreva com detalhes o que você imagina: tema, cores, elementos, estilo..."
                  rows={5}
                  maxLength={1000}
                  showCount
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
              <Card
                size="small"
                style={{
                  background: 'linear-gradient(135deg, #F0F5FF 0%, #E6FFFB 100%)',
                  border: `1px dashed ${colors.primary}`,
                  borderRadius: 8,
                  marginBlock: 20
                }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Space>
                    <ThunderboltOutlined style={{ color: '#FAAD14', fontSize: 16 }} />
                    <Text strong style={{ color: '#262626', fontSize: 16 }}>
                      Melhorar descrição com IA
                    </Text>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 14, display: 'block' }}>
                    A IA pode melhorar sua descrição, adicionando detalhes e formatação profissional.
                    Para usar, selecione uma categoria e escreva pelo menos 10 palavras.
                  </Text>
                  <Tooltip
                    title={
                      !form.getFieldValue('categoria_reference')
                        ? 'Selecione uma categoria primeiro'
                        : getDescriptionWordCount() < 5
                          ? `Escreva mais ${5 - getDescriptionWordCount()} palavra(s)`
                          : 'Clique para aprimorar sua descrição'
                    }
                  >
                    <Button
                      type="primary"
                      size="small"
                      icon={isGeneratingSuggestion ? <LoadingOutlined /> : <ThunderboltOutlined />}
                      onClick={handleAISuggestion}
                      disabled={!canUseAI() || isGeneratingSuggestion}
                      loading={isGeneratingSuggestion}
                      style={{
                        background: canUseAI() ? 'linear-gradient(135deg, #FAAD14 0%, #FFC53D 100%)' : undefined,
                        borderColor: canUseAI() ? '#FAAD14' : undefined,
                        borderRadius: 6,
                        fontWeight: 500
                      }}
                    >
                      {isGeneratingSuggestion ? 'Gerando...' : 'Sugerir com IA'}
                    </Button>
                  </Tooltip>
                </Space>
              </Card>

              <Row gutter={16}>
                <Col xs={12}>
                  <Form.Item
                    name="altura"
                    label="Altura (cm)"
                  // rules={[{ required: true, message: 'Informe a altura' }]}
                  >
                    <InputNumber
                      min={10}
                      max={300}
                      placeholder="100"
                      size="large"
                      style={{ width: '100%' }}
                      addonAfter="cm"
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    name="comprimento"
                    label="Comprimento (cm)"
                  // rules={[{ required: true, message: 'Informe a largura' }]}
                  >
                    <InputNumber
                      min={10}
                      max={300}
                      placeholder="150"
                      size="large"
                      style={{ width: '100%' }}
                      addonAfter="cm"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="referencias"
                label="Link de Referência (opcional)"
              >
                <Input
                  type="url"
                  placeholder="https://pinterest.com/..."
                  size="large"
                  prefix={<BulbOutlined style={{ color: '#BFBFBF' }} />}
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                label="Imagem de Referência (opcional)"
                name='imagemReferencia'
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => {
                    setFileList(fileList)
                    const arquivos = fileList.map((f) => f.originFileObj as File)
                    setFotos(arquivos)
                  }}
                  beforeUpload={() => false}
                  maxCount={3}
                >
                  {fileList.length < 3 && (
                    <div>
                      <PictureOutlined style={{ fontSize: 24, color: '#13C2C2' }} />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Até 3 imagens para nos ajudar a entender melhor sua ideia
                </Text>
              </Form.Item>

              <Alert
                message="Orçamento sem compromisso"
                description="Após enviar, entraremos em contato pelo WhatsApp com o orçamento e prazo estimado."
                type="info"
                showIcon
                style={{ marginBottom: 24, borderRadius: 8 }}
              />

              {/* <Button
                type="primary"
                size="large"
                icon={<WhatsAppOutlined />}
                block
                style={{
                  background: '#25D366',
                  borderColor: '#25D366',
                  borderRadius: 12,
                  height: 56,
                  fontSize: 18,
                  fontWeight: 600
                }}
              >
                Enviar para Orçamento via WhatsApp
              </Button> */}

              <Button
                type='primary'
                size='large'
                htmlType="submit"
              >
                Enviar encomenda para orçamento</Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <span>Pré-visualização</span>
              </Space>
            }
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #E6FFFB 0%, #F5F5F5 100%)',
              position: screens.lg ? 'sticky' : 'relative',
              top: screens.lg ? 100 : 0
            }}
          >
            {previewData?.descricao ? (
              <div>
                {fileList[0]?.thumbUrl && (
                  <img
                    src={fileList[0].thumbUrl}
                    alt="Referência"
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 12,
                      marginBottom: 16
                    }}
                  />
                )}

                <Card
                  style={{ borderRadius: 12, background: 'white' }}
                  bodyStyle={{ padding: 16 }}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div>
                      <Text type="secondary">Categoria:</Text>
                      <br />
                      <Text strong style={{ color: colors.primary }}>{encontrarNomePorId(previewData.categoria_reference)}</Text>
                    </div>

                    <Divider style={{ margin: '8px 0' }} />

                    <div>
                      <Text type="secondary">Dimensões:</Text>
                      <br />
                      <Text strong>{previewData.altura}cm x {previewData.comprimento}cm</Text>
                    </div>

                    <Divider style={{ margin: '8px 0' }} />

                    <div>
                      <Text type="secondary">Descrição:</Text>
                      <br />
                      <Paragraph style={{ marginBottom: 0 }} ellipsis={{ rows: 4 }}>
                        {previewData.descricao}
                      </Paragraph>
                    </div>

                    {previewData.imagemReferencia && (
                      <>
                        <Divider style={{ margin: '8px 0' }} />
                        <div>
                          <Text type="secondary">Referência:</Text>
                          <br />
                          <a href={previewData.imagemReferencia[0]} target="_blank" rel="noopener noreferrer">
                            Ver link
                          </a>
                        </div>
                      </>
                    )}
                  </Space>
                </Card>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ fontSize: 64, marginBottom: 16, opacity: 0.5 }}>📝</div>
                <Text type="secondary">
                  Preencha o formulário para visualizar sua encomenda
                </Text>
              </div>
            )}
          </Card>

          <Card
            style={{ borderRadius: 16, marginTop: 24 }}
            bodyStyle={{ padding: 20 }}
          >
            <Title level={5} style={{ marginBottom: 16 }}>
              💡 Dicas para sua encomenda
            </Title>
            <ul style={{ paddingLeft: 20, color: '#595959', lineHeight: 2 }}>
              <li>Seja específico sobre cores e tema</li>
              <li>Informe se precisa de personalização com nomes</li>
              <li>Mencione o prazo desejado</li>
              <li>Imagens de referência ajudam muito!</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
