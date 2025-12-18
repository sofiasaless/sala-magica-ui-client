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
  status: string,
  data_envio: string
}

export type EncomendaRequestBody = Omit<
  EncomendaResponseBody, 
  "data_envio" | "id" | "status"
>