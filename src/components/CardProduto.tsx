import { HeartFilled, HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card } from "antd";
import type React from "react";
import { colors } from "../theme/colors";
import { font } from "../theme/font";
import type { Produto } from "../types/produto.type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/useAuthUser";
import { HttpStatusCode } from "axios";
import { useProdutosFavoritos } from "../contexts/ProdutosFavoritosContext";

const { Meta } = Card;

export const CardProduto: React.FC<{ produto?: Produto, fav?: boolean }> = ({ produto, fav }) => {
  const navigator = useNavigate()

  const [isFav, setIsFav] = useState<boolean>(fav || false)
  const { isAutenticado } = useAuthUser()
  const { curtirOuDescurtirProduto, recarregarProdutosFavoritos, isProdutoFavoritado, produtosFavoritos } = useProdutosFavoritos()

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

  useEffect(() => {
    if (isAutenticado) {
      if (!fav) {
        setIsFav(isProdutoFavoritado(produto?.id))
      }
    }
  }, [isAutenticado, produtosFavoritos])
  
  return (
    <Card
      style={{ width: 230 }}
      cover={
        <img
          style={{
            cursor: 'pointer'
          }}
          onClick={async () => {
            await navigator(`/produto/${produto?.id}`)
          }}
          draggable={false}
          alt="example"
          src={(produto?.imagemCapa) ? produto?.imagemCapa : 'https://picsum.photos/200/300'}
        />
      }
      actions={[
        <ShareAltOutlined key="share" />,
        (isFav)?<HeartFilled onClick={handleFavAction} key='fav' />:<HeartOutlined onClick={handleFavAction} key="fav" />
      ]}
    >
      <Meta
        title={
          <span style={{
            color: 'black',
            fontSize: font.h5,
            // fontWeight: 600
          }}>
            {produto?.titulo}
          </span>
        }
        description={
          <span style={{
            color: colors.primary,
            fontSize: font.h5
          }}>
            R$ {produto?.preco.toFixed(2)}
          </span>
        }
      />
    </Card>
  )
}