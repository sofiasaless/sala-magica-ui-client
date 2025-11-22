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
  ativo: boolean;
  dataAnuncio: Date;
};

export type PageProductResponse = {
  produtos: Produto[],
  nextCursor: string,
  prevCursor: string
}