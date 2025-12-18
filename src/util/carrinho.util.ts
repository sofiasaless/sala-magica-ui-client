import type { ItemCarrinho, Produto } from "../types/produto.type"

export function produtoToItemCarrinho(produto: Produto, quantidade: number) {
  const item: ItemCarrinho = {
    quantidade: quantidade,
    ...produto!
  }
  return item
}