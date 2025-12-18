export type Produto = {
  id?: string;
  titulo: string;
  descricao: string;
  preco: number;
  modelagem: string;
  categoria: string;
  altura?: number;
  comprimento?: number;
  imagemCapa?: string;
  imagens?: string[];
  materiais: string;
  ativo: boolean;
  dataAnuncio: Date;
};

export type PageProductResponse = {
  produtos: Produto[],
  nextCursor: string,
  prevCursor: string
}

export type ItemCarrinho = Produto & {
  id_item?: string,
  quantidade: number
}

export type ItemCarrinhoResponseBody = {
  id: string,
  produto_ref: string,
  usuario_ref: string,
  quantidade: number,
  data_adicao: string,
}