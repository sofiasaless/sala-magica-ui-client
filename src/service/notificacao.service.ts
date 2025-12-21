import { api } from "../api/axios";
import type { NotificacaoResponseBody } from "../types/notificacao.type";

export const NotificacaoService = {
  async encontrarPorUsuario(lidas?: boolean) {
    return await api.get<NotificacaoResponseBody[]>(`/notification/findAll${lidas?`?lidas=${lidas}`:''}`);
  }
  
}