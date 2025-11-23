import { Container } from "../components/Container";

import { Flex, Pagination } from "antd";
import { useEffect, useState } from "react";
import { AreaPesquisaProdutos } from "../components/AreaPesquisaProdutos";
import { CardProduto } from "../components/CardProduto";
import { useProdutosPaginados } from "../hooks/useProdutosPaginados";
import { useProdutosGeral } from "../hooks/useProdutosGeral";

export const Produtos = () => {
  const { produtosPaginados, paginar } = useProdutosPaginados()

  const { contarTotalProdutos, totalProdutos } = useProdutosGeral()
  const [page, setPage] = useState(1)

  useEffect(() => {
    contarTotalProdutos()
    paginar()
  }, [])

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
          {produtosPaginados?.get('')?.produtos.map((produto, indice) => (
            <CardProduto key={indice} produto={produto} />
          ))
          }
        </Flex>

        <Pagination
          current={page}
          defaultCurrent={page}
          total={totalProdutos}
          pageSize={8}
          simple
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
                }
              })
            }
          }}
        />
      </Container>
    </>
  )
}