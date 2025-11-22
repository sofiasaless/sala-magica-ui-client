import { Container } from "../components/Container";

import { BulbOutlined, CrownOutlined, HighlightOutlined } from "@ant-design/icons";
import { Flex } from 'antd';
import { useEffect } from "react";
import { AreaPesquisaProdutos } from "../components/AreaPesquisaProdutos";
import { CardProduto } from "../components/CardProduto";
import { CardServico, type ServicoType } from "../components/CardServico";
import { Divisor } from "../components/Divisor";
import FormularioEncomenda from "../components/FormularioEncomenda";
import { useProdutos } from "../hooks/useProdutos";
import { colors } from "../theme/colors";


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

  const { produtosPaginados, paginarFiltrado } = useProdutos()
  
  useEffect(() => {
    paginarFiltrado({limite: 4, categoria: "Enfeites de parede", ordem: "dataAnuncio"}, "enfeites")
    paginarFiltrado({limite: 4, categoria: "Materiais educativos", ordem: "dataAnuncio"}, "educativo")
  }, [])

  return (
    <>
      <Container
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
      </Container>
    </>
  )
}