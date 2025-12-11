import {
  BellOutlined,
  CheckCircleOutlined,
  EditOutlined,
  HeartOutlined,
  HistoryOutlined,
  MailOutlined,
  PhoneOutlined,
  RocketOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Grid,
  Input,
  List,
  message,
  Row,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardEncomenda } from '../components/CardEncomenda';
import { ItemNotificacao } from '../components/ItemNotificacao';
import { NaoConectadoFeedback } from '../components/NaoConectadoFeedback';
import { useProdutosFavoritos } from '../contexts/ProdutosFavoritosContext';
import { useAuthUser } from '../hooks/useAuthUser';
import { colors } from '../theme/colors';
import type { EncomendaResponseBody } from '../types/encomenda.type';
import { formatarDataPtBR } from '../util/datas.util';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const mockEncomenda: EncomendaResponseBody[] = [
  {
    id: '1',
    descricao: 'Painel de aniversariantes do mês com tema safari',
    categoria: 'Painéis',
    altura: 100,
    comprimento: 150,
    pendente: true,
    data_envio: '2024-11-20',
    solicitante: 'maria'
  }
]

const mockNotificacoes = [
  {
    id: 1,
    message: 'Bem-vindo à Sala Mágica! 🎨',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    message: 'Promoção especial: 15% OFF em murais decorativos!',
    type: 'success',
    read: false,
    createdAt: new Date().toISOString()
  }
]

export function Usuario() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const { usuario, isAutenticado } = useAuthUser()

  if (!isAutenticado) {
    return <NaoConectadoFeedback proposito='personalizar seu perfil na Sala Mágica!' />
  }

  const handleAtualizarPerfil = () => {
    message.success('Perfil atualizado com sucesso!');
  };

  const { produtosFavoritos } = useProdutosFavoritos();

  const navigator = useNavigate()

  const [usuarioParaAlterar, setUsuarioParaAlterar] = useState(usuario)

  useEffect(() => {
    setUsuarioParaAlterar(usuario)
  }, [usuario])

  useEffect(() => {
    if (usuarioParaAlterar) {
      form.setFieldsValue({
        displayName: usuarioParaAlterar.displayName,
        email: usuarioParaAlterar.email,
        phone: usuarioParaAlterar.phoneNumber || 'Não informado'
      });
    }
  }, [usuarioParaAlterar, form]);

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          Informações
        </span>
      ),
      children: (
        <Card style={{ borderRadius: 12 }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAtualizarPerfil}
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="displayName"
                  label="Nome Completo"
                  rules={[{ required: true, message: 'Por favor, preencha com seu nome.' }]}
                >
                  <Input name='displayName' prefix={<UserOutlined />} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[{ required: true, type: 'email', message: 'Por favor, preencha com seu e-mail.' }]}
                >
                  <Input prefix={<MailOutlined />} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  label="Telefone"
                  rules={[{ required: false }]}
                >
                  <Input prefix={<PhoneOutlined />} size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              icon={<EditOutlined />}
              style={{
                background: colors.primary,
                borderColor: colors.primary,
                borderRadius: 8
              }}
            >
              Salvar Alterações
            </Button>
          </Form>
        </Card>
      )
    },
    {
      key: 'orders',
      label: (
        <span>
          <HistoryOutlined />
          Encomendas
        </span>
      ),
      children: mockEncomenda.length > 0 ? (
        <Card style={{ borderRadius: 12 }}>
          <Timeline
            items={mockEncomenda.map(encomenda => ({
              color: 'green',
              dot: <RocketOutlined />,
              children: (
                <CardEncomenda encomenda={encomenda} />
              )
            }))}
          />
        </Card>
      ) : (
        <Empty
          image={<div style={{ fontSize: 64 }}>📦</div>}
          description={
            <div>
              <Title level={5}>Nenhuma encomenda</Title>
              <Text type="secondary">Faça uma encomenda personalizada!</Text>
            </div>
          }
        >
          <Button type="primary" onClick={() => navigator('/encomenda')}>
            Fazer Encomenda
          </Button>
        </Empty>
      )
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined />
          Notificações
          <Badge count={0} style={{ marginLeft: 8 }} />
        </span>
      ),
      children: (
        <List
          dataSource={mockNotificacoes}
          renderItem={notification => (
            <ItemNotificacao notification={notification} />
          )}
        />
      )
    }
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Card
        style={{
          borderRadius: 16,
          marginBottom: 24,
          background: 'linear-gradient(135deg, #E6FFFB 0%, #B5F5EC 100%)'
        }}
        bodyStyle={{ padding: screens.md ? 32 : 20 }}
      >
        <Row gutter={[24, 16]} align="middle">
          <Col>
            <Avatar
              size={screens.md ? 100 : 80}
              style={{
                background: '#FAAD14',
                fontSize: screens.md ? 40 : 32,
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              {usuario?.displayName?.charAt(0)}
            </Avatar>
          </Col>
          <Col flex="1">
            <Title level={3} style={{ marginBottom: 4, color: '#08979C' }}>
              {usuario?.displayName}
            </Title>
            <Text type="secondary">{usuario?.email}</Text>
            <div style={{ marginTop: 12 }}>
              <Space wrap>
                <Tag icon={<HeartOutlined />} color="magenta">
                  {produtosFavoritos?.length} Favoritos
                </Tag>
                <Tag icon={<ShoppingCartOutlined />} color="cyan">
                  {2} Encomendas
                </Tag>
                <Tag icon={<CheckCircleOutlined />} color="green">
                  Cliente desde {formatarDataPtBR(usuario?.metadata.creationTime)}
                </Tag>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>

      <Card style={{ borderRadius: 16 }}>
        <Tabs
          items={tabItems}
          size={screens.md ? 'large' : 'middle'}
        />
      </Card>
    </div>
  );
};