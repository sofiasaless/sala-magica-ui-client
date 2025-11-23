import { createContext, useContext, useState, type ReactNode } from "react";
import type { Produto } from "../types/produto.type";

interface ItensCarrinhoContextType {
  itensCarrinho: Produto[],
  adicionarItem: (item: Produto) => void,
  removerItem: (item_id: string) => void,
  isVazio: () => boolean,
}

const ItensCarrinhoContext = createContext<ItensCarrinhoContextType | undefined>(undefined);

export const ItensPedidoProvider = ({ children }: { children: ReactNode }) => {
  const [itensCarrinho, setItensCarrinho] = useState<Produto[]>([])
  
  const adicionarItem = (item: Produto) => {
    // se o item ja estiver no carrinho, entao nao adiciona mais
    // if (!(itensCarrinho.find(produto => produto.id === item.id))) {
      setItensCarrinho(prev => [...prev, item])
    //   localStorage.setItem('carrinho', JSON.stringify(itensCarrinho))
    // }
  }

  const removerItem = (item_id: string) => {
    setItensCarrinho(prev => prev.filter(item => item.id !== item_id))
  }

  const isVazio = () => {
    return itensCarrinho.length === 0
  }
  
  return (
    <ItensCarrinhoContext.Provider value={{itensCarrinho, adicionarItem, removerItem, isVazio}}>
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