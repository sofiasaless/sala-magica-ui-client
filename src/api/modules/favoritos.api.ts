import type { PageProductResponse, Produto } from "../../types/produto.type";
import { api } from "../axios";

export interface PaginacaoProps {
  limit: number, 
  params: {
    navigation: 'next' | 'last' | 'first',
    cursor?: string,
    cursorPrev?: string,
  }, 
  filtro?: {
    categoria: string,
    ordem?: string
  }
}

export const favoritosApi = {
  paginar: (page: PaginacaoProps) => {
    let paginacao = ''
    if (page.params.navigation === 'next') paginacao += `&cursor=${page.params.cursor}`
    if (page.params.navigation === 'last') paginacao += `&cursorPrev=${page.params.cursorPrev}`

    let filtragem = ''
    if (page.filtro) {
      if (page.filtro.categoria != '') filtragem += `&categoria=${page.filtro.categoria}`
      if (page.filtro.ordem != '' &&  page.filtro.ordem != undefined) filtragem += `&ordem=${page.filtro.ordem}`
    }

    // console.info('requisição indo a api ----> ', `/products/page?limit=${page.limit}${filtragem}${paginacao}`)

    return api.get<PageProductResponse>(`/favorites/page?limit=${page.limit}${filtragem}${paginacao}`)
  },

  listarTodos: () => api.get<Produto[]>(`/favorites/findAll`),

  acaoFavoritar: (id_produto: string) => api.post(`/favorites/favAction/${id_produto}`)

};
