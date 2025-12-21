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
  respostas?: RespostasEncomendas[],
  status: EncomendaStatus,
  dataEncomenda: string
}

export type EncomendaStatus = 'NOVA' | 'EM ANÁLISE' | 'EM PRODUÇÃO' | 'CANCELADO' | 'FINALIZADO'

export type EncomendaRequestBody = Omit<
  EncomendaResponseBody, 
  "dataEncomenda" | "id" | "status"
>

export type EncomendaUpdateRequestBody = Omit<
  EncomendaResponseBody, 
  "dataEncomenda" | "id"
>

export type RespostaEncomendaRequestBody = {
  order: Pick<Encomenda, "id" | "solicitante">,
  response: string
}

export type RespostasEncomendas = {
  mensagem: string,
  data: string
}