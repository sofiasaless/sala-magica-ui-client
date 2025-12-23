import { RightOutlined } from "@ant-design/icons";
import { Button, Carousel, Grid, Typography } from "antd";
import { colors } from "../theme/colors";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;


export function Carrossel() {

  const navigator = useNavigate()

  const bannerSlides = [
    {
      title: 'Transforme sua Sala de Aula!',
      subtitle: 'Decorações artesanais que encantam e inspiram',
      background: 'linear-gradient(135deg, #E6FFFB 0%, #B5F5EC 100%)',
      image: '🎨',
      btnText: 'Ver produtos',
      onclick: () => navigator("/#secao-produtos")
    },
    {
      title: 'Encomendas Personalizadas',
      subtitle: 'Criamos o que você imaginar!',
      background: 'linear-gradient(135deg, #F0F5FF 0%, #ADC6FF 100%)',
      image: '🌟',
      btnText: 'Fazer encomenda',
      onclick: () => navigator("/encomenda")
    }
  ];

  const screens = useBreakpoint();

  return (
    <Carousel
      autoplay
      effect="fade"
      dots={{ className: 'custom-dots' }}
      style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}
    >
      {bannerSlides.map((slide, index) => (
        <div key={index}>
          <div
            style={{
              background: slide.background,
              padding: screens.md ? '60px 80px' : '40px 24px',
              minHeight: screens.md ? 300 : 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <Title
                level={screens.md ? 1 : 3}
                style={{
                  color: '#08979C',
                  marginBottom: 12,
                  fontFamily: 'Fredoka, sans-serif'
                }}
              >
                {slide.title}
              </Title>
              <Paragraph
                style={{
                  fontSize: screens.md ? 20 : 16,
                  color: colors.textSecondary,
                  marginBottom: 24
                }}
              >
                {slide.subtitle}
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<RightOutlined />}
                style={{
                  background: colors.primary,
                  borderColor: colors.primary,
                  borderRadius: 8,
                  height: 48,
                  paddingInline: 32,
                  fontWeight: 600
                }}
                onClick={slide.onclick}
              >
                {slide.btnText}
              </Button>
            </div>
            {screens.md && (
              <div style={{ fontSize: 120, opacity: 0.8 }}>{slide.image}</div>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  )
}