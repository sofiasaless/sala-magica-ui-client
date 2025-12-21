import { api } from "../api/axios";
import type { ContadorQuantidade } from "../types/contador.type";
import type { EncomendaRequestBody, EncomendaResponseBody, EncomendaStatus, EncomendaUpdateRequestBody, RespostaEncomendaRequestBody } from "../types/encomenda.type";

export interface OrderFilterProps {
  ultimoMes?: boolean,
  status?: EncomendaStatus
}

export const EncomendaService = {
  async enviarEncomenda(encomendaBody: EncomendaRequestBody) {
    return await api.post<EncomendaResponseBody>(`/orders/create`, encomendaBody)
  },

  async encontrarPorUsuario() {
    return await api.get<EncomendaResponseBody[]>(`/orders/findAll`)
  },

  async encontrarTodas() {
    return await api.get<EncomendaResponseBody[]>(`/orders/admin/findAll`)
  },

  async contar(filtro?: OrderFilterProps) {
    let querys = ''
    if (filtro) {
      querys += '?'
      if (filtro.ultimoMes) querys += 'ultimoMes=true'
      if (filtro.status) querys += `status=${filtro.status}`
    }
    
    return await api.get<ContadorQuantidade>(`/orders/admin/count${querys}`)
  },

  async atualizar(encomendaBody: Partial<EncomendaUpdateRequestBody>, id_encomenda: string) {
    return await api.put(`/orders/admin/update/${id_encomenda}`, encomendaBody);
  },

  async enviarResposta(respostaBody: RespostaEncomendaRequestBody) {
    return await api.post(`/orders/admin/anwser-order`, respostaBody)
  },
}