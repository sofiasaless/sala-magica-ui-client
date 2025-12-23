import { useState } from "react";
import type { EncomendaRequestBody, EncomendaResponseBody, EncomendaUpdateRequestBody, RespostaEncomendaRequestBody } from "../types/encomenda.type";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import { EncomendaService, type OrderFilterProps } from "../service/encomenda.service";
import type { AxiosError } from "axios";
import type { ContadorQuantidade } from "../types/contador.type";

export function useEncomendas() {
  const [encomendasAdmin, setEncomendasAdmin] = useState<EncomendaResponseBody[]>([])
  const [carregandoEncomendas, setCarregandoEncomendas] = useState<boolean>(false)

  async function carregarTodasEncomendas() {
    try {
      setCarregandoEncomendas(true)
      const resultado = await EncomendaService.encontrarTodas();
      setEncomendasAdmin(resultado.data);
      return successHookResponseByAxios<EncomendaResponseBody[]>(resultado, 'buscar encomendas para o admin')
    } catch (error) {
      return errorHookResponse<EncomendaResponseBody[]>(error);
    } finally {
      setCarregandoEncomendas(false)
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

  async function ataulizarEncomenda(payload: Partial<EncomendaUpdateRequestBody>, id_encomenda: string) {
    try {
      const resultado = await EncomendaService.atualizar(payload, id_encomenda);
      return successHookResponseByAxios<ContadorQuantidade>(resultado, 'ataulizar encomenda');
    } catch (error) {
      return errorHookResponse<ContadorQuantidade>(error);
    }
  }

  const [isEnviandoResp, setIsEnviandoResp] = useState<boolean>(false)
  async function responderEncomenda(payload: RespostaEncomendaRequestBody) {
    try {
      setIsEnviandoResp(true)
      const resultado = await EncomendaService.enviarResposta(payload);
      return successHookResponseByAxios<ContadorQuantidade>(resultado, 'enviar resposta para encomenda');
    } catch (error) {
      return errorHookResponse<ContadorQuantidade>(error);
    } finally {
      setIsEnviandoResp(false)
    }
  }

  return {
    carregarTodasEncomendas,
    encomendasAdmin,
    enviar,
    encontrarPorUsuario,
    contarEncomendas,
    carregandoEncomendas,
    ataulizarEncomenda,
    responderEncomenda,
    isEnviandoResp
  }

}