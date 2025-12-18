import { useState } from "react"
import type { Produto } from "../types/produto.type"
import { ProdutoService } from "../service/produto.service"
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type"

export function useProdutosGeral() {
  const [totalProdutos, setTotalProdutos] = useState<number>()
  const [produto, setProduto] = useState<Produto>()
  const [carregandoProdutos, setCarregandoProdutos] = useState<boolean>(false)

  async function contarTotalProdutos(categoria?: string) {
    const resultado = await ProdutoService.contarProdutos(categoria)
    setTotalProdutos(resultado.total)
  }

  async function buscarProduto(id: string) {
    try {
      setCarregandoProdutos(true)
      const resultado = await ProdutoService.encontrarProdutoPorId(id)
      setProduto(resultado.data)
      return successHookResponseByAxios<Produto>(resultado, 'buscar produto por id')
    } catch (error) {
      return errorHookResponse<Produto>(error);
    } finally {
      setCarregandoProdutos(false)
    }
  }

  return {
    produto,
    totalProdutos,
    carregandoProdutos,
    buscarProduto,
    contarTotalProdutos
  }
}