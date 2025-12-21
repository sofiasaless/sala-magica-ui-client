import { api } from "../api/axios";
import type { Produto } from "../types/produto.type";

export const FavoritosService = {
  async listarProdutosFavoritados() {
    const { data } = await api.get<Produto[]>(`/favorites/findAll`)
    return data
  },

  async acaoFavoritar(id_produto: string) {
    const axiosResultado = await api.post(`/favorites/favAction/${id_produto}`);
    return axiosResultado
  }
}