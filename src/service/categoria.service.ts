import { api } from "../api/axios";
import type { CategoriaRequestBody, CategoriaResponseBody } from "../types/cateogiras.type";

export const CategoriaService = {
  async listarTodasCategorias() {
    return await api.get<CategoriaResponseBody[]>(`/categories/findAll`)
  },

  async adicionar(body: CategoriaRequestBody) {
    return await api.post(`/categories/create`, body)
  },

  async atualizar(id: string, body: CategoriaRequestBody) {
    return await api.put(`/categories/update/${id}`, body)
  },

  async excluir(id: string) {
    return await api.delete(`/categories/delete/${id}`);
  }

}