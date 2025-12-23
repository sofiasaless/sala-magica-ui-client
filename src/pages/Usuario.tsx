import {
  BellOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
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
  Divider,
  Empty,
  Form,
  Grid,
  Input,
  List,
  Popconfirm,
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
import { ModalNotificacaoUsuario } from '../components/ModalNotificacaoUsuario';
import { NaoConectadoFeedback } from '../components/NaoConectadoFeedback';
import { useAuth } from '../contexts/AuthContext';
import { useNotificacoes } from '../contexts/NotificacoesContext';
import { useProdutosFavoritos } from '../contexts/ProdutosFavoritosContext';
import { useEncomendas } from '../hooks/useEncomendas';
import { useUsuarios } from '../hooks/useUsuarios';
import { useNotificacao } from '../providers/NotificacaoProvider';
import { colors } from '../theme/colors';
import type { EncomendaResponseBody } from '../types/encomenda.type';
import type { NotificacaoResponseBody } from '../types/notificacao.type';
import type { UserFirestore } from '../types/user.type';
import { formatarDataHoraAPI, formatarDataPtBR } from '../util/datas.util';
import { formatarPadraoBrasil, formatarTelefoneFirebase } from '../util/inputphone.util';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function Usuario() {
  const [form] = Form.useForm<UserFirestore>();
  const screens = useBreakpoint();

  const location = useLocation();
  const { tab } = location.state || {};

  const { usuario, isAutenticado } = useAuth()

  const { atualizarUsuario, excluirConta } = useUsuarios();

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

  const notificacao = useNotificacao()

  const handleAtualizarPerfil = async () => {
    const telefoneDigitado = form.getFieldValue('telefone');

    const telefoneE164 = formatarPadraoBrasil(telefoneDigitado);

    if (telefoneDigitado && !telefoneE164) {
      notificacao({
        message: 'Telefone inválido',
        description: 'Verifique o formato do telefone informado.',
        type: 'warning'
      });
      return;
    }

    const hookRes = await atualizarUsuario({
      displayName: form.getFieldValue('nome'),
      phoneNumber: telefoneE164 || undefined
    });

    notificacao({
      message: hookRes.message,
      type: hookRes.ok ? 'info' : 'error'
    });
    if (hookRes.ok) window.location.reload();
  };


  const handleExcluirConta = async () => {
    const hookRes = await excluirConta();
    notificacao({
      message: hookRes.message,
      type: hookRes.ok ? 'info' : 'error'
    });
    window.location.reload()
  }

  useEffect(() => {
    setUsuarioParaAlterar(usuario)
    handleListarEncomendas();
  }, [usuario])

  useEffect(() => {
    if (usuarioParaAlterar) {
      form.setFieldsValue({
        nome: usuarioParaAlterar.displayName as string,
        telefone: formatarTelefoneFirebase(usuarioParaAlterar.phoneNumber as string) || 'Não informado',
        email: usuarioParaAlterar.email as string
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
                  name="nome"
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
                  <Input readOnly prefix={<MailOutlined />} size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="telefone"
                  label="Telefone"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve(); // campo opcional
                        const regex = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/;
                        if (!regex.test(value)) {
                          return Promise.reject(
                            new Error('Informe um telefone válido. Ex: (11) 98765-4321')
                          );
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    size="large"
                    placeholder="(11) 98765-4321"
                  />
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

            <Divider style={{ margin: '32px 0 16px 0' }} />

            <div style={{ textAlign: 'center' }}>
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
              >
                <Popconfirm
                  title="Tem certeza que deseja excluir sua conta?"
                  description="Esta ação é irreversível. Todos os seus dados, favoritos e histórico de encomendas serão permanentemente removidos."
                  onConfirm={handleExcluirConta}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button type="text" danger size="small">Excluir minha conta</Button>
                </Popconfirm>
              </Button>
            </div>
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
                  Cliente desde {formatarDataHoraAPI(usuario?.metadata.creationTime as string)}
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

      <ModalNotificacaoUsuario fecharModal={() => setNotificationModalVisible(false)} modalVisivel={notificationModalVisible} selectedNotification={selectedNotification} />
    </div>
  );
};