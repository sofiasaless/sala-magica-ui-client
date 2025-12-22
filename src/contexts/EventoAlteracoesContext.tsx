import { createContext, useContext, useState, type ReactNode } from "react";

interface EventoAlteracoesContextType {
  novoProduto: boolean,
  eventoNovoProduto: () => void,
  atualizacaoEncomenda: boolean,
  eventoAtualizacaoEncomenda: () => void
}

const EventoAlteracoesContext = createContext<EventoAlteracoesContextType | undefined>(undefined)

export const EventoAlteracoesProvider = ({ children }: { children: ReactNode }) => {
  const [novoProduto, setNovoProduto] = useState<boolean>(false)
  const eventoNovoProduto = () => {
    setNovoProduto(!novoProduto);
  }

  const [atualizacaoEncomenda, setAtualizacaoEncomenda] = useState<boolean>(false)
  const eventoAtualizacaoEncomenda = () => {
    setAtualizacaoEncomenda(!atualizacaoEncomenda);
  }
  
  return (
    <EventoAlteracoesContext.Provider value={{
      novoProduto,
      eventoNovoProduto,
      eventoAtualizacaoEncomenda,
      atualizacaoEncomenda
    }}>
      {children}
    </EventoAlteracoesContext.Provider>
  )
};

export const useEventoAlteracoesContext = () => {
  const context = useContext(EventoAlteracoesContext);
  if (!context) {
    throw new Error("useEventoAlteracoesContext deve ser usado dentro de um EstoqueProvider");
  }
  return context;
}