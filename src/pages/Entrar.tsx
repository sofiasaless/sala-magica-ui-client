import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../service/auth.service';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  senha: string;
}

const Entrar = () => {
  const [form] = Form.useForm<LoginFormValues>();

  const navigator = useNavigate();

  const { carregarUsuarioAtivo } = useAuth()

  const onFinish = async (values: LoginFormValues) => {
    await AuthService.logarUsuario(values.email, values.senha);
    carregarUsuarioAtivo()
    await navigator('/')
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.primaryLighter} 0%, ${colors.backgroundMain} 100%)`,
      padding: '20px'
    }}>
      <Card
        style={{
          maxWidth: '450px',
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(19, 194, 194, 0.15)',
          border: 'none'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px', color: colors.textPrimary }}>
            Bem-vindo de volta!
          </Title>
          <Text type="secondary" style={{ color: colors.textSecondary }}>
            Entre com suas credenciais para continuar
          </Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Por favor, insira um email válido!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: colors.textLight }} />}
              placeholder="seu@email.com"
              style={{ borderRadius: '8px' }}
              onChange={(e) => {
                form.setFieldValue('email', e.target.value)
              }}
            />
          </Form.Item>

          <Form.Item
            name="senha"
            label="Senha"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              { min: 6, message: 'A senha deve ter no mínimo 6 caracteres!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: colors.textLight }} />}
              placeholder="••••••••"
              style={{ borderRadius: '8px' }}
              onChange={(e) => {
                form.setFieldValue('senha', e.target.value)
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                height: '48px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                border: 'none'
              }}
            >
              Entrar
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Text style={{ color: colors.textSecondary }}>
              Não tem uma conta?{' '}
              <Link
                to="/cadastro"
                style={{
                  color: colors.primary,
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Cadastre-se
              </Link>
            </Text>

            <Text>
              <Link
                to="/"
                style={{
                  color: colors.textSecondary,
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                ← Voltar para página inicial
              </Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Entrar;
