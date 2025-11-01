import { AppstoreFilled, BellOutlined, HeartFilled, HomeFilled, ShoppingCartOutlined, SmileFilled } from "@ant-design/icons";
import { Badge, Button, Flex, Image, Tabs, type TabsProps } from "antd";
import { useState } from "react";
import logo from '../assets/icone reverso.png';
import { Inicio } from "../pages/Inicio";
import { colors } from "../theme/colors";
import { Container } from "./Container";
import { Produtos } from "../pages/Produtos";
import { Favoritos } from "../pages/Favoritos";
import { Perfil } from "../pages/Perfil";

const items: TabsProps['items'] = [
  {
    key: 'inicio',
    label: 'Início',
    icon: <HomeFilled />
  },
  {
    label: 'Produtos',
    key: 'produtos',
    icon: <AppstoreFilled />,
  },
  {
    label: 'Favoritos',
    key: 'favoritos',
    icon: <HeartFilled />,
  },
  {
    label: 'Perfil',
    key: 'perfil',
    icon: <SmileFilled />,
  },
];

export const Navbar = () => {

  const [activeKey, setActiveKey] = useState<string>("inicio");

  return (
    <>
      <Container
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={0.5}
      >
        <Image
          preview={false}
          width={120}
          src={logo}
        />

        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          size="middle"
          defaultActiveKey={'inicio'}
          destroyOnHidden
          items={items}
        />

        <Flex
          gap="middle"
        >
          <Badge count={2} color="#ff4d4f">
            <Button type="default" shape="circle" icon={<ShoppingCartOutlined style={{ color: colors.primary, fontSize: 22 }} />} size={"large"} />
          </Badge>

          <Badge count={9} color="#ff4d4f">
            <Button type="default" shape="circle" icon={<BellOutlined style={{ color: colors.primary, fontSize: 22 }} />} size={"large"} />

          </Badge>
        </Flex>
      </Container>

      <Container
        flexDirection="column"
        paddingHorizontal={0}
        paddingVertical={0}
        alignItems="center"
        justifyContent="center"
      >
        {activeKey === "inicio" && <Inicio />}
        {activeKey === "produtos" && <Produtos />}
        {activeKey === "favoritos" && <Favoritos />}
        {activeKey === "perfil" && <Perfil />}
      </Container>
    </>
  )

}