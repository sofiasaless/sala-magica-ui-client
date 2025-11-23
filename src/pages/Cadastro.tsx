import { Form, Input, Button, Typography, Card, Upload, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, CameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { colors } from '../theme/colors';
import type { User } from '../types/user.type';
import { AuthService } from '../service/auth.service';

const { Title, Text } = Typography;

const Cadastro = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = async (values: User) => {
    console.log('Register values:', values);
    try {
      await AuthService.cadastrarUsuario(values)
    } catch (error) {
      console.error('erro ao cadastrar usuario ', error)
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Você só pode fazer upload de arquivos de imagem!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('A imagem deve ser menor que 2MB!');
        return false;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    },
    fileList,
    listType: 'picture-circle',
    maxCount: 1,
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
          maxWidth: '500px',
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(19, 194, 194, 0.15)',
          border: 'none'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px', color: colors.textPrimary }}>
            Criar conta
          </Title>
          <Text type="secondary" style={{ color: colors.textSecondary }}>
            Preencha os dados para começar
          </Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="photoURL"
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            <Upload {...uploadProps}>
              <Button
                icon={<CameraOutlined />}
                style={{
                  borderRadius: '50%',
                  width: '104px',
                  height: '104px',
                  borderColor: colors.primary,
                  color: colors.primary
                }}
              >
                Foto
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="displayName"
            label="Nome completo"
            rules={[
              { required: true, message: 'Por favor, insira seu nome!' },
              { min: 3, message: 'O nome deve ter no mínimo 3 caracteres!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: colors.textLight }} />}
              placeholder="Seu nome completo"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

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
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Telefone (opcional)"
          >
            <Input
              prefix={<PhoneOutlined style={{ color: colors.textLight }} />}
              placeholder="(00) 00000-0000"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
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
              Criar conta
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Text style={{ color: colors.textSecondary }}>
              Já tem uma conta?{' '}
              <Link
                to="/entrar"
                style={{
                  color: colors.primary,
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Entrar
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

export default Cadastro;
