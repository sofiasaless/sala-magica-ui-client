import type { EncomendaRequestBody, EncomendaResponseBody } from "../../types/encomenda.type";
import { api } from "../axios";

export const encomendasApi = {
  enviarEncomenda: (encomendaBody: EncomendaRequestBody) => api.post<EncomendaResponseBody>(`/orders/create`, encomendaBody),

  encontrarEncomendasPorUsuario: () => api.get<EncomendaResponseBody[]>(`/orders/findAll`)
};
