import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { NotificacaoService } from "../service/notificacao.service";
import { errorHookResponse, successHookResponseByAxios, type HookResponse } from "../types/hookResponse.type";
import type { NotificacaoResponseBody } from "../types/notificacao.type";
import { useAuth } from "./AuthContext";

interface NotificacoesContextType {
  carregandoNots: boolean,
  notsPorUsuario: NotificacaoResponseBody[] | undefined,
  recarregarNots: () => void,
  marcarNotComoLida: (id_not: string) => Promise<HookResponse<unknown>>,
  notsNaoLidas: number
}

const NotificacoesContext = createContext<NotificacoesContextType | undefined>(undefined);

export const NotificacoesProvider = ({ children }: { children: ReactNode }) => {
  const [notsPorUsuario, setNotsPorUsuario] = useState<NotificacaoResponseBody[] | undefined>(undefined)
  const [carregandoNots, setCarregandoNots] = useState(false)

  const [notsNaoLidas, setNotsNaoLidas] = useState<number>(0)

  const [watchNot, setWatchNot] = useState<boolean>(false)
  const recarregarNots = () => {
    setWatchNot(!watchNot)
  }

  const { usuario } = useAuth()

  useEffect(() => {
    if (!notsPorUsuario) encontrarNtsPorUsuario();
  }, [watchNot, usuario])

  const encontrarNtsPorUsuario = async (lida?: boolean) => {
    try {
      setCarregandoNots(true)
      const res = await NotificacaoService.encontrarPorUsuario(lida)
      setNotsPorUsuario(res.data)
      setNotsNaoLidas(res.data.filter(not => not.lido !== true).length);
      return successHookResponseByAxios<NotificacaoResponseBody[]>(res, 'encontrar notificações para o usuário');
    } catch (error) {
      return errorHookResponse<NotificacaoResponseBody[]>(error)
    } finally {
      setCarregandoNots(false)
    }
  }

  const marcarNotComoLida = async (id_not: string) => {
    try {
      const res = await NotificacaoService.marcarComoLida(id_not);
      // atualizando o array do contexto global
      setNotsPorUsuario(prev =>
        prev!.map(n => (n.id === id_not ? { ...n, lido: true } : n))
      );
      setNotsNaoLidas(notsNaoLidas - 1);
      return successHookResponseByAxios(res, 'marcar notificação como lida');
    } catch (error) {
      return errorHookResponse(error)
    }
  }

  return (
    <NotificacoesContext.Provider value={{ carregandoNots, notsPorUsuario, recarregarNots, marcarNotComoLida, notsNaoLidas }}>
      {children}
    </NotificacoesContext.Provider>
  )
}

export const useNotificacoes = () => {
  const context = useContext(NotificacoesContext);
  if (!context) {
    throw new Error("useNotificacoes deve ser usado dentro de um NotificacoesProvider");
  }
  return context;
};