import { DeleteOutlined, HeartOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { List, Space } from "antd";
import React from "react";
import { colors } from '../theme/colors';
import { font } from '../theme/font';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface ItemCarrinhoProps {
  title: string,
  description: string,
  content: string
}

export const ItemCarrinho: React.FC<{
  item: ItemCarrinhoProps
}> = ({ item }) => {
  return (
    <List.Item
      style={{
        maxWidth: 850,
        minWidth: 300,
        paddingBlock: 25
      }}
      key={item.title}
      actions={[
        <IconText icon={DeleteOutlined} text="Remover" key="list-vertical-star-o" />,
        <IconText icon={HeartOutlined} text="Favoritar" key="list-vertical-like-o" />,
        <IconText icon={WhatsAppOutlined} text="Encomendar" key="list-vertical-message" />,
      ]}
      extra={
        <img
          draggable={false}
          width={300}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      }
    >
      <List.Item.Meta
        title={
          <span style={{ fontSize: font.h4, fontWeight: 600, color: 'black' }}>
            {item.title}
          </span>
        }
        description={
          <span style={{ fontSize: font.h5, color: colors.primary }}>
            {item.description}
          </span>
        }
      />
      {item.content}
    </List.Item>
  )
}