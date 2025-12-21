import { api } from "../api/axios"
import type { DictionaryResponseBody } from "../types/dictionary.type"

export const DictionaryService = {
  async buscar() {
    return api.get<DictionaryResponseBody>(`/dictionary/find`)
  }
}