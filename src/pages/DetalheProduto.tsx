import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Grid,
  Image,
  InputNumber,
  Row,
  Space,
  Tag,
  Typography
} from 'antd';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useItensCarrinho } from '../contexts/ItensCarrinhoContext';
import { useProdutosFavoritos } from '../contexts/ProdutosFavoritosContext';
import { useProdutosGeral } from '../hooks/useProdutosGeral';
import { useProdutosPaginados } from '../hooks/useProdutosPaginados';
import { useNotificacao } from '../providers/NotificacaoProvider';
import { colors } from '../theme/colors';
import { produtoToItemCarrinho } from '../util/carrinho.util';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export function DetalhesProduto() {

  const { id } = useParams()

  const navigator = useNavigate()

  const screens = useBreakpoint();

  const { adicionarItem } = useItensCarrinho()

  const [quantity, setQuantity] = useState(1);
  const { produto, buscarProduto, carregandoProdutos } = useProdutosGeral()
  const { produtosPaginados, paginar, carregandoPaginados } = useProdutosPaginados();

  const [isFav, setIsFav] = useState<boolean>(false)
  const { isAutenticado } = useAuth()
  const { curtirOuDescurtirProduto, recarregarProdutosFavoritos, isProdutoFavoritado } = useProdutosFavoritos()

  const handleFavAction = async () => {
    if (isAutenticado) {
      const requisicaoResult = await curtirOuDescurtirProduto(produto?.id!);
      if (requisicaoResult.status === HttpStatusCode.Ok) {
        await recarregarProdutosFavoritos();
        setIsFav(!isFav)
      }
      return
    }
  }

  const notificacao = useNotificacao()

  useEffect(() => {
    if (id) buscarProduto(id)
    paginar({
      limit: 4,
      params: {
        navigation: 'first'
      }
    })
  }, [id])

  useEffect(() => {
    if (!isFav) {
      setIsFav(isProdutoFavoritado(produto?.id))
    }
  }, [isAutenticado, produto])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          {
            title: (
              <span onClick={() => navigator('')} style={{ cursor: 'pointer' }}>
                <HomeOutlined /> Início
              </span>
            )
          },
          { title: produto?.categoria },
          { title: produto?.titulo }
        ]}
      />

      <Card
        loading={carregandoProdutos}
        style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}
        bodyStyle={{ padding: screens.md ? 32 : 16 }}
      >
        <Row gutter={[32, 24]}>
          {/* Product Images */}
          <Col xs={24} md={12}>
            <Image.PreviewGroup>
              <div style={{ marginBottom: 16 }}>
                <Image
                  src={produto?.imagemCapa}
                  alt={produto?.titulo}
                  style={{
                    width: '100%',
                    maxHeight: 400,
                    objectFit: 'cover',
                    borderRadius: 12
                  }}
                />
              </div>
              {(produto?.imagens !== undefined && produto?.imagens.length > 1) && (
                <Space size={8}>
                  {produto?.imagens.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${produto?.titulo} ${index + 1}`}
                      width={80}
                      height={80}
                      style={{
                        objectFit: 'cover',
                        borderRadius: 8,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Space>
              )}
            </Image.PreviewGroup>
          </Col>

          <Col xs={24} md={12}>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div>
                <Tag color="cyan" style={{ marginBottom: 8 }}>{produto?.categoria}</Tag>
                <Title level={2} style={{ marginBottom: 8, color: '#262626' }}>
                  {produto?.titulo}
                </Title>
                {/* <Space>
                    <StarFilled style={{ color: '#FAAD14' }} />
                    <Text>4.9</Text>
                    <Text type="secondary">(127 avaliações)</Text>
                  </Space> */}
              </div>

              <div>
                {/* {produto?.originalPrice && (
                    <div>
                      <Text delete type="secondary" style={{ fontSize: 18 }}>
                        R$ {produto?.originalPrice.toFixed(2)}
                      </Text>
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        -{Math.round((1 - produto?.price / produto?.originalPrice) * 100)}%
                      </Tag>
                    </div>
                  )} */}
                <Title level={1} style={{ color: colors.primary, marginBottom: 0, marginTop: 4 }}>
                  R$ {produto?.preco.toFixed(2)}
                </Title>
                <Text type="secondary">ou 3x de R$ {(produto?.preco! / 3).toFixed(2)} sem juros</Text>
              </div>

              <div>
                {produto?.ativo ? (
                  <Tag icon={<CheckCircleOutlined />} color="success" style={{ fontSize: 14 }}>
                    Em estoque - Pronta entrega
                  </Tag>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color="error" style={{ fontSize: 14 }}>
                    Indisponível - Sob encomenda
                  </Tag>
                )}
              </div>

              <Divider style={{ margin: '8px 0' }} />

              <Paragraph style={{ fontSize: 15, color: '#595959', lineHeight: 1.8 }}>
                {produto?.descricao}
              </Paragraph>

              <div>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>
                  Quantidade:
                </Text>
                <InputNumber
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  size="large"
                  style={{ width: 120 }}
                />
                <Text type="secondary" style={{ marginLeft: 12 }}>
                  Total: <Text strong style={{ color: colors.primary }}>R$ {(produto?.preco! * quantity).toFixed(2)}</Text>
                </Text>
              </div>

              <Space wrap style={{ width: '100%' }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={async (e) => {
                    e.stopPropagation();
                    const result = await adicionarItem(produtoToItemCarrinho(produto!, quantity));

                    if (result.ok) {
                      notificacao({
                        message: `"${produto?.titulo}" adicionado ao carrinho!`,
                        type: 'success',
                        placement: 'bottom'
                      })
                    } else {
                      notificacao({
                        message: `Erro ao adicionar produto`,
                        type: 'error',
                        description: result.message,
                        placement: 'bottom'
                      })
                    }
                  }}
                  style={{
                    background: colors.primary,
                    borderColor: colors.primary,
                    borderRadius: 8,
                    height: 48,
                    paddingInline: 32
                  }}
                >
                  Adicionar ao Carrinho
                </Button>
                <Button
                  type="primary"
                  size="large"
                  icon={<WhatsAppOutlined />}
                  style={{
                    background: '#25D366',
                    borderColor: '#25D366',
                    borderRadius: 8,
                    height: 48,
                    paddingInline: 24
                  }}
                >
                  WhatsApp
                </Button>
              </Space>

              <Space>
                <Button
                  icon={isFav ? <HeartFilled style={{ color: '#FF4D4F' }} /> : <HeartOutlined />}
                  onClick={async () => {
                    if (produto) {
                      await handleFavAction()
                    }
                  }}
                  style={{ borderRadius: 8 }}
                >
                  {isFav ? 'Favoritado' : 'Favoritar'}
                </Button>
                <Button
                  icon={<ShareAltOutlined />}
                  style={{ borderRadius: 8 }}
                >
                  Compartilhar
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Product Details */}
      <Card
        title={
          <Title level={4} style={{ marginBottom: 0, color: '#08979C' }}>
            Informações do Produto
          </Title>
        }
        style={{ borderRadius: 16, marginBottom: 32 }}
      >
        <Descriptions column={screens.md ? 2 : 1} bordered>
          {/* <Descriptions.Item label="Materiais">{produto?.materials}</Descriptions.Item> */}
          <Descriptions.Item label="Tamanho">{produto?.altura}cm x {produto?.comprimento}cm</Descriptions.Item>
          <Descriptions.Item label="Disponibilidade">
            {produto?.ativo ? 'Pronta entrega' : 'Sob encomenda (7-15 dias)'}
          </Descriptions.Item>
          <Descriptions.Item label="Modelagem" span={2}>{produto?.modelagem}</Descriptions.Item>
        </Descriptions>
      </Card>

      {(produtosPaginados?.get('')?.produtos !== undefined) && (
        <div>
          <Title level={3} style={{ marginBottom: 24 }}>
            Produtos Relacionados
          </Title>
          <Row gutter={[16, 16]}>
            {produtosPaginados?.get('')?.produtos.map(p => (
              <Col xs={12} sm={8} md={6} key={p.id}>
                <Card
                  loading={carregandoPaginados}
                  hoverable
                  style={{ borderRadius: 12, overflow: 'hidden' }}
                  bodyStyle={{ padding: 12 }}
                  cover={
                    <img
                      src={p.imagemCapa}
                      alt={p.titulo}
                      style={{ height: 150, objectFit: 'cover' }}
                    />
                  }
                  onClick={() => navigator(`/produto/${p?.id}`)}
                >
                  <Text ellipsis style={{ display: 'block', marginBottom: 4 }}>
                    {p.titulo}
                  </Text>
                  <Text strong style={{ color: colors.primary }}>
                    R$ {p.preco.toFixed(2)}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

    </div>
  );
};