import { Container } from "../components/Container";

import { Flex, Pagination } from "antd";
import { CardProduto } from "../components/CardProduto";
import { Divisor } from "../components/Divisor";

export const Favoritos = () => {
  return (
    <>
      <Container
        paddingVertical={3}
        flexDirection="column"
        gap={30}
        alignItems="center"
      >
        <Divisor
          titulo="Seus favoritos"
        />
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