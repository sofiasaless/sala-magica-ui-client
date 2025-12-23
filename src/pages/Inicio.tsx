
import { EditTwoTone, HeartTwoTone, LoadingOutlined, ShoppingTwoTone, SmileTwoTone, StarFilled } from "@ant-design/icons";
import { Button, Card, Col, Grid, Pagination, Row, Segmented, Spin, Typography } from 'antd';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardProduto } from "../components/CardProduto";
import { Carrossel } from "../components/Carrossel";
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext";
import { useProdutosFavoritos } from "../contexts/ProdutosFavoritosContext";
import { useProdutosGeral } from "../hooks/useProdutosGeral";
import { useProdutosPaginados } from "../hooks/useProdutosPaginados";
import { colors } from "../theme/colors";
import { useAuth } from "../contexts/AuthContext";
const { useBreakpoint } = Grid;

const { Title, Text, Paragraph } = Typography;

export const Inicio = () => {

  const screens = useBreakpoint();

  const navigator = useNavigate();

  const { categoriasProdutos } = useCategoriasProduto()

  const { produtosPaginados, paginar, carregandoPaginados } = useProdutosPaginados()
  const { contarTotalProdutos, totalProdutos } = useProdutosGeral()

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [page, setPage] = useState(1);

  useEffect(() => {
    paginar()
    contarTotalProdutos()
  }, [])

  const { isAutenticado } = useAuth()
  const { produtosFavoritos, carregarProdutosFavoritos } = useProdutosFavoritos();

  useEffect(() => {
    if (isAutenticado) {
      if (produtosFavoritos === undefined) carregarProdutosFavoritos();
      return
    }
  }, [isAutenticado])

  const { hash } = useLocation();

  const [scrollWatcher, setScrollWatcher] = useState<boolean>(true)
  const handleScrollTop = () => setScrollWatcher(!scrollWatcher)

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash, scrollWatcher]);

  return (
    <>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Carrossel />

        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {[
            { icon: <EditTwoTone twoToneColor={colors.secondary} />, label: 'Feito à Mão', value: '100%' },
            { icon: <ShoppingTwoTone twoToneColor={colors.secondary} />, label: 'Produtos', value: `10+` },
            { icon: <HeartTwoTone twoToneColor={colors.secondary} />, label: 'Avaliação', value: '4.9' },
            { icon: <SmileTwoTone twoToneColor={colors.secondary} />, label: 'Clientes Felizes', value: '50+' }
          ].map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <Card
                style={{
                  textAlign: 'center',
                  borderRadius: 12,
                  border: '1px solid #E6FFFB',
                  background: '#FAFAFA'
                }}
                bodyStyle={{ padding: 16 }}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>{stat.icon}</div>
                <Text strong style={{ fontSize: 24, color: colors.primary, display: 'block' }}>
                  {stat.value}
                </Text>
                <Text type="secondary">{stat.label}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16, color: '#262626' }}>
            Explore por Categoria
          </Title>
          <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 8 }}>
            <Segmented
              value={selectedCategory}
              onChange={async (value) => {
                setSelectedCategory(value as string);
                setPage(1);
                if (value === 'Todos') {
                  await contarTotalProdutos()
                  await paginar()
                  return
                }
                await contarTotalProdutos(value)
                await paginar({
                  params: {
                    navigation: 'first'
                  },
                  filtro: {
                    categoria: value
                  }
                })
                handleScrollTop()
              }}
              options={[{ nome: 'Todos', id: 'Todos', data_criacao: '' }].concat(categoriasProdutos ?? []).map(cat => ({
                label: cat.nome,
                value: cat.id,
              })) || []}
              style={{
                background: '#F5F5F5',
                padding: 4,
                borderRadius: 12
              }}
            />
          </div>
        </div>

        <Row gutter={[16, 16]} id="secao-produtos">
          {
            (carregandoPaginados) ?
              <Spin indicator={<LoadingOutlined spin />} size="large" />
              :
              produtosPaginados?.get('')?.produtos.map((produto) => (
                <Col xs={24} sm={12} md={8} lg={6} key={produto.id}>
                  <CardProduto produto={produto} />
                </Col>
              ))
          }
        </Row>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination
            current={page}
            defaultCurrent={page}
            total={totalProdutos}
            pageSize={8}
            simple={{ readOnly: true }}
            onChange={(pageClicked) => {
              if (pageClicked > page) {
                console.log('avançando pagina')
                console.info(produtosPaginados)
                setPage(pageClicked)
                paginar({
                  limit: 8,
                  params: {
                    navigation: 'next',
                    cursor: produtosPaginados?.get('')?.nextCursor,
                    cursorPrev: produtosPaginados?.get('')?.prevCursor
                  },
                  filtro: {
                    categoria: selectedCategory
                  }
                })
              } else {
                console.log('voltando pagina')
                console.info(produtosPaginados)
                setPage(pageClicked)
                paginar({
                  limit: 8,
                  params: {
                    navigation: 'last',
                    cursor: produtosPaginados?.get('')?.nextCursor,
                    cursorPrev: produtosPaginados?.get('')?.prevCursor
                  },
                  filtro: {
                    categoria: selectedCategory
                  }
                })
              }
            }}
          />
        </div>

        <Card
          style={{
            marginTop: 48,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #E6FFFB 0%, #B5F5EC 100%)',
            border: 'none'
          }}
          bodyStyle={{ padding: screens.md ? 48 : 24 }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={16}>
              <Title level={2} style={{ color: '#08979C', marginBottom: 12 }}>
                Não encontrou o que procura?
              </Title>
              <Paragraph style={{ fontSize: 16, color: '#595959', marginBottom: 0 }}>
                Criamos peças personalizadas especialmente para você! Envie sua ideia e receba um orçamento sem compromisso.
              </Paragraph>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: screens.md ? 'right' : 'center' }}>
              <Button
                type="primary"
                size="large"
                icon={<StarFilled />}
                onClick={() => navigator('/encomenda')}
                style={{
                  background: colors.secondary,
                  borderColor: colors.secondary,
                  borderRadius: 12,
                  height: 56,
                  paddingInline: 32,
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                Fazer Encomenda
              </Button>
            </Col>
          </Row>
        </Card>

      </div>
    </>
  )
}