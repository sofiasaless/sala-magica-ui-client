import { useState } from "react";
import type { EncomendaRequestBody, EncomendaResponseBody } from "../types/encomenda.type";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import { EncomendaService, type OrderFilterProps } from "../service/encomenda.service";
import type { AxiosError } from "axios";
import type { ContadorQuantidade } from "../types/contador.type";

export function useEncomendas() {
  const [encomendasAdmin, setEncomendasAdmin] = useState<EncomendaResponseBody[]>([])

  async function carregarTodasEncomendas() {
    try {
      const resultado = await EncomendaService.encontrarTodas();
      setEncomendasAdmin(resultado.data);
      return successHookResponseByAxios<EncomendaResponseBody[]>(resultado, 'buscar encomendas para o admin')
    } catch (error) {
      return errorHookResponse<EncomendaResponseBody[]>(error);
    }
  }

  async function enviar(encomendaBody: EncomendaRequestBody) {
    try {
      const resultado = await EncomendaService.enviarEncomenda(encomendaBody);
      return successHookResponseByAxios<EncomendaResponseBody>(resultado, 'enviar encomenda para análise')
    } catch (error: AxiosError | any) {
      return errorHookResponse<EncomendaResponseBody>(error);
    }
  }

  async function encontrarPorUsuario() {
    try {
      const resultado = await EncomendaService.encontrarPorUsuario()
      return successHookResponseByAxios<EncomendaResponseBody[]>(resultado, 'buscar encomendas do usuário')
    } catch (error: AxiosError | any) {
      return errorHookResponse<EncomendaResponseBody[]>(error);
    }
  }

  async function contarEncomendas(filtro?: OrderFilterProps) {
    try {
      const resultado = await EncomendaService.contar(filtro);
      return successHookResponseByAxios<ContadorQuantidade>(resultado, 'contar encomendas para admin');
    } catch (error) {
      return errorHookResponse<ContadorQuantidade>(error);
    }
  }

  return {
    carregarTodasEncomendas,
    encomendasAdmin,
    enviar,
    encontrarPorUsuario,
    contarEncomendas
  }

}