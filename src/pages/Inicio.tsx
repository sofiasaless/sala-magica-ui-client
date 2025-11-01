import { Container } from "../components/Container";

import { BulbOutlined, CrownOutlined, HighlightOutlined } from "@ant-design/icons";
import { AutoComplete, Flex, Input, Typography } from 'antd';
import { CardServico, type ServicoType } from "../components/CardServico";
import { Divisor } from "../components/Divisor";
import { colors } from "../theme/colors";
import { CardProduto } from "../components/CardProduto";
import FormularioEncomenda from "../components/FormularioEncomenda";

const { Title } = Typography;

const servicoes_prestados: ServicoType[] = [
  {
    icone: <CrownOutlined color={colors.secondary} />,
    titulo: "Enfeites Exclusivos",
    descricao: "Que tal um enfeite único feito especialmente para você? Preencha o formulário e criaremos algo exclusivo e encantador."
  },
  {
    icone: <BulbOutlined color={colors.secondary} />,
    titulo: "Decorações Personalizadas",
    descricao: "Produzimos decorações sob medida, com o seu toque especial em cada detalhe, do jeitinho que você sonhar para sua sala de aula!"
  },
  {
    icone: <HighlightOutlined color={colors.secondary} />,
    titulo: "Personalização com Carinho",
    descricao: "Criamos cada peça com materiais como EVA, papel crepom e TNT, dando vida a decorações únicas e cheias de amor. Você imagina, nós criamos!"
  }
]

export const Inicio = () => {
  return (
    <>
      <Container
        justifyContent="center"
        paddingVertical={3}
        flexDirection="column"
        alignItems="center"
      >
        <Title level={2}>Transforme sua sala de aula com encanto</Title>
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{ width: 350 }}
        // options={options}
        // onSelect={onSelect}
        // onSearch={handleSearch}
        >
          <Input.Search size="large" placeholder="O que você quer encontrar hoje?" enterButton />
        </AutoComplete>
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
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
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
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
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
      </Container>
    </>
  )
}