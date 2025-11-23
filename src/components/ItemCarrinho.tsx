import { DeleteOutlined, HeartOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { List, Space } from "antd";
import React from "react";
import { colors } from '../theme/colors';
import { font } from '../theme/font';
import type { Produto } from '../types/produto.type';
import { useItensCarrinho } from '../contexts/ItensCarrinhoContext';

const IconText = ({ icon, text, onClick }: { icon: React.FC; text: string, onClick?: (e: any) => void }) => (
  <Space onClick={onClick} style={{ cursor: 'pointer' }}>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ItemCarrinho: React.FC<{
  item: Produto
}> = ({ item }) => {

  const { removerItem } = useItensCarrinho()

  return (
    <List.Item
      style={{
        maxWidth: 850,
        minWidth: 300,
        paddingBlock: 25
      }}
      key={item.titulo}
      actions={[
        <IconText icon={DeleteOutlined} text="Remover" key="list-vertical-star-o" onClick={() => removerItem(item.id!)} />,
        <IconText icon={HeartOutlined} text="Favoritar" key="list-vertical-like-o" />,
        <IconText icon={WhatsAppOutlined} text="Encomendar" key="list-vertical-message" />,
      ]}
      extra={
        <img
          draggable={false}
          width={180}
          alt="logo"
          src={item.imagemCapa}
        />
      }
    >
      <List.Item.Meta
        title={
          <span style={{ fontSize: font.h4, fontWeight: 600, color: 'black' }}>
            {item.titulo}
          </span>
        }
        description={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: font.h5, color: colors.primary }}>
              R$ {item.preco.toFixed(2)}
            </span>
            {/* <span style={{ fontSize: font.body, color: 'black' }}>
              Qtd. 2x
            </span> */}
          </div>
        }
      />
      {item.descricao}
    </List.Item>
  )
}