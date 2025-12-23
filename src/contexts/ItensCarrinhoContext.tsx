import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ItemCarrinho, ItemCarrinhoResponseBody, Produto } from "../types/produto.type";
import { useAuth } from "./AuthContext";
import { CarrinhoService } from "../service/carrinho.service";
import { errorHookResponse, successHookResponse, successHookResponseByAxios, type HookResponse } from "../types/hookResponse.type";
import { useProdutosGeral } from "../hooks/useProdutosGeral";

interface ItensCarrinhoContextType {
  carrinho: ItemCarrinho[],
  adicionarItem: (item: ItemCarrinho) => Promise<HookResponse<any>>,
  removerItem: (item_id: string, produto_id: string) => Promise<HookResponse<any>>,
  isVazio: () => boolean,
  limparItens: () => Promise<HookResponse<any>>,
  alterarQuantidade: (quantidade: number, id_produto: string) => Promise<HookResponse<any> | undefined>
}

const ItensCarrinhoContext = createContext<ItensCarrinhoContextType | undefined>(undefined);

export const ItensPedidoProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])

  const { buscarProduto } = useProdutosGeral()

  const { isAutenticado } = useAuth()

  useEffect(() => {
    if (isAutenticado) {
      carregarCarrinho();
    } else {
      const carrinhoStorage = localStorage.getItem('carrinho');
      if (carrinhoStorage !== null) {
        setCarrinho(JSON.parse(carrinhoStorage) as ItemCarrinho[]);
      }
    }
  }, [isAutenticado])

  async function itemCarrinhoRBtoItemCarrinho(item: ItemCarrinhoResponseBody): Promise<ItemCarrinho> {
    const produtoEncontrado: Produto = (await buscarProduto(item.produto_ref)).datas!;

    return {
      id_item: item.id,
      quantidade: item.quantidade,
      ...produtoEncontrado
    }
  }

  const carregarCarrinho = async () => {
    try {
      const resultado = await CarrinhoService.listarCarrinho()
      const itens: ItemCarrinho[] = await Promise.all(resultado.data.map((item) => {
        return itemCarrinhoRBtoItemCarrinho(item);
      }))
      setCarrinho(itens);
      return successHookResponseByAxios<any>(resultado, 'buscar itens do carrinho do usuário')
    } catch (error) {
      return errorHookResponse<any>(error)
    }
  }

  const adicionarItem = async (item: ItemCarrinho): Promise<HookResponse<any>> => {
    try {
      let resultadoHook
      if (isAutenticado) {
        const resultado = await CarrinhoService.acaoCarrinho(item.id as string, item.quantidade);
        await carregarCarrinho()
        resultadoHook = successHookResponseByAxios<any>(resultado, 'executar ação de adicionar item ao carrinho');
      }


      if (!isAutenticado) {
        const itemExiste = carrinho.find(it => it.id === item.id);
        const atualizado = () => {
          if (!itemExiste) {
            return [...carrinho, { ...item, quantidade: item.quantidade }];
          }

          return carrinho.map(it =>
            it.id === item.id
              ? { ...it, quantidade: it.quantidade + item.quantidade }
              : it
          );
        }
        setCarrinho(atualizado());
        localStorage.setItem('carrinho', JSON.stringify(atualizado()));
        resultadoHook = successHookResponse<any>({ message: 'executar ação de adicionar item ao carrinho com visitante', status: 200 });
      }

      return resultadoHook as HookResponse<any>
    } catch (error) {
      return errorHookResponse<any>(error);
    }
  };

  const removerItem = async (item_id: string, produto_id: string) => {
    try {
      if (!isAutenticado) {
        const atualizado = carrinho.filter(item => item.id !== produto_id)
        setCarrinho(atualizado)
        localStorage.setItem('carrinho', JSON.stringify(atualizado));
        return successHookResponse<any>({ message: 'remover item do carrinho com visitante', status: 200 });
      }

      const resultado = await CarrinhoService.removerItem(item_id);
      setCarrinho(prev => prev.filter(item => item.id_item !== item_id))
      return successHookResponseByAxios<any>(resultado, 'remover item do carrinho');
    } catch (error) {
      return errorHookResponse<any>(error);
    }
  }

  const alterarQuantidade = async (quantidade: number, id_produto: string) => {
    try {
      const it = carrinho.find(item => item.id === id_produto);
      if (quantidade <= 0) {
        return await removerItem(it?.id_item!, id_produto!);
      }

      if (!isAutenticado) {
        setCarrinho(prev =>
          prev.map(item =>
            item.id === id_produto ? { ...item, quantidade } : item
          )
        );
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        return successHookResponse<any>({ message: 'alterar a quantidade de itens no carrinho com visitante', status: 200 });
      }

      if (isAutenticado) {
        const resultado = await CarrinhoService.atualizatQtdItem(it?.id_item!, quantidade);
        setCarrinho(prev =>
          prev.map(item =>
            item.id_item === it?.id_item ? { ...item, quantidade } : item
          )
        );
        return successHookResponseByAxios<any>(resultado, 'alterar a quantidade de itens no carrinho')
      }
    } catch (error) {
      return errorHookResponse<any>(error);
    }

  }

  const isVazio = () => {
    return carrinho.length === 0
  }

  const limparItens = async () => {
    try {
      if (isAutenticado) {
        await CarrinhoService.limparCarrinho();
      } else {
        localStorage.setItem('carrinho', JSON.stringify([]))
      }
      setCarrinho([]);
      return successHookResponse<any>({ message: 'Sucesso ao limpar o carrinho', status: 200 })
    } catch (error) {
      return errorHookResponse<any>(error);
    }
  }

  return (
    <ItensCarrinhoContext.Provider value={{ carrinho, adicionarItem, removerItem, isVazio, limparItens, alterarQuantidade }}>
      {children}
    </ItensCarrinhoContext.Provider>
  )
}

export const useItensCarrinho = () => {
  const context = useContext(ItensCarrinhoContext);
  if (!context) {
    throw new Error("useItensCarrinho deve ser usado dentro de um ItensCarrinhoProvider");
  }
  return context;
};