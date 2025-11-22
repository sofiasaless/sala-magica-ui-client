import { AppstoreFilled, BellOutlined, HeartFilled, HomeFilled, ShoppingCartOutlined, SmileFilled } from "@ant-design/icons";
import { Badge, Button, Flex, Image, Tabs, type TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/icone reverso.png';
import { colors } from "../theme/colors";
import { Container } from "./Container";

const items: TabsProps['items'] = [
  {
    key: '',
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

export const Navbar: React.FC<{
  paginaAtiva?: string
}> = ( {paginaAtiva = ''} ) => {

  const [activeKey, setActiveKey] = useState<string>(paginaAtiva);

  const navigator = useNavigate()
  
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/produto/')) {
      setActiveKey('...')
    } else {
      setActiveKey(location.pathname.substring(1, location.pathname.length))
    }
  }, [location.pathname])

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
          onChange={async (e) => {
            setActiveKey(e)
            await navigator(`/${e}`)
          }}
          size="middle"
          defaultActiveKey={''}
          destroyOnHidden
          items={items}
        />

        <Flex
          gap="middle"
        >
          <Badge count={2} color="#ff4d4f">
            <Button
              type="default" shape="circle" icon={<ShoppingCartOutlined style={{ color: colors.primary, fontSize: 22 }} />} size={"large"}
              onClick={() => setActiveKey('carrinho')}
            />
          </Badge>

          <Badge count={9} color="#ff4d4f">
            <Button
              type="default" shape="circle" icon={<BellOutlined style={{ color: colors.primary, fontSize: 22 }} />} size={"large"}
              onClick={() => setActiveKey('notificacoes')}
            />
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
        <Outlet />
      </Container>
    </>
  )

}