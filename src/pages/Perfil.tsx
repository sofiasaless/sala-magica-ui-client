import { Badge, Button, ConfigProvider, Descriptions, Form, Space, Switch, Table, Tabs, Tag, type DescriptionsProps, type TableProps, type TabsProps } from "antd";
import { Container } from "../components/Container";
import { colors } from "../theme/colors";

const itemsDados: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Nome',
    children: 'Sofia Sales',
    span: 3
  },
  {
    key: '2',
    label: 'Telefone',
    children: '+55 (85) 98743-3212',
    span: 3
  },
  {
    key: '3',
    label: 'E-mail',
    children: 'sofiasaleswk@gmail.com',
    span: 3
  },
  {
    key: '6',
    label: 'Ativo desde',
    children: <Badge status="processing" text="20 de setembro de 2025" />,
    span: 3,
  }
];

interface DataType {
  key: string;
  categoria: string;
  envio: string;
  descricao: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Categoria',
    dataIndex: 'categoria',
    key: 'categoria',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Data de envio',
    dataIndex: 'envio',
    key: 'envio',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Ações',
    key: 'acoes',
    render: (_, record) => (
      <Space size="middle">
        <a>Ver detalhes</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    categoria: 'John Brown',
    envio: 'sasfas as ag',
    descricao: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    categoria: 'Jim Green',
    envio: 'sasfas as ag',
    descricao: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    categoria: 'Joe Black',
    envio: 'sasfas as ag',
    descricao: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const FormConfiguracoes = () => {
  return (
    <Form
      labelCol={{ span: 'auto' }}
      wrapperCol={{ span: 'auto' }}
      layout="horizontal"
      size={'middle'}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Form.Item label="Receber notificações">
        <Switch />
      </Form.Item>
      <Form.Item label="Permitir contato">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" danger>Excluir conta</Button>
      </Form.Item>
    </Form>
  )
}


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Meus dados',
    children: <Descriptions bordered items={itemsDados} extra={<Button type="primary">Editar dados</Button>} />,
  },
  {
    key: '2',
    label: 'Minhas encomendas',
    children: <Table<DataType> columns={columns} dataSource={data} pagination={false}/>,
  },
  {
    key: '3',
    label: 'Configurações',
    children: <FormConfiguracoes />,
  },
];


export const Perfil = () => {
  return (
    <>
      <Container
        justifyContent="center"
        heigth={'100vh'}
      >
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemActiveColor: colors.secondary,
                itemHoverColor: colors.secondary,
                inkBarColor: colors.secondary,
                itemSelectedColor: colors.secondary
              },
            },
          }}
        >

          <Tabs
            defaultActiveKey="1"
            centered
            items={items}
          />
        </ConfigProvider>
      </Container>
    </>
  )
}