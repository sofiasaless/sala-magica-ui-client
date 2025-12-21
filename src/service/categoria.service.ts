import { api } from "../api/axios";
import type { CategoriaResponseBody } from "../types/cateogiras.type";

export const CategoriaService = {
  async listarTodasCategorias() {
    return await api.get<CategoriaResponseBody[]>(`/categories/findAll`)
  },

}