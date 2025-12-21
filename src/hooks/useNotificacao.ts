import { useState } from "react";
import { NotificacaoService } from "../service/notificacao.service";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import type { NotificacaoResponseBody } from "../types/notificacao.type";

export function useNotificacoes() {
  const [notsPorUsuario, setNotsPorUsuario] = useState<NotificacaoResponseBody[]>([])

  const encontrarNtsPorUsuario = async (lida?: boolean) => {
    try {
      const res = await NotificacaoService.encontrarPorUsuario(lida)
      setNotsPorUsuario(res.data)
      return successHookResponseByAxios<NotificacaoResponseBody[]>(res, 'encontrar notificações para o usuário');
    } catch (error) {
      return errorHookResponse<NotificacaoResponseBody[]>(error)
    }
  }

  return {
    notsPorUsuario,
    encontrarNtsPorUsuario
  }

}