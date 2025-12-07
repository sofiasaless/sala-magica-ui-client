import { AlertFilled, LoginOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Typography } from "antd";
import { colors } from "../theme/colors";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

export function NaoConectadoFeedback( { proposito }: {
  proposito: string
} ) {
  const navigator = useNavigate()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card style={{ borderRadius: 16, textAlign: 'center', padding: 48 }}>
        <Empty
          image={<div style={{ fontSize: 80, marginBottom: 16 }}><AlertFilled /></div>}
          description={
            <div>
              <Title level={4} style={{ color: '#262626' }}>
                Conta necessária
              </Title>
              <Text type="secondary">
                Entre com sua conta ou faça seu cadastro para {proposito}
              </Text>
            </div>
          }
        >
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            onClick={() => navigator('/entrar')}
            style={{
              background: colors.primary,
              borderColor: colors.primary,
              borderRadius: 8,
              height: 48,
              paddingInline: 32
            }}
          >
            Entrar com conta
          </Button>
        </Empty>
      </Card>
    </div>
  )
}