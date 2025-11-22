import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card } from "antd";
import type React from "react";
import { colors } from "../theme/colors";
import { font } from "../theme/font";
import type { Produto } from "../types/produto.type";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export const CardProduto: React.FC<{ produto?: Produto }> = ({ produto }) => {
  const navigator = useNavigate()
  
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
        <HeartOutlined key="fav" />
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