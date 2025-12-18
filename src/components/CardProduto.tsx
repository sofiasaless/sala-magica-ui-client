import { EyeOutlined, HeartFilled, HeartOutlined, ShareAltOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Grid, Space, Tag, Tooltip, Typography } from "antd";
import { HttpStatusCode } from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useItensCarrinho } from "../contexts/ItensCarrinhoContext";
import { useProdutosFavoritos } from "../contexts/ProdutosFavoritosContext";
import { useNotificacao } from "../providers/NotificacaoProvider";
import { colors } from "../theme/colors";
import type { Produto } from "../types/produto.type";
import { produtoToItemCarrinho } from "../util/carrinho.util";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const CardProduto: React.FC<{ produto?: Produto, fav?: boolean }> = ({ produto, fav }) => {
  const navigator = useNavigate()

   const screens = useBreakpoint();

  const [isFav, setIsFav] = useState<boolean>(fav || false)
  const { isAutenticado } = useAuth()
  const { curtirOuDescurtirProduto, recarregarProdutosFavoritos, isProdutoFavoritado, produtosFavoritos } = useProdutosFavoritos()

  const handleFavAction = async () => {
    if (isAutenticado) {
      const requisicaoResult = await curtirOuDescurtirProduto(produto?.id as string);
      if (requisicaoResult.status === HttpStatusCode.Ok) {
        await recarregarProdutosFavoritos();
        setIsFav(!isFav)
      }
      return
    }
  }

  const { adicionarItem } = useItensCarrinho()

  const notificacao = useNotificacao()

  useEffect(() => {
    if (isAutenticado) {
      if (!fav) {
        setIsFav(isProdutoFavoritado(produto?.id as string))
      }
    }
  }, [isAutenticado, produtosFavoritos])

  return (
    <Card
      hoverable
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${colors.borderAndDivider}`,
        height: '100%'
      }}
      bodyStyle={{ padding: 16 }}
      cover={
        <div style={{ position: 'relative' }}>
          <img
            src={produto?.imagemCapa}
            alt={produto?.titulo}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover'
            }}
          />
          {/* {!produto?.ativo && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Tag color="default" style={{ fontSize: 14, padding: '4px 12px' }}>
                Indisponível
              </Tag>
            </div>
          )} */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <Tooltip title={isFav ? 'Remover dos favoritos' : 'Favoritar'}>
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={
                  isFav ? (
                    <HeartFilled style={{ color: '#FF4D4F' }} />
                  ) : (
                    <HeartOutlined style={{ color: '#FF4D4F' }} />
                  )
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavAction()
                }}
                style={{
                  background: 'white',
                  borderColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              />
            </Tooltip>
            <Tooltip title="Compartilhar">
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<ShareAltOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{
                  background: 'white',
                  borderColor: 'white',
                  color: colors.primary,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              />
            </Tooltip>
          </div>
        </div>
      }
      onClick={() => navigator(`/produto/${produto?.id}`)}
    >
      <Tag
        color="cyan"
        style={{ marginBottom: 8, borderRadius: 4 }}
      >
        {produto?.categoria}
      </Tag>

      <Title
        level={5}
        ellipsis={{ rows: 2 }}
        // style={{ minHeight: 44 }}
      >
        {produto?.titulo}
      </Title>

      <div style={{ marginBottom: 12 }}>
        <Text
          strong
          style={{ fontSize: 20, color: colors.primary }}
        >
          R$ {produto?.preco.toFixed(2)}
        </Text>
      </div>

      <Space style={{ width: '100%' }}>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={async (e) => {
            e.stopPropagation();

            const result = await adicionarItem(produtoToItemCarrinho(produto!, 1))
            
            if (result.ok) {
              notificacao({
                message: `"${produto?.titulo}" adicionado ao carrinho!`,
                type: 'success',
                placement: 'bottom'
              })
            } else {
              notificacao({
                message: `Erro ao adicionar produto`,
                type: 'error',
                description: result.message,
                placement: 'bottom'
              })
            }
          }}
          // disabled={!produto?.ativo}
          style={{
            flex: 1,
            background: produto?.ativo ? colors.primary : undefined,
            borderColor: produto?.ativo ? colors.primary : undefined,
            borderRadius: 8
          }}
        >
          {screens.sm ? 'Adicionar' : ''}
        </Button>
        <Button
          icon={<EyeOutlined />}
          onClick={() => navigator(`/produto/${produto?.id}`)}
          style={{ borderRadius: 8, borderColor: colors.primary, color: colors.primary }}
        >
          {screens.sm ? 'Ver' : ''}
        </Button>
      </Space>
    </Card>
  )
}