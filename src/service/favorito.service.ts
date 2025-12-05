import { favoritosApi } from "../api/modules/favoritos.api";

export const FavoritosService = {
  async listarProdutosFavoritados() {
    const { data } = await favoritosApi.listarTodos();
    return data
  },

  async acaoFavoritar(id_produto: string) {
    const axiosResultado = await favoritosApi.acaoFavoritar(id_produto);
    return axiosResultado
  }
}