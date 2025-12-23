import type { Produto } from "../types/produto.type";

const url = import.meta.env.VITE_URL_MAGIC_ROOM;

export function gerarMensagemCompartilharProduto(produto: Produto) {
  return `Achei esse produto lindo na Sala Mágica ✨\n

    🎨 ${produto.titulo}
    💰 R$ ${produto.preco.toFixed(2)}
    📐 ${produto.altura ?? "-"}cm x ${produto.comprimento ?? "-"}cm\n

    Veja mais detalhes aqui:
    ${url}/produto/${produto.id}
  `.trim();
}


export async function compartilharProduto(produto: Produto) {
  const texto = gerarMensagemCompartilharProduto(produto);

  if (navigator.share) {
    await navigator.share({
      title: produto.titulo,
      text: texto,
      url: `${url}/produto/${produto.id}`
    });
  } else {
    await navigator.clipboard.writeText(texto);
    alert("Mensagem copiada! Agora é só colar 😉");
  }
}
