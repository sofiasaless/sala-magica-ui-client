import { useEffect, useState } from "react"
import type { DictionaryResponseBody } from "../types/dictionary.type"
import { dictionaryApi } from "../api/modules/dictionary.api"
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type"

export function useDicionario() {
  const [dicionario, setDicionario] = useState<DictionaryResponseBody | undefined>()

  const buscarDicionario = async () => {
    try {
      const resultado = await dictionaryApi.buscar();
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