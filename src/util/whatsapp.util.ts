import type { ItemCarrinho, Produto } from "../types/produto.type";

const telefone = import.meta.env.VITE_ZAP_NUMBER;
const url = import.meta.env.VITE_URL_MAGIC_ROOM;

function gerarMensagemWhatsApp(produto: Produto) {
  const dimensoes =
    produto.altura && produto.comprimento
      ? `${produto.altura}cm x ${produto.comprimento}cm`
      : "Sob medida";

  return `Olá, achei esse produto interessante na Sala Mágica! Estaria disponível?\n
    *Produto:* ${produto.titulo}
    *Categoria:* ${produto.categoria}
    *Dimensões:* ${dimensoes}
    *Preço:* R$ ${produto.preco.toFixed(2)}\n

    🔗 Link do produto:
    ${url}/produto/${produto.id}
  `.trim();
}

export function gerarLinkWhatsAppFazerEncomenda(produto: Produto) {
  const mensagem = gerarMensagemWhatsApp(produto);
  const mensagemEncoded = encodeURIComponent(mensagem);

  return `https://wa.me/${telefone}?text=${mensagemEncoded}`;
}

function gerarMensagemCarrinho(itens: ItemCarrinho[]) {
  let total = 0;

  const itensTexto = itens.map((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

    return `
      ${index + 1}️⃣ ${item.titulo}
      • Categoria: ${item.categoria}
      • Quantidade: ${item.quantidade}
      • Valor unitário: R$ ${item.preco.toFixed(2)}
      • Subtotal: R$ ${subtotal.toFixed(2)}
      `.trim();
          })
    .join("\n\n");

  return `
Olá! Gostaria de finalizar minha compra na Sala Mágica 😊

🛒 *Itens do carrinho:*

${itensTexto}

💰 *Total:* R$ ${total.toFixed(2)}

Aguardo retorno para combinarmos os próximos passos ✨
`.trim();
}

export function gerarLinkWhatsAppCarrinho(itens: ItemCarrinho[]) {
  const mensagem = gerarMensagemCarrinho(itens);
  const mensagemEncoded = encodeURIComponent(mensagem);

  return `https://wa.me/${telefone}?text=${mensagemEncoded}`;
}
