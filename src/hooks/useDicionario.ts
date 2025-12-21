import { useEffect, useState } from "react"
import type { DictionaryResponseBody } from "../types/dictionary.type"
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type"
import { DictionaryService } from "../service/dictionary.service"

export function useDicionario() {
  const [dicionario, setDicionario] = useState<DictionaryResponseBody | undefined>()

  const buscarDicionario = async () => {
    try {
      const resultado = await DictionaryService.buscar();
      setDicionario(resultado.data);
      return successHookResponseByAxios<DictionaryResponseBody>(resultado, 'ao buscar o dicionário')
    } catch (error) {
      return errorHookResponse<DictionaryResponseBody>(error);
    }
  }

  useEffect(() => {
    buscarDicionario()
  }, [])

  return {
    dicionario,
    buscarDicionario
  }
}