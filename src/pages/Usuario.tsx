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
import { Link, useLocation } from 'react-router-dom';
import { CardEncomenda } from '../components/CardEncomenda';
import { ItemNotificacao } from '../components/ItemNotificacao';
import { ModalEncomendaUsuario } from '../components/ModalEncomendaUsuario';
import { NaoConectadoFeedback } from '../components/NaoConectadoFeedback';
import { useAuth } from '../contexts/AuthContext';
import { useProdutosFavoritos } from '../contexts/ProdutosFavoritosContext';
import { useEncomendas } from '../hooks/useEncomendas';
import { useNotificacao } from '../providers/NotificacaoProvider';
import { colors } from '../theme/colors';
import type { EncomendaResponseBody } from '../types/encomenda.type';
import { formatarDataPtBR } from '../util/datas.util';
import type { NotificacaoResponseBody } from '../types/notificacao.type';
import { ModalNotificacaoUsuario } from '../components/ModalNotificacaoUsuario';
import { useNotificacoes } from '../contexts/NotificacoesContext';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function Usuario() {
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const location = useLocation();
  const { tab } = location.state || {};

  const { usuario, isAutenticado } = useAuth()

  const handleAtualizarPerfil = () => {
    message.success('Perfil atualizado com sucesso!');
  };

  const { notsPorUsuario } = useNotificacoes()

  const { produtosFavoritos } = useProdutosFavoritos();

  const [usuarioParaAlterar, setUsuarioParaAlterar] = useState(usuario)

  const [encomendas, setEncomendas] = useState<EncomendaResponseBody[] | undefined>()
  const floatNotificacao = useNotificacao();

  const { encontrarPorUsuario } = useEncomendas()

  const handleListarEncomendas = async () => {
    const resultado = await encontrarPorUsuario()

    if (resultado.ok) {
      setEncomendas(resultado.datas)
      return
    }

    floatNotificacao({
      message: 'Não foi possível recuperar suas encomendas',
      description: resultado.message,
      type: 'error'
    })
  }

  const [selectedOrder, setSelectedOrder] = useState<EncomendaResponseBody | undefined>(undefined);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  const handleViewOrder = (order: EncomendaResponseBody) => {
    setSelectedOrder(order);
    setOrderModalVisible(true);
  };

  const [selectedNotification, setSelectedNotification] = useState<NotificacaoResponseBody | undefined>(undefined);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  const handleViewNotification = (notification: NotificacaoResponseBody) => {
    setSelectedNotification(notification);
    setNotificationModalVisible(true);
  };

  useEffect(() => {
    setUsuarioParaAlterar(usuario)
    handleListarEncomendas();
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

  const [tabAtiva, setTabAtiva] = useState<string>(tab || 'profile')

  useEffect(() => {
    if (tab) setTabAtiva(tab || 'profile');
  }, [tab])

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
      children: encomendas?.length || 0 > 0 ? (
        <Card style={{ borderRadius: 12 }}>
          <Timeline
            items={encomendas?.map(encomenda => ({
              color: 'green',
              dot: <RocketOutlined />,
              children: (
                <CardEncomenda encomenda={encomenda} handleViewOrder={handleViewOrder} />
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
          <Link to={"/encomenda"}>
            <Button type="primary">
              Fazer Encomenda
            </Button>
          </Link>
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
          dataSource={notsPorUsuario}
          renderItem={notification => (
            <ItemNotificacao handleViewNotification={handleViewNotification} notification={notification} />
          )}
        />
      )
    }
  ];

  if (!isAutenticado) {
    return <NaoConectadoFeedback proposito='personalizar seu perfil na Sala Mágica!' />
  }

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
                  {encomendas?.length} Encomendas
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
          activeKey={tabAtiva}
          onChange={(key) => setTabAtiva(key)}
          items={tabItems}
          size={screens.md ? 'large' : 'middle'}
        />
      </Card>

      <ModalEncomendaUsuario encomendaSelecionada={selectedOrder} fechar={setOrderModalVisible} orderModalVisible={orderModalVisible} />

      <ModalNotificacaoUsuario fecharModal={() => setNotificationModalVisible(false)} modalVisivel={notificationModalVisible} selectedNotification={selectedNotification}/>
    </div>
  );
};