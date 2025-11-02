import { Button, Flex, Image, Typography } from "antd"
import { Container } from "../components/Container"
import { colors } from "../theme/colors"
import { font } from "../theme/font";
import { HeartOutlined, ShareAltOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Divisor } from "../components/Divisor";
import { CardProduto } from "../components/CardProduto";

const { Text } = Typography;

export const DetalheProduto = () => {
  return (
    <>
      <Container
        backgroundColor={colors.primaryLighter}
        flexDirection="column"
        paddingVertical={1.5}
      >
        <Container
          backgroundColor={colors.primaryLighter}
          // backgroundColor='red'
          paddingVertical={1}
          alignItems="center"
          justifyContent="space-around"
        >
          <Flex vertical gap={"middle"} justify="center" align="center">
            <Flex>
              <Image
                width={350}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Flex>
            <Flex gap={'middle'}>
              <Image
                width={100}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <Image
                width={100}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <Image
                width={100}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Flex>
          </Flex>

          <Flex vertical justify="center" gap={"large"}>
            <Flex vertical>
              <Text style={{ fontSize: font.h3 }}>Calendário tema azul</Text>
              <Text style={{ fontSize: font.h4, color: colors.secondary }}>R$ 50,00</Text>
            </Flex>

            <Flex gap={"small"}>
              <Button type="dashed" size="middle" shape="circle" icon={<ShareAltOutlined style={{ color: colors.info, fontSize: font.h5 }} />} />
              <Button type="dashed" size="middle" shape="circle" icon={<HeartOutlined style={{ color: colors.error, fontSize: font.h5 }} />} />
            </Flex>

            <Flex gap={"small"}>
              <Button type="dashed" size="large" shape="circle" icon={<ShoppingCartOutlined style={{ color: colors.primary, fontSize: font.h4 }} />} />
              <Button type="primary" size="large">Encomendar produto</Button>
            </Flex>
          </Flex>

        </Container>

        <Container
          backgroundColor={colors.primaryLighter}
          // backgroundColor='red'
          paddingVertical={1.5}
          alignItems="flex-start"
          justifyContent="space-around"
          gap={50}
        >
          <Flex vertical>
            <Divisor
              titulo="Descrição do produto"
              tamanhoTitulo={font.body}
            />
            <Text style={{ textAlign: 'center' }}>Feito com material EVA, o calendário pode ser fixado na parede e é  excelente para interação com as crianças ao abordar meses do ano e dias  da semanas.</Text>
          </Flex>

          <Flex vertical>
            <Divisor
              titulo="Medidas (Alt x Comp)"
              tamanhoTitulo={font.body}
            />
            <Text style={{ textAlign: 'center' }}>Altura: 50,00cm</Text>
            <Text style={{ textAlign: 'center' }}>Comprimento: 50,00cm</Text>
          </Flex>

          <Flex vertical>
            <Divisor
              titulo="Confecção e modelagem"
              tamanhoTitulo={font.body}
            />
            <Text style={{ textAlign: 'center' }}>A decoração é confeccionada com folhas de papel E.V.A de várias cores,  cola para madeira/isopor e muito carinho! O material garante a firmeza e durabilidade necessária para se manter conservado na sala de aula  durante todo o período letivo.</Text>
          </Flex>
        </Container>
      </Container>

      <Container
        paddingVertical={3}
        flexDirection="column"
        gap={30}
        alignItems="center"
      >
        <Divisor
          titulo="Você também pode gostar"
        />
        <Flex
          gap={"large"}
          wrap
          justify="center"
        >
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
        </Flex>

        <Button size="large" type="primary">Ver mais</Button>

      </Container>
    </>
  )
}