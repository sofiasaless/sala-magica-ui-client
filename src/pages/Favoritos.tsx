import { Container } from "../components/Container";

import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Pagination, Spin } from "antd";
import { CardProduto } from "../components/CardProduto";
import { Divisor } from "../components/Divisor";
import { useProdutosFavoritos } from "../contexts/ProdutosFavoritosContext";
import { useEffect } from "react";
import { useAuthUser } from "../hooks/useAuthUser";

export const Favoritos = () => {
  
  const { carregandoFavoritos, produtosFavoritos, carregarProdutosFavoritos } = useProdutosFavoritos();
  const { isAutenticado } = useAuthUser()

  useEffect(() => {
    if (isAutenticado) {
      if (produtosFavoritos === undefined) carregarProdutosFavoritos();
    }
  }, [])
  
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
          {
            (carregandoFavoritos)?
            <Spin indicator={<LoadingOutlined spin />} size="large" />
            :
            produtosFavoritos?.map((prod) => (
              <CardProduto produto={prod} fav/>
            ))
          }
        </Flex>

        <Pagination defaultCurrent={1} total={10} />
      </Container>
    </>
  )
}