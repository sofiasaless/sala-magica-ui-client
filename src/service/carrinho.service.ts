import { cartApi } from "../api/modules/cart.api";

export const CarrinhoService = {
  async listarCarrinho() {
    return await cartApi.listarItens();
  },

  async acaoCarrinho(id_produto: string, quantidade: number) {
    return await cartApi.acaoCarrinho(id_produto, quantidade);
  },

  async removerItem(id: string) {
    return await cartApi.removerItem(id);
  },

  async limparCarrinho() {
    return await cartApi.limparCarrinho();
  },

  async atualizatQtdItem(id_item: string, quantidade: number) {
    return await cartApi.atualizarQtdItem(id_item, quantidade);
  },
}