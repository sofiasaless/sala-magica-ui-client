export type SugestaoDescricaoRequestBody = {
  categoria: string,
  descricaoInicial: string
}

export type SugestaoResponseBody = {
  sugestao: string
}

export type SugestaoRespostaEncomendaRequestBody = {
  categoria: string,
  descricao_encomenda: string,
  cliente_nome: string,
  status_encomenda: string
}