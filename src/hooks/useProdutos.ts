import { useState } from "react";
import { ProdutoService } from "../service/produto.service";
import type { PageProductResponse, Produto } from "../types/produto.type";
import type { PaginacaoProps } from "../api/modules/produtos.api";

export function useProdutos() {
  const [produtosPaginados, setProdutosPaginados] = useState<Map<string, PageProductResponse>>();
  const [totalProdutos, setTotalProdutos] = useState<number>()

  const [produto, setProduto] = useState<Produto>()
  const [carregando, setCarregando] = useState<boolean>(false)

  async function paginarFiltrado(param: {
    limite: number, categoria: string, ordem: string
  }, chave: string = 'principal') {
    const resultado = await ProdutoService.paginarFiltrado(param.limite, param.categoria, param.ordem)
    setProdutosPaginados(prev => {
      const novo = new Map(prev);
      novo.set(chave, resultado);
      return novo;
    });
  }

  // async function paginar(limite: number = 8, cursor: 'next' | 'last' | 'first' = 'first') {
  async function paginar(page?: PaginacaoProps) {
    if (page === undefined) {
      page = {
        limit: 8,
        params: {
          navigation: 'first',
        }
      }
    }

    const resultado = await ProdutoService.paginar(page)
    setProdutosPaginados(prev => {
      const novo = new Map(prev);
      novo.set('', resultado);
      return novo
    });
  }

  async function carregarTotalProdutos() {
    const resultado = await ProdutoService.contarProdutos()
    setTotalProdutos(resultado.total)
  }

  async function buscarProduto(id: string) {
    setCarregando(true)
    const resultado = await ProdutoService.encontrarProdutoPorId(id)
    setProduto(resultado)
    setCarregando(false)
  }

  return {
    carregando,
    produtosPaginados,
    paginarFiltrado,
    paginar,
    carregarTotalProdutos,
    totalProdutos,
    buscarProduto,
    produto
  };
}
