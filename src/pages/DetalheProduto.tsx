import { Button, Flex, Image, notification, Typography } from "antd"
import { Container } from "../components/Container"
import { colors } from "../theme/colors"
import { font } from "../theme/font";
import { HeartFilled, HeartOutlined, ShareAltOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Divisor } from "../components/Divisor";
import { CardProduto } from "../components/CardProduto";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { useProdutosGeral } from "../hooks/useProdutosGeral";
import { useProdutosPaginados } from "../hooks/useProdutosPaginados";
import { useItensCarrinho } from "../contexts/ItensCarrinhoContext";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useProdutosFavoritos } from "../contexts/ProdutosFavoritosContext";
import { useAuthUser } from "../hooks/useAuthUser";
import { HttpStatusCode } from "axios";

const { Text } = Typography;

const Context = React.createContext({ name: 'Default' });

export const DetalheProduto = () => {

  const { id } = useParams()

  const navigator = useNavigate()

  const { produto, buscarProduto, carregandoProdutos } = useProdutosGeral()
  const { produtosPaginados, paginar, carregandoPaginados } = useProdutosPaginados();

  const { itensCarrinho, adicionarItem } = useItensCarrinho()

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: 'Adicionado ao carrinho',
      description: `Confira "${produto?.titulo}" no seu carrinho!`,
      placement,
    });
  };

  const [isFav, setIsFav] = useState<boolean>(false)
  const { isAutenticado } = useAuthUser()
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

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

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
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Container
          carregando={carregandoProdutos}
          backgroundColor={colors.primaryLighter}
          flexDirection="column"
          paddingVertical={1.5}
        >
          <Container
            backgroundColor={colors.primaryLighter}
            // backgroundColor='red'
            paddingVertical={1}
            alignItems="center"
            justifyContent="space-around"
          >
            <Flex vertical gap={"middle"} justify="center" align="center">
              <Flex>
                <Image
                  width={350}
                  src={produto?.imagemCapa}
                />
              </Flex>
              <Flex gap={'middle'}>
                {produto?.imagens?.map((imagem, indice) => (
                  <Image
                    key={indice}
                    width={100}
                    src={imagem}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex vertical justify="center" gap={"large"}>
              <Flex vertical>
                <Text style={{ fontSize: font.h3 }}>{produto?.titulo}</Text>
                <Text style={{ fontSize: font.h4, color: colors.secondary }}>R$ {produto?.preco.toFixed(2)}</Text>
              </Flex>

              <Flex gap={"small"}>
                <Button type="dashed" size="middle" shape="circle" icon={<ShareAltOutlined style={{ color: colors.info, fontSize: font.h5 }} />} />
                <Button onClick={handleFavAction} type="dashed" size="middle" shape="circle" icon={
                  (isFav) ? <HeartFilled style={{ color: colors.error, fontSize: font.h5 }} /> : <HeartOutlined style={{ color: colors.error, fontSize: font.h5 }} />
                }
                />
              </Flex>

              <Flex gap={"small"}>
                <Button type="dashed" size="large" shape="circle"
                  icon={<ShoppingCartOutlined style={{ color: colors.primary, fontSize: font.h4 }} />}
                  onClick={() => {
                    if (produto) {
                      adicionarItem(produto)
                      openNotification('bottomRight')
                    }
                  }}
                />
                <Button type="primary" size="large" onClick={() => console.info(itensCarrinho)}>Encomendar produto</Button>
              </Flex>
            </Flex>

          </Container>

          <Container
            backgroundColor={colors.primaryLighter}
            // backgroundColor='red'
            paddingVertical={1.5}
            alignItems="flex-start"
            justifyContent="space-around"
            gap={50}
          >
            <Flex vertical style={{ flex: 1 }}>
              <Divisor
                titulo="Descrição do produto"
                tamanhoTitulo={font.body}
              />
              <Text style={{ textAlign: 'center' }}>{produto?.descricao}</Text>
            </Flex>

            <Flex vertical style={{ flex: 1 }}>
              <Divisor
                titulo="Medidas (Alt x Comp)"
                tamanhoTitulo={font.body}
              />
              <Text style={{ textAlign: 'center' }}>Altura: {(produto?.altura) ? `${produto?.altura}cm` : 'Não informada'}</Text>
              <Text style={{ textAlign: 'center' }}>Comprimento: {(produto?.comprimento) ? `${produto?.comprimento}cm` : 'Não informado'}</Text>
            </Flex>

            <Flex vertical style={{ flex: 1 }}>
              <Divisor
                titulo="Confecção e modelagem"
                tamanhoTitulo={font.body}
              />
              <Text style={{ textAlign: 'center' }}>{produto?.modelagem}</Text>
            </Flex>
          </Container>
        </Container>

        <Container
          carregando={carregandoPaginados}
          paddingVertical={3}
          flexDirection="column"
          gap={30}
          alignItems="center"
        >
          <Divisor
            titulo="Você também pode gostar"
          />
          <Flex
            gap={"large"}
            wrap
            justify="center"
          >
            {
              produtosPaginados?.get('')?.produtos.map((produtoSug, indice) => (
                <CardProduto key={indice} produto={produtoSug} />
              ))
            }
          </Flex>

          <Button size="large" type="primary" onClick={async () => {
            navigator('/produtos')
          }}>Ver mais</Button>

        </Container>
      </Context.Provider>
    </>
  )
}