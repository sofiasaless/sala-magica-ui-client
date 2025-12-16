import {
  DeleteOutlined,
  GiftOutlined,
  SafetyOutlined,
  ShoppingOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import {
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
import { useItensCarrinho } from '../contexts/ItensCarrinhoContext';
import { colors } from '../theme/colors';
import type { Produto } from '../types/produto.type';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export const Carrinho = () => {
  const screens = useBreakpoint();

  const { itensCarrinho, removerItem, limparItens } = useItensCarrinho()

  const shippingCost = itensCarrinho.length >= 150 ? 0 : 15.90;
  const finalTotal = itensCarrinho.length + shippingCost;

  const navigator = useNavigate()

  const handleRemove = (productId: string) => {
    removerItem(productId);
    message.success('Item removido do carrinho');
  };

  const handleWhatsAppCheckout = () => {
    message.success('Pedido enviado para o WhatsApp!');
  };

  const colunas = [
    {
      title: 'Produto',
      dataIndex: 'product',
      key: 'product',
      render: (_: unknown, record: Produto) => (
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
      render: (_: unknown, record: Produto) => (
        <Text style={{ color: colors.primary, fontWeight: 500 }}>
          R$ {record.preco.toFixed(2)}
        </Text>
      )
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: unknown, record: Produto) => (
        <InputNumber
          min={1}
          max={10}
          value={1}
          size="small"
        />
      )
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (_: unknown, record: Produto) => (
        <Text strong style={{ color: '#08979C' }}>
          R$ {(record.preco * 1).toFixed(2)}
        </Text>
      )
    },
    {
      title: '',
      key: 'actions',
      render: (_: unknown, record: Produto) => (
        <Popconfirm
          title="Remover item"
          description="Deseja remover este item do carrinho?"
          onConfirm={() => handleRemove(record.id!)}
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

  if (itensCarrinho.length === 0) {
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
          {itensCarrinho.length} {itensCarrinho.length === 1 ? 'item' : 'itens'}
        </Tag>
      </Title>

      <Row gutter={[24, 24]}>
        {/* Cart Items */}
        <Col xs={24} lg={16}>
          <Card style={{ borderRadius: 16 }}>
            {screens.md ? (
              <Table
                dataSource={itensCarrinho}
                columns={colunas}
                rowKey={(record) => record.id!}
                pagination={false}
              />
            ) : (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {itensCarrinho.map(item => (
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
                              value={1}
                              size="small"
                              style={{ width: 70 }}
                            />
                            <Text strong>
                              = R$ {(item.preco * 1).toFixed(2)}
                            </Text>
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => handleRemove(item.id!)}
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

        {/* Order Summary */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Subtotal ({itensCarrinho.length} itens)</Text>
                <Text>R$ {(32).toFixed(2)}</Text>
              </div>

              <Divider style={{ margin: '8px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={3} style={{ marginBottom: 0 }}>Total</Title>
                <Title level={3} style={{ marginBottom: 0, color: colors.primary }}>
                  R$ {finalTotal.toFixed(2)}
                </Title>
              </div>

              <Text type="secondary" style={{ fontSize: 12 }}>
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