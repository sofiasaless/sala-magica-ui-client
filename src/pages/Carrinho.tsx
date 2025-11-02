import { Container } from "../components/Container";

import { SendOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import { Divisor } from "../components/Divisor";
import { ItemCarrinho } from "../components/ItemCarrinho";

const data = Array.from({ length: 4 }).map(() => ({
  title: `Calendário`,
  description:
    'R$ 50,00',
  content:
    'Feito com material EVA, o calendário pode ser fixado na parede e é  excelente para interação com as crianças ao abordar meses do ano e dias da semanas.',
}));

export const Carrinho = () => {
  return (
    <>
      <Container
        paddingVertical={2}
        flexDirection="column"
        gap={30}
        alignItems="center"
      >
        <Divisor
          titulo="Seu carrinho"
        />
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          footer={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button icon={<SendOutlined />}>Enviar todos produtos para encomenda</Button>
            </div>
          }
          renderItem={(item) => (
            <ItemCarrinho item={item}/>
          )}
        />
      </Container>
    </>
  )
}