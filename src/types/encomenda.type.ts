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