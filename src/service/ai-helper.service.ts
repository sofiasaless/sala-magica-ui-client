import { api } from "../api/axios"
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import type { SugestaoDescricaoRequestBody, SugestaoDescricaoResponseBody } from "../types/sugestao.type"

export const AiHelper = {
  async sugerirDescricaoEncomenda(payload: SugestaoDescricaoRequestBody) {
    try {
      const resultado = (await api.post<SugestaoDescricaoResponseBody>(`/ai-helper/suggest-description`, payload));
      return successHookResponseByAxios<SugestaoDescricaoResponseBody>(resultado, 'gerar sugestão de descrição de encomenda com IA')
    } catch (error) {
      return errorHookResponse<SugestaoDescricaoResponseBody>(error)
    }
  },
}