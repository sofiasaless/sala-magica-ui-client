import { useState } from "react";
import { ProdutoService, type PaginacaoProps } from "../service/produto.service";
import type { PageProductResponse } from "../types/produto.type";

export function useProdutosPaginados() {
  const [produtosPaginados, setProdutosPaginados] = useState<Map<string, PageProductResponse>>();
  const [carregandoPaginados, setCarregandoPaginados] = useState<boolean>(false)

  async function paginar(page?: PaginacaoProps, chave?: string) {
    setCarregandoPaginados(true)
    if (page === undefined) {
      page = {
        limit: 8,
        params: {
          navigation: 'first',
        }
      }
    } else {
      if (page.filtro?.categoria === 'Todos') {
        page.filtro.categoria = '';
      }
    }

    const resultado = await ProdutoService.paginar(page)
    setProdutosPaginados(prev => {
      const novo = new Map(prev);
      if (chave) {
        novo.set(chave, resultado);
      } else {
        novo.set('', resultado);
      }
      return novo
    });
    setCarregandoPaginados(false)
  }

  return {
    carregandoPaginados,
    produtosPaginados,
    paginar,
  };
}
