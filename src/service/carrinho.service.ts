import { api } from "../api/axios";
import type { ItemCarrinhoResponseBody } from "../types/produto.type";

export const CarrinhoService = {
  async listarCarrinho() {
    return await api.get<ItemCarrinhoResponseBody[]>(`/cart/findAll`)
  },

  async acaoCarrinho(id_produto: string, quantidade: number) {
    return await api.post(`/cart/cartAction/${id_produto}/${quantidade}`)
  },

  async removerItem(id: string) {
    return await api.delete(`/cart/delete/${id}`)
  },

  async limparCarrinho() {
    return await api.delete(`/cart/deleteAll`);
  },

  async atualizatQtdItem(id_item: string, quantidade: number) {
    return await api.put(`/cart/itemCart/update/${id_item}/${quantidade}`)
  },
}