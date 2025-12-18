import type { ItemCarrinhoResponseBody } from "../../types/produto.type";
import { api } from "../axios";

export const cartApi = {
  listarItens: () => api.get<ItemCarrinhoResponseBody[]>(`/cart/findAll`),

  removerItem: (id: string) => api.delete(`/cart/delete/${id}`),

  acaoCarrinho: (id_produto: string, quantidade: number) => api.post(`/cart/cartAction/${id_produto}/${quantidade}`),

  atualizarQtdItem: (id_tem: string, quantidade: number) => api.put(`/cart/itemCart/update/${id_tem}/${quantidade}`),

  limparCarrinho: () => api.delete(`/cart/deleteAll`)
};
