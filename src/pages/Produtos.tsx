import { Container } from "../components/Container";

import { Flex, Pagination } from "antd";
import { AreaPesquisaProdutos } from "../components/AreaPesquisaProdutos";
import { CardProduto } from "../components/CardProduto";

export const Produtos = () => {
  return (
    <>
      <Container
        justifyContent="center"
        paddingVertical={1}
        flexDirection="column"
        alignItems="center"
      >
        <AreaPesquisaProdutos />
      </Container>

      <Container
        paddingVertical={5}
        flexDirection="column"
        gap={30}
        alignItems="center"
      >
        <Flex
          gap={"large"}
          wrap
          justify="center"
        >
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
        </Flex>

        <Pagination defaultCurrent={1} total={10} />
      </Container>
    </>
  )
}