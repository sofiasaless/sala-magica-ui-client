export type Encomenda = {
  id?: string,
  categoria: string,
  altura?: string,
  comprimento?: string,
  descricao: string,
  imagemReferencia?: string[],
  referencias?: string,
  solicitante: string,
  pendente?: boolean
}

export type EncomendaResponseBody = {
  id?: string,
  categoria: string,
  altura?: number,
  comprimento?: number,
  descricao: string,
  imagemReferencia?: string[],
  referencias?: string,
  solicitante: string,
  pendente?: boolean,
  data_envio: string
}