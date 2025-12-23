import { Button, Grid, Layout, Space } from "antd";
import { colors } from "../theme/colors";
import { useCategoriasProduto } from "../contexts/CategoriasProdutoContext";
import { Link } from "react-router-dom";

const { Footer } = Layout;
const { useBreakpoint } = Grid;

export const SiteFooter = () => {
  const screens = useBreakpoint();

  const { categoriasProdutos } = useCategoriasProduto()

  const linksRapido = [
    {nome: 'Início', rota: '/'}, 
    {nome: 'Encomendas', rota: '/perfil'}, 
  ]
  
  return (
    <Footer
      style={{
        background: '#001529',
        color: 'white',
        padding: screens.md ? '48px' : '32px 16px',
        marginTop: 48
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: screens.md ? 'repeat(4, 1fr)' : '1fr',
          gap: 32
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 24 }}>Sala Mágica</div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.8 }}>
            Transformando salas de aula em ambientes mágicos e acolhedores com decorações artesanais feitas com amor.
          </p>
        </div>

        <div>
          <h4 style={{ color: colors.primary, marginBottom: 16, fontWeight: 600 }}>Links Rápidos</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {linksRapido.map(link => (
              <li key={link.rota} style={{ marginBottom: 8 }}>
                <Link to={link.rota} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>{link.nome}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: colors.primary, marginBottom: 16, fontWeight: 600 }}>Categorias</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {categoriasProdutos?.map(cat => (
              <li key={cat.id} style={{ marginBottom: 8 }}>
                <a style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>{cat.nome}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ color: colors.primary, marginBottom: 16, fontWeight: 600 }}>Contato</h4>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 8 }}>
            📱 (85) 98753-9838
          </p>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
            📍 Baturité, CE
          </p>
          <Space style={{ marginTop: 16 }}>
            <Button shape="circle" style={{ background: '#25D366', border: 'none', color: 'white' }}>
              W
            </Button>
            <Button shape="circle" style={{ background: '#E1306C', border: 'none', color: 'white' }}>
              I
            </Button>
          </Space>
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.45)',
          fontSize: 13
        }}
      >
        © 2024 Sala Mágica - Todos os direitos reservados. Feito com 💜 para educadores.
      </div>
    </Footer>
  )
}