import { Container } from "../components/Container";

import { BulbOutlined, CrownOutlined, EditTwoTone, HeartTwoTone, HighlightOutlined, ShoppingTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Card, Col, Flex, Row, Typography } from 'antd';
import { useEffect } from "react";
import { AreaPesquisaProdutos } from "../components/AreaPesquisaProdutos";
import { CardProduto } from "../components/CardProduto";
import { CardServico, type ServicoType } from "../components/CardServico";
import { Divisor } from "../components/Divisor";
import FormularioEncomenda from "../components/FormularioEncomenda";
import { colors } from "../theme/colors";
import { useProdutosPaginados } from "../hooks/useProdutosPaginados";
import { useAuthUser } from "../hooks/useAuthUser";
import { useProdutosFavoritos } from "../contexts/ProdutosFavoritosContext";
import { Carrossel } from "../components/Carrossel";

const { Title, Text, Paragraph } = Typography;

export const Inicio = () => {

  const { produtosPaginados, paginar } = useProdutosPaginados()

  useEffect(() => {
    paginar({
      limit: 4,
      params: {
        navigation: 'first'
      },
      filtro: {
        categoria: "Enfeites de parede"
      }
    }, 'enfeites')
    paginar({
      limit: 4,
      params: {
        navigation: 'first'
      },
      filtro: {
        categoria: "Materiais educativos"
      }
    }, 'educativo')
  }, [])

  const { isAutenticado } = useAuthUser();
  const { produtosFavoritos, carregarProdutosFavoritos } = useProdutosFavoritos();

  useEffect(() => {
    if (isAutenticado) {
      if (produtosFavoritos === undefined) carregarProdutosFavoritos();
    }
  }, [isAutenticado])

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
      </div>
      {/* <Container
        justifyContent="center"
        paddingVertical={3}
        flexDirection="column"
        alignItems="center"
      >
        <AreaPesquisaProdutos />
      </Container>

      <Container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={15}
      >

        <Divisor 
          titulo="Serviços"        
        />

        <Flex gap={50}>
          {(servicoes_prestados).map((servico, indice) => (
            <CardServico
              key={indice}
              servico={servico}
            />
          ))}
        </Flex>
      </Container>

      <Container
        backgroundColor={colors.primaryLight}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={20}
      >
        <Divisor 
          titulo="Enfeites de parede"
          props={{
            orientation:"left",
            variant:'solid'
          }}
          corBorda={colors.backgroundMain}
          corTitulo={colors.backgroundMain}
        />

        <Flex gap={"large"}>
          {produtosPaginados?.get('enfeites')?.produtos.map((produto, indice) => (
            <CardProduto key={indice} produto={produto} />
          ))}
        </Flex>

        <Divisor 
          titulo="Materiais educativos"
          props={{
            orientation:"left",
            variant:'solid'
          }}
          corBorda={colors.backgroundMain}
          corTitulo={colors.backgroundMain}
        />

        <Flex gap={"large"}>
          {produtosPaginados?.get('educativo')?.produtos.map((produto, indice) => (
            <CardProduto key={indice} produto={produto} />
          ))}
        </Flex>
      </Container>

      <Container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={15}
      >
        <Divisor 
          titulo="Encomendas personalizadas"
        />
        <Divisor 
          titulo="E que tal um enfeite exclusivo para sua sala de aula? Basta preencher o  formulário abaixo com os detalhes do que deseja e entraremos em contato  para alinhar os detalhes da sua encomenda."
          tamanhoTitulo={'body'}
          expessuraFonte={400}
          width={50}
        />
        <FormularioEncomenda />
      </Container> */}
    </>
  )
}