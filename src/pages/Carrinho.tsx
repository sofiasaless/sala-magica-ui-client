import {
  DeleteOutlined,
  GiftOutlined,
  LoginOutlined,
  SafetyOutlined,
  ShoppingOutlined,
  UserOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Grid,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  message
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useItensCarrinho } from '../contexts/ItensCarrinhoContext';
import { colors } from '../theme/colors';
import type { ItemCarrinho } from '../types/produto.type';
import { useNotificacao } from '../providers/NotificacaoProvider';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export const Carrinho = () => {
  const screens = useBreakpoint();

  const { carrinho, removerItem, limparItens, alterarQuantidade } = useItensCarrinho()

  const finalTotal = carrinho.reduce((acumulador, item) => {
    return acumulador + (item.quantidade * item.preco); // Retorna o novo valor do acumulador
  }, 0);

  const { isAutenticado } = useAuth()

  const navigator = useNavigate()

  const notificacao = useNotificacao()

  const handleRemove = async (item_id: string, productId: string) => {
    const resultado = await removerItem(item_id, productId);
    notificacao({
      message: resultado.message,
      placement: 'bottom',
      type: (resultado.ok)?'success':'error'
    })
  };

  const handleWhatsAppCheckout = () => {
    console.info(carrinho)
    message.success('Pedido enviado para o WhatsApp!');
  };

  const colunas = [
    {
      title: 'Produto',
      dataIndex: 'product',
      key: 'product',
      render: (_: unknown, record: ItemCarrinho) => (
        <Space>
          <img
            src={record.imagemCapa}
            alt={record.titulo}
            style={{
              width: 64,
              height: 64,
              objectFit: 'cover',
              borderRadius: 8
            }}
          />
          <div>
            <Text strong style={{ display: 'block' }}>{record.titulo}</Text>
            <Tag color="cyan" style={{ marginTop: 4 }}>{record.categoria}</Tag>
          </div>
        </Space>
      )
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      render: (_: unknown, record: ItemCarrinho) => (
        <Text style={{ color: colors.primary, fontWeight: 500 }}>
          R$ {record.preco.toFixed(2)}
        </Text>
      )
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: unknown, record: ItemCarrinho) => (
        <InputNumber
          min={0}
          max={10}
          value={record.quantidade}
          onChange={(value) => {
            alterarQuantidade(value!, record.id!)
          }}
          size="small"
        />
      )
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (_: unknown, record: ItemCarrinho) => (
        <Text strong style={{ color: '#08979C' }}>
          R$ {(record.preco * record.quantidade).toFixed(2)}
        </Text>
      )
    },
    {
      title: '',
      key: 'actions',
      render: (_: unknown, record: ItemCarrinho) => (
        <Popconfirm
          title="Remover item"
          description="Deseja remover este item do carrinho?"
          onConfirm={() => handleRemove(record.id_item!, record.id!)}
          okText="Sim"
          cancelText="Não"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      )
    }
  ];

  if (carrinho.length === 0) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Card style={{ borderRadius: 16, textAlign: 'center', padding: 48 }}>
          <Empty
            image={
              <div style={{ fontSize: 80, marginBottom: 16 }}>🛒</div>
            }
            description={
              <div>
                <Title level={4} style={{ color: '#262626' }}>
                  Seu carrinho está vazio
                </Title>
                <Paragraph type="secondary">
                  Explore nosso catálogo e encontre decorações incríveis para sua sala de aula!
                </Paragraph>
              </div>
            }
          >
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={() => navigator('/')}
              style={{
                background: colors.primary,
                borderColor: colors.primary,
                borderRadius: 8,
                height: 48,
                paddingInline: 32
              }}
            >
              Ver Catálogo
            </Button>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        <ShoppingOutlined style={{ marginRight: 12, color: colors.primary }} />
        Meu Carrinho
        <Tag color="cyan" style={{ marginLeft: 12, fontSize: 14 }}>
          {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'}
        </Tag>
      </Title>

      <Alert
        message={
          <Space>
            <UserOutlined />
            <span>Você não está logado na Sala Mágica</span>
          </Space>
        }
        description={
          <div>
            <Text>
              Seus itens não poderão ser acessados em outros dispositivos! Entre com sua conta ou faça seu cadastro para acessar seu carrinho de qualquer lugar.
            </Text>
            <div style={{ marginTop: 12 }}>
              <Space>
                <Button
                  type="primary"
                  size="small"
                  icon={<LoginOutlined />}
                  onClick={() => navigator('/entrar')}
                  style={{
                    background: colors.primary,
                    borderColor: colors.primary,
                    borderRadius: 6
                  }}
                >
                  Entrar
                </Button>
                <Button
                  size="small"
                  onClick={() => navigator('/cadastro')}
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: 6
                  }}
                >
                  Criar Conta
                </Button>
              </Space>
            </div>
          </div>
        }
        type="warning"
        showIcon
        style={{
          display: (isAutenticado) ? 'none' : '',
          marginBottom: 24,
          borderRadius: 12,
          background: '#FFFBE6',
          borderColor: '#FAAD14'
        }}
      />

      <Row gutter={[24, 24]}>
        {/* Cart Items */}
        <Col xs={24} lg={16}>
          <Card style={{ borderRadius: 16 }}>
            {screens.md ? (
              <Table
                dataSource={carrinho}
                columns={colunas}
                rowKey={(record) => record.id!}
                pagination={false}
              />
            ) : (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {carrinho.map(item => (
                  <Card
                    key={item.id}
                    size="small"
                    style={{ borderRadius: 12 }}
                  >
                    <Row gutter={[12, 12]} align="middle">
                      <Col xs={6}>
                        <img
                          src={item.imagemCapa}
                          alt={item.titulo}
                          style={{
                            width: '100%',
                            borderRadius: 8,
                            aspectRatio: '1'
                          }}
                        />
                      </Col>
                      <Col xs={18}>
                        <Text strong ellipsis style={{ display: 'block' }}>
                          {item.titulo}
                        </Text>
                        <Text style={{ color: colors.primary }}>
                          R$ {item.preco.toFixed(2)}
                        </Text>
                        <div style={{ marginTop: 8 }}>
                          <Space>
                            <InputNumber
                              min={1}
                              max={10}
                              value={item.quantidade}
                              size="small"
                              style={{ width: 70 }}
                            />
                            <Text strong>
                              = R$ {(item.preco * item.quantidade).toFixed(2)}
                            </Text>
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => handleRemove(item.id_item!, item.id!)}
                            />
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            )}

            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <Popconfirm
                title="Limpar carrinho"
                description="Deseja remover todos os itens?"
                onConfirm={() => {
                  limparItens();
                  message.success('Carrinho limpo!');
                }}
                okText="Sim"
                cancelText="Não"
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<DeleteOutlined />}>
                  Limpar Carrinho
                </Button>
              </Popconfirm>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <GiftOutlined style={{ color: '#FAAD14' }} />
                <span>Resumo do Pedido</span>
              </Space>
            }
            style={{ borderRadius: 16, position: screens.lg ? 'sticky' : 'relative', top: 100 }}
          >
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 600 }}>Total</Text>
                <Text style={{ fontSize: 24, fontWeight: 600, color: colors.primary }}>R$ {finalTotal.toFixed(2)}</Text>
              </div>

              <Text type="secondary" style={{ fontSize: 18 }}>
                ou 3x de R$ {(finalTotal / 3).toFixed(2)} sem juros
              </Text>

              <Divider style={{ margin: '12px 0' }} />

              <Button
                type="primary"
                size="large"
                icon={<WhatsAppOutlined />}
                onClick={handleWhatsAppCheckout}
                block
                style={{
                  background: '#25D366',
                  borderColor: '#25D366',
                  borderRadius: 12,
                  height: 52,
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                Finalizar via WhatsApp
              </Button>

              <Button
                size="large"
                onClick={() => navigator('/')}
                block
                style={{
                  borderRadius: 12,
                  height: 48,
                  borderColor: colors.primary,
                  color: colors.primary
                }}
              >
                Continuar Comprando
              </Button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 8
                }}
              >
                <SafetyOutlined style={{ color: '#52C41A' }} />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Compra 100% segura
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};