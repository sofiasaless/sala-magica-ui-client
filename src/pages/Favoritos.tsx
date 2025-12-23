import {
  HeartFilled,
  ShoppingOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Empty,
  Row,
  Tag,
  Typography
} from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardProduto } from '../components/CardProduto';
import { NaoConectadoFeedback } from '../components/NaoConectadoFeedback';
import { useProdutosFavoritos } from '../contexts/ProdutosFavoritosContext';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

export function Favoritos() {

  const navigator = useNavigate()

  const { carregandoFavoritos, produtosFavoritos, carregarProdutosFavoritos } = useProdutosFavoritos();
  const { isAutenticado } = useAuth()

  useEffect(() => {
    if (isAutenticado) {
      if (produtosFavoritos === undefined) carregarProdutosFavoritos();
    }
  }, [isAutenticado])
  
  if (!isAutenticado) {
    return <NaoConectadoFeedback proposito='favoritar os produtos da Sala Mágica!' />
  }

  return (
    (produtosFavoritos?.length === 0 && !carregandoFavoritos) ?
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Card style={{ borderRadius: 16, textAlign: 'center', padding: 48 }}>
          <Empty
            image={<div style={{ fontSize: 80, marginBottom: 16 }}><HeartFilled /></div>}
            description={
              <div>
                <Title level={4} style={{ color: '#262626' }}>
                  Nenhum favorito ainda
                </Title>
                <Text type="secondary">
                  Explore nosso catálogo e salve seus produtos preferidos!
                </Text>
              </div>
            }
          >
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={() => navigator('/#secao-produtos')}
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
      :
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          <HeartFilled style={{ marginRight: 12, color: '#FF4D4F' }} />
          Meus Favoritos
          <Tag color="magenta" style={{ marginLeft: 12, fontSize: 14 }}>
            {produtosFavoritos?.length} {produtosFavoritos?.length === 1 ? 'item' : 'itens'}
          </Tag>
        </Title>

        <Row gutter={[16, 16]}>
          {produtosFavoritos?.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <CardProduto produto={product} />
            </Col>
          ))}
        </Row>
      </div>
  );
};
