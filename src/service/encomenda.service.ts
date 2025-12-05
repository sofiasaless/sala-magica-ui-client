import { HttpStatusCode } from "axios";
import { encomendasApi } from "../api/modules/encomendas.api";
import type { Encomenda } from "../types/encomenda.type";

interface RequestResult {
  status: 'ERROR' | 'SUCCESS',
  titulo: string,
  mensagem: string,
  detalhes?: string
}

export const EncomendaService = {
  async enviarEncomenda(encomendaBody: Encomenda): Promise<RequestResult> {
    const resultado = await encomendasApi.enviarEncomenda(encomendaBody)
    if (resultado.status === HttpStatusCode.Created) {
      return {
        status: 'SUCCESS',
        titulo: 'Encomenda enviada com sucesso!',
        mensagem: 'Aguarde a resposta para sua encomenda na caixa de notificações, em breve entraremos em contato!'
      }
    }
    throw new Error('Não foi possível enciar a encomenda!')
  }
}