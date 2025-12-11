import {
  AppstoreOutlined,
  BellOutlined,
  FormOutlined,
  HeartOutlined,
  HomeOutlined,
  InboxOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Input,
  Layout,
  Menu,
  Space
} from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useItensCarrinho } from '../contexts/ItensCarrinhoContext';
import { categories } from '../data/mockData';
import { SiteFooter } from './SiteFooter';
import { useProdutosFavoritos } from '../contexts/ProdutosFavoritosContext';
import { useAuthUser } from '../hooks/useAuthUser';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

export const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { produtosFavoritos } = useProdutosFavoritos();

  const { desconectarUsuario } = useAuthUser()

  const { itensCarrinho } = useItensCarrinho()

  const screens = useBreakpoint();

  const navigate = useNavigate();

  const categoryMenu = (
    <Menu
      items={categories.map(cat => ({
        key: cat,
        label: cat
      }))}
    />
  );

  const userMenu = (
    <Menu
      items={[
        { key: 'perfil', icon: <UserOutlined />, label: 'Meu Perfil', onClick: () => navigate('perfil') },
        { key: 'orders', icon: <FormOutlined />, label: 'Minhas Encomendas' },
        { type: 'divider' as const },
        { key: 'logout', label: 'Sair', danger: true, onClick: async () => await  desconectarUsuario()}
      ]}
    />
  );

  const navItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Início' },
    { key: 'custom', icon: <StarOutlined />, label: 'Encomenda' },
    { key: 'favorites', icon: <HeartOutlined />, label: `Favoritos (${produtosFavoritos?.length})` },
    { key: 'cart', icon: <ShoppingCartOutlined />, label: `Carrinho (${itensCarrinho.length})` },
    { key: 'perfil', icon: <UserOutlined />, label: 'Perfil' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 1000,
          width: '100%',
          background: 'linear-gradient(135deg, #13C2C2 0%, #08979C 100%)',
          padding: screens.md ? '0 48px' : '0 16px',
          height: 'auto',
          minHeight: 64,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          // gap: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      >
        <div
          onClick={() => navigate('')}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            paddingBlock: 5
          }}
        >
          <img src={logo} height={65} />
        </div>

        {/* {screens.md && (
          <div style={{ flex: 1, maxWidth: 500 }}>
            <AutoComplete
              value={searchValue}
              onSelect={(value) => {
                setSearchValue(value);
                navigate('');
              }}
              style={{ width: '100%' }}
            >
              <Input
                prefix={<SearchOutlined style={{ color: '#08979C' }} />}
                placeholder="Buscar produtos..."
                style={{
                  borderRadius: 24,
                  border: 'none',
                  height: 42,
                  fontSize: 14
                }}
              />
            </AutoComplete>
          </div>
        )} */}

        {screens.md ? (
          <Space size={10} align='center'>
            <AutoComplete
              value={searchValue}
              onSelect={(value) => {
                setSearchValue(value);
                navigate('');
              }}
              style={{ width: '100%' }}
            >
              <Input
                prefix={<SearchOutlined style={{ color: '#08979C' }} />}
                placeholder="Buscar produtos..."
                size='large'
                width={800}
                style={{
                  borderRadius: 24,
                  border: 'none',
                  height: 'auto',
                  fontSize: 14
                }}
              />
            </AutoComplete>
            <Button
              type="text"
              icon={<InboxOutlined />}
              style={{ color: 'white', height: 42 }}
              onClick={() => navigate('/encomenda')}
            >
              Encomendar
            </Button>

            <Dropdown menu={{ items: categoryMenu.props.items }} placement="bottomRight">
              <Button
                type="text"
                icon={<AppstoreOutlined />}
                style={{ color: 'white', height: 42 }}
              >
                Categorias
              </Button>
            </Dropdown>

            <Button
              type="text"
              icon={
                <Badge count={8} size="small" offset={[-2, 2]}>
                  <BellOutlined style={{ fontSize: 20, color: 'white' }} />
                </Badge>
              }
              style={{ color: 'white' }}
              onClick={() => navigate('notificacoes')}
            />

            <Button
              type="text"
              icon={
                <Badge count={produtosFavoritos?.length} size="small" offset={[-2, 2]} style={{ background: '#FAAD14' }}>
                  <HeartOutlined style={{ fontSize: 20, color: 'white' }} />
                </Badge>
              }
              style={{ color: 'white' }}
              onClick={() => navigate('favoritos')}
            />

            <Button
              type="text"
              icon={
                <Badge count={itensCarrinho.length} size="small" offset={[-2, 2]}>
                  <ShoppingCartOutlined style={{ fontSize: 20, color: 'white' }} />
                </Badge>
              }
              style={{ color: 'white' }}
              onClick={() => navigate('carrinho')}
            />

            <Dropdown menu={{ items: userMenu.props.items }} placement="bottomRight">
              <Avatar
                style={{ background: '#FAAD14', cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Space>
        ) : (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: 'white' }} />}
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </Header>

      {!screens.md && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 999,
            padding: '12px 16px',
            background: '#E6FFFB',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <AutoComplete
            value={searchValue}
            style={{ width: '100%' }}
          >
            <Input
              prefix={<SearchOutlined style={{ color: '#08979C' }} />}
              placeholder="Buscar produtos..."
              style={{ borderRadius: 20, border: '1px solid #D9D9D9' }}
            />
          </AutoComplete>
        </div>
      )}

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🎨</span>
            <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 18, color: '#13C2C2' }}>
              Sala Mágica
            </span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[currentPage]}
          items={navItems.map(item => ({
            ...item,
            onClick: () => {
              navigate(item.key);
              setMobileMenuOpen(false);
            }
          }))}
          style={{ border: 'none' }}
        />
      </Drawer>

      <Content
        style={{
          marginTop: screens.md ? 64 : 120,
          minHeight: 'calc(100vh - 64px - 200px)',
          padding: screens.md ? '24px 48px' : '16px'
        }}
      >
        <Outlet />
      </Content>

      <SiteFooter />

    </Layout>
  );
};