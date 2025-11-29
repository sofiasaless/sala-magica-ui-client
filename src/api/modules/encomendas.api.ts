import type { Encomenda } from "../../types/encomenda.type";
import { api } from "../axios";

export const encomendasApi = {
  enviarEncomenda: (encomendaBody: Encomenda) => api.post<Encomenda>(`/orders/create`, encomendaBody),

};
