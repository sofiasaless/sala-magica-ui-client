import { categoriasApi } from "../api/modules/categories.api";

export const CategoriaService = {
  async listarTodasCategorias() {
    return await categoriasApi.listarTodas();
  },

}