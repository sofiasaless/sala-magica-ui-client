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

  async function cadastrarProduto(form: Partial<Produto>) {
    try {
      console.info('formulario no hook ', form)
      const resultado = await ProdutoService.cadastrar(form);
      return successHookResponseByAxios<Partial<Produto>>(resultado, 'publicar novo produto na plataforma')
    } catch (error) {
      return errorHookResponse<Partial<Produto>>(error)
    }
  }

  async function atualizarProduto(form: Partial<Produto>, id_produto: string) {
    try {
      console.info('formulario no hook ATUALIZAR ', form)
      const resultado = await ProdutoService.atualizar(form, id_produto);
      return successHookResponseByAxios<Partial<Produto>>(resultado, 'atualizar produto na plataforma')
    } catch (error) {
      return errorHookResponse<Partial<Produto>>(error)
    }
  }

  async function excluirProduto(id_produto: string) {
    try {
      const resultado = await ProdutoService.excluir(id_produto);
      return successHookResponseByAxios<Partial<Produto>>(resultado, 'excluir produto da plataforma')
    } catch (error) {
      return errorHookResponse<Partial<Produto>>(error)
    }
  }

  return {
    produto,
    totalProdutos,
    carregandoProdutos,
    buscarProduto,
    contarTotalProdutos,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
  }
}