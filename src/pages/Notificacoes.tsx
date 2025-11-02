import { Container } from "../components/Container";

import { Flex, List, Skeleton, Typography } from "antd";
import { Divisor } from "../components/Divisor";

const data = Array.from({ length: 4 }).map(() => ({
  name: `Novo produto no catálogo!`,
  description:
    'R$ 50,00',
  content:
    'Feito com material EVA, o calendário pode ser fixado na parede e é  excelente para interação com as crianças ao abordar meses do ano e dias da semanas.',
}));

const { Text, Title } = Typography;

export const Notificacoes = () => {
  return (
    <>
      <Container
        paddingVertical={2}
        flexDirection="column"
        gap={30}
        alignItems="center"
        heigth={'100vh'}
      >
        <Divisor
          titulo="Suas notificações"
        />
        <List
          style={{
            width: '100%'
          }}
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="list-loadmore-edit">Ver detalhes</a>, <a key="list-loadmore-more">Marcar como lida</a>]}
            >
              <Skeleton title={false} loading={false} active>
                <List.Item.Meta
                  title={
                    <Title level={4}>{item.name}</Title>
                  }
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <Flex vertical>
                  <Text>Data</Text>
                  <Text>12/02/2025</Text>
                </Flex>
              </Skeleton>
            </List.Item>
          )}
        />
      </Container>
    </>
  )
}