import { api } from "../api/axios"
import type { PageProductResponse, Produto } from "../types/produto.type"

export interface PaginacaoProps {
  limit?: number, 
  params: {
    navigation: 'next' | 'last' | 'first',
    cursor?: string,
    cursorPrev?: string,
  }, 
  filtro?: {
    categoria?: string,
    ordem?: string
  }
}

export const ProdutoService = {
  async paginarFiltrado(limite: number, categoria: string, ordem: string) {
    const { data } = await api.get<PageProductResponse>(`/products/page?limit=${limite}&categoria=${categoria}&ordem=${ordem}`)
    return data
  },

  async paginar(page: PaginacaoProps) {
    let paginacao = ''
    if (page.params.navigation === 'next') paginacao += `&cursor=${page.params.cursor}`
    if (page.params.navigation === 'last') paginacao += `&cursorPrev=${page.params.cursorPrev}`

    let filtragem = ''
    if (page.filtro) {
      if (page.filtro.categoria != '') filtragem += `&categoria=${page.filtro.categoria}`
      if (page.filtro.ordem != '' && page.filtro.ordem != undefined) filtragem += `&ordem=${page.filtro.ordem}`
    }

    // console.info('requisição indo a api ----> ', `/products/page?limit=${page.limit}${filtragem}${paginacao}`)

    const resultado = await api.get<PageProductResponse>(`/products/page?limit=${page.limit}${filtragem}${paginacao}`)

    return resultado.data
  },

  async contarProdutos(categoria?: string) {
    const { data } = await api.get<{total: number}>(`/products/count${(categoria)?`?categoria=${categoria}`:''}`)
    return data
  },

  async encontrarProdutoPorId(id: string) {
    return await api.get<Produto>(`/products/find/${id}`);
  },

  async cadastrar(body: Partial<Produto>) {
    return await api.post<Partial<Produto>>(`/products/admin`, body);
  },

  async atualizar(body: Partial<Produto>, id_produto: string) {
    return await api.put(`/products/admin/update/${id_produto}`, body);
  },

  async excluir(id_produto: string) {
    return await api.delete(`/products/admin/delete/${id_produto}`)
  }
}