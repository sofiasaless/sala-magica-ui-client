import { produtosApi, type PaginacaoProps } from "../api/modules/produtos.api"

export const ProdutoService = {
  async paginarFiltrado(limite: number, categoria: string, ordem: string) {
    const { data } = await produtosApi.paginarFiltrado(limite, categoria, ordem)
    return data
  },

  async paginar(page: PaginacaoProps) {
    const { data } = await produtosApi.paginar(page)
    return data
  },

  async contarProdutos() {
    const { data } = await produtosApi.contarProdutos()
    return data    
  }
}