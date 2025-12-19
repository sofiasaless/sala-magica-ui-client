import { api } from "../api/axios";
import type { EncomendaRequestBody, EncomendaResponseBody, EncomendaStatus } from "../types/encomenda.type";

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
    
    return api.get<{total: number}>(`/orders/admin/count${querys}`)
  }
}