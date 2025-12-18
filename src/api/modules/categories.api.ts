import type { CategoriaResponseBody } from "../../types/cateogiras.type";
import { api } from "../axios";

export const categoriasApi = {
  listarTodas: () => api.get<CategoriaResponseBody[]>(`/categories/findAll`),
};
