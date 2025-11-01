import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { colors } from "../theme/colors";
import { font } from "../theme/font";

const { Meta } = Card;

export const CardProduto = () => {
  return (
    <Card
      style={{ width: 230 }}
      cover={
        <img
          draggable={false}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <ShareAltOutlined key="share"/>,
        <HeartOutlined key="fav"/>
      ]}
    >
      <Meta
        title={
          <span style={{
            color: 'black',
            fontSize: font.h5,
            // fontWeight: 600
          }}>
            Calendário tema azul
          </span>
        }
        description={
          <span style={{
            color:colors.primary,
            fontSize: font.h5
          }}>
            R$ 50,00
          </span>
        }
      />
    </Card>
  )
}