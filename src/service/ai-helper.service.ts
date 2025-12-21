import { api } from "../api/axios"
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import type { SugestaoDescricaoRequestBody, SugestaoResponseBody, SugestaoRespostaEncomendaRequestBody } from "../types/sugestao.type"

export const AiHelperService = {
  async sugerirDescricaoEncomenda(payload: SugestaoDescricaoRequestBody) {
    try {
      const resultado = (await api.post<SugestaoResponseBody>(`/ai-helper/order/suggest-description`, payload));
      return successHookResponseByAxios<SugestaoResponseBody>(resultado, 'gerar sugestão de descrição de encomenda com IA')
    } catch (error) {
      return errorHookResponse<SugestaoResponseBody>(error)
    }
  },

  async sugerirRespostaEncomenda(payload: SugestaoRespostaEncomendaRequestBody) {
    try {
      const resultado = (await api.post<SugestaoResponseBody>(`/ai-helper/order/suggest-response`, payload));
      return successHookResponseByAxios<SugestaoResponseBody>(resultado, 'gerar sugestão de resposta de encomenda com IA')
    } catch (error) {
      return errorHookResponse<SugestaoResponseBody>(error)
    }
  },
}