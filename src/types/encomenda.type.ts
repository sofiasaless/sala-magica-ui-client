export type Encomenda = {
  id?: string,
  categoria: string,
  altura?: string,
  comprimento?: string,
  descricao: string,
  imagemReferencia?: string[],
  referencias?: string,
  solicitante: string,
  status?: string
}

export type EncomendaResponseBody = {
  id?: string,
  altura?: number,
  comprimento?: number,
  descricao: string,
  imagemReferencia?: string[],
  categoria_reference: string,
  referencias?: string,
  solicitante: string,
  status: EncomendaStatus,
  data_envio: string
}

export type EncomendaStatus = 'EM ANÁLISE' | 'EM PRODUÇÃO' | 'CANCELADO' | 'FINALIZADO'

export type EncomendaRequestBody = Omit<
  EncomendaResponseBody, 
  "data_envio" | "id" | "status"
>