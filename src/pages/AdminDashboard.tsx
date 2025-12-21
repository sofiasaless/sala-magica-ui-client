import {
  DashboardOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  PictureOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Grid,
  Popconfirm,
  Space,
  Tabs,
  Tag,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalCategoriaAdmin } from '../components/ModalCategoriaAdmin';
import { ModalEncomendaAdmin } from '../components/ModalEncomendaAdmin';
import { ModalProdutoAdmin } from '../components/ModalProdutoAdmin';
import { useAuth } from '../contexts/AuthContext';
import { useCategoriasProduto } from '../contexts/CategoriasProdutoContext';
import { useEncomendas } from '../hooks/useEncomendas';
import { useProdutosGeral } from '../hooks/useProdutosGeral';
import { useProdutosPaginados } from '../hooks/useProdutosPaginados';
import { useUsuarios } from '../hooks/useUsuarios';
import { useNotificacao } from '../providers/NotificacaoProvider';
import { colors } from '../theme/colors';
import type { CategoriaResponseBody } from '../types/cateogiras.type';
import type { EncomendaResponseBody, EncomendaStatus } from '../types/encomenda.type';
import type { Produto } from '../types/produto.type';
import { formatarDataHoraAPI } from '../util/datas.util';
import { getStatusColor } from '../util/encomenda.util';
import { Conteudo } from './dashboard-childrens/Conteudo';
import { Encomendas } from './dashboard-childrens/Encomendas';
import { Produtos } from './dashboard-childrens/Produtos';
import { VisaoGeral } from './dashboard-childrens/VisaoGeral';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const screens = useBreakpoint();

  const navigator = useNavigate()

  const { paginar, produtosPaginados } = useProdutosPaginados()

  const { encontrarNomePorId, categoriasProdutos } = useCategoriasProduto()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);

  // estados para modal
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<EncomendaResponseBody | null>(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [editingCategory, setEditingCategory] = useState<CategoriaResponseBody | null>(null);

  const { carregarTodasEncomendas, encomendasAdmin, carregandoEncomendas } = useEncomendas()

  const { isAutenticado } = useAuth()

  const { contarTotalProdutos, totalProdutos } = useProdutosGeral()

  const { encontrarUsuarioPorId } = useUsuarios()

  const { excluirProduto } = useProdutosGeral()

  const [pageSize] = useState<number>(8)

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Produto) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleViewOrder = (order: EncomendaResponseBody) => {
    setSelectedOrder(order);
    setOrderModalVisible(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryModalVisible(true);
  };

  const handleEditCategory = (cat: CategoriaResponseBody) => {
    setEditingCategory(cat);
    setCategoryModalVisible(true);
  }

  const handleDeleteProduct = async (id: string) => {
    const res = await excluirProduto(id);
    notificacao({
      message: res.message,
      type: (res.ok) ? 'success' : 'error'
    })
    await paginar({
      limit: pageSize,
      params: {
        navigation: 'first'
      }
    })
  }

  const notificacao = useNotificacao()

  const [solicitantes, setSolicitantes] = useState<Map<string, string>>(new Map)

  const carregarSolicitantes = async () => {
    let map: Map<string, string> = new Map();

    encomendasAdmin.map(async (enc) => {
      let nome: string = ''
      if (map.has(enc.solicitante)) return;
      const res = await encontrarUsuarioPorId(enc.solicitante);
      if (res.ok) {
        nome = res.datas?.nome as string || 'Não identificado'
      } else {
        nome = 'Não identificado'
      }
      map.set(enc.solicitante, nome)
    })
    setSolicitantes(map);
  }

  useEffect(() => {
    carregarTodasEncomendas()
  }, [isAutenticado])

  useEffect(() => {
    if (!carregandoEncomendas) carregarSolicitantes();
  }, [carregandoEncomendas])

  const productColumns = [
    {
      title: 'Produto',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: Produto) => (
        <Space>
          <img
            src={record.imagemCapa}
            alt={record.titulo}
            style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
          />
          <div>
            <Text strong style={{ display: 'block' }}>{record.titulo}</Text>
            <Text>{record.altura}cm x {record.comprimento}cm</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco: number) => `R$ ${preco.toFixed(2)}`
    },
    {
      title: 'Status',
      dataIndex: 'ativo',
      key: 'ativo',
      render: (ativo: boolean) => <Tag color={(ativo)?'geekblue':'processing'}>{(ativo)?'Ativo':'Inativo'}</Tag>
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria_reference',
      key: 'categoria_reference',
      render: (categoria_reference: string) => <Tag color="cyan">{encontrarNomePorId(categoria_reference)}</Tag>
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: unknown, record: Produto) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigator(`/produto/${record.id}`)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: colors.primary }} />}
            onClick={() => handleEditProduct(record)}
          />
          <Popconfirm
            title="Remover produto?"
            onConfirm={() => handleDeleteProduct(record.id as string)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const encomendasColunas = [
    {
      title: 'Pedido',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text strong>#{id}</Text>
    },
    {
      title: 'Cliente',
      dataIndex: 'solicitante',
      key: 'solicitante',
      render: (solicitante: string) => <Text>{solicitantes.get(solicitante) ?? 'Carregando...'}</Text>
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria_reference',
      key: 'categoria_reference',
      render: (cat: string) => <Tag color="cyan">{encontrarNomePorId(cat)}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: EncomendaStatus) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    {
      title: 'Data',
      dataIndex: 'dataEncomenda',
      key: 'dataEncomenda',
      render: (date: string) => formatarDataHoraAPI(date)
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: unknown, record: EncomendaResponseBody) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewOrder(record)}
        >
          Detalhes
        </Button>
      )
    }
  ];

  const [tabAtiva, setTabAtiva] = useState<string>('visao-geral')

  const tabItems = [
    {
      key: 'visao-geral',
      label: (
        <span>
          <DashboardOutlined />
          Visão Geral
        </span>
      ),
      children: (
        <VisaoGeral navegar={setTabAtiva} encomendas={encomendasAdmin} encomendasColunas={encomendasColunas} handleViewOrder={handleViewOrder} qtdProdutos={totalProdutos} />
      )
    },
    {
      key: 'produtos',
      label: (
        <span>
          <ShoppingOutlined />
          Produtos
          <Badge count={totalProdutos} style={{ marginLeft: 8, background: colors.primary }} />
        </span>
      ),
      children: (
        <Produtos
          paginationProps={{
            pageSize: pageSize, totalProdutos: totalProdutos,
            paginarAdiante: () => paginar({
              limit: pageSize,
              params: {
                navigation: 'next',
                cursor: produtosPaginados?.get('')?.nextCursor,
                cursorPrev: produtosPaginados?.get('')?.prevCursor
              }
            }),
            paginarVoltar: () => paginar({
              limit: pageSize,
              params: {
                navigation: 'last',
                cursor: produtosPaginados?.get('')?.nextCursor,
                cursorPrev: produtosPaginados?.get('')?.prevCursor
              }
            })
          }}
          handleAddProduct={handleAddProduct} productColumns={productColumns} produtos={produtosPaginados?.get('')?.produtos}
        />
      )
    },
    {
      key: 'encomendas',
      label: (
        <span>
          <FileTextOutlined />
          Encomendas
        </span>
      ),
      children: (
        <Encomendas encomendas={encomendasAdmin} encomendasColunas={encomendasColunas} handleViewOrder={handleViewOrder} />
      )
    },
    {
      key: 'conteudo',
      label: (
        <span>
          <PictureOutlined />
          Conteúdo
        </span>
      ),
      children: (
        <Conteudo categorias={categoriasProdutos} handleAddCategory={handleAddCategory} handleEditCategory={handleEditCategory} />
      )
    }
  ];

  useEffect(() => {
    paginar({
      limit: pageSize,
      params: {
        navigation: 'first'
      }
    })
    contarTotalProdutos()
  }, [])

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 4 }}>
          <DashboardOutlined style={{ marginRight: 12, color: colors.primary }} />
          Painel Administrativo
        </Title>
        <Text type="secondary">Gerencie produtos, encomendas e conteúdo da Sala Mágica</Text>
      </div>

      <Card style={{ borderRadius: 16 }}>
        <Tabs activeKey={tabAtiva} onChange={(key) => setTabAtiva(key)} items={tabItems} size={screens.md ? 'large' : 'middle'} />
      </Card>

      {/* modal de edição e adição de produtos */}
      <ModalProdutoAdmin isModalOpen={isModalOpen} editingProduct={editingProduct} categorias={categoriasProdutos} fecharModal={setIsModalOpen} />

      {/* modal de detalhes da encomenda */}
      <ModalEncomendaAdmin orderModalVisible={orderModalVisible} fecharModal={setOrderModalVisible} selectedOrder={selectedOrder} solicitantes={solicitantes} />

      {/* modal de edição e adição de categorias */}
      <ModalCategoriaAdmin open={categoryModalVisible} editingCategory={editingCategory} fecharModal={setCategoryModalVisible} />
    </div>
  );
};

export default AdminDashboard;