import { AppstoreFilled, BellOutlined, HeartFilled, HomeFilled, ShoppingCartOutlined, SmileFilled } from "@ant-design/icons";
import { Badge, Button, Flex, Image, Layout, Tabs, type TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/icone reverso.png';
import { colors } from "../theme/colors";
import { Container } from "./Container";
import { useItensCarrinho } from "../contexts/ItensCarrinhoContext";

const { Header: AntHeader } = Layout;

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
}> = ({ paginaAtiva = '' }) => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [activeKey, setActiveKey] = useState<string>(paginaAtiva);

  const navigator = useNavigate()

  const location = useLocation()

  const { itensCarrinho } = useItensCarrinho()

  useEffect(() => {
    if (location.pathname.startsWith('/produto/')) {
      setActiveKey('...')
    } else {
      setActiveKey(location.pathname.substring(1, location.pathname.length))
    }
  }, [location.pathname])

  return (
    <>
      <AntHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBlock: '0.5rem',
          paddingInline: '15%',
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 1000,
          backgroundColor: colors.backgroundMain,
          position: 'fixed',
          top: 0,
          width: '100%',
          height: 'auto',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
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
          <Badge defaultValue={0} count={(itensCarrinho.length === 0)?1:itensCarrinho.length} color="#ff4d4f">
            <Link to={'/carrinho'}>
              <Button
                type="default" shape="circle" icon={<ShoppingCartOutlined style={{ color: colors.primary, fontSize: 22 }} />} size={"large"}
                onClick={() => setActiveKey('carrinho')}
              />
            </Link>
          </Badge>

          <Badge count={9} color="#ff4d4f">
            <Link to={'/notificacoes'}>
              <Button
                type="default" shape="circle" icon={<BellOutlined style={{ color: colors.primary, fontSize: 22 }} />} size={"large"}
                onClick={() => setActiveKey('notificacoes')}
              />
            </Link>
          </Badge>
        </Flex>
      </AntHeader>

      <Container
        flexDirection="column"
        paddingHorizontal={0}
        paddingVertical={6}
        alignItems="center"
        justifyContent="center"
      >
        <Outlet />
      </Container>
    </>
  )

}