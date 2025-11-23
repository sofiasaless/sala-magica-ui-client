import { Container } from "../components/Container";

import { SendOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import { Divisor } from "../components/Divisor";
import { ItemCarrinho } from "../components/ItemCarrinho";
import { useItensCarrinho } from "../contexts/ItensCarrinhoContext";

export const Carrinho = () => {

  const { itensCarrinho } = useItensCarrinho()

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
          dataSource={itensCarrinho}
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