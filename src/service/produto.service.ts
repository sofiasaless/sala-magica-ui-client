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

  async contarProdutos(categoria?: string) {
    const { data } = await produtosApi.contarProdutos(categoria)
    return data    
  },

  async encontrarProdutoPorId(id: string) {
    return await produtosApi.encontrarPorId(id);
  }
}