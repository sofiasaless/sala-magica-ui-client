import { useState } from "react";
import { ProdutoService } from "../service/produto.service";
import type { PageProductResponse } from "../types/produto.type";
import type { PaginacaoProps } from "../api/modules/produtos.api";

export function useProdutos() {
  const [produtosPaginados, setProdutosPaginados] = useState<Map<string, PageProductResponse>>();
  const [totalProdutos, setTotalProdutos] = useState<number>()

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

  return { produtosPaginados, paginarFiltrado, paginar, carregarTotalProdutos, totalProdutos };
}
