import { createContext, useContext, useState, type ReactNode } from "react";
import type { Produto } from "../types/produto.type";
import { FavoritosService } from "../service/favorito.service";
import type { AxiosResponse } from "axios";

interface ProdutosFavoritosContextType {
  produtosFavoritos: Produto[] | undefined,
  carregandoFavoritos: boolean,
  carregarProdutosFavoritos: () => Promise<void>,
  recarregarProdutosFavoritos: () => Promise<void>,
  curtirOuDescurtirProduto: (id_produto: string) => Promise<AxiosResponse>,
  isProdutoFavoritado: (id_produto: string | undefined) => boolean;
  limparConext: () => void
}

const ProdutosFavoritosContext = createContext<ProdutosFavoritosContextType | undefined>(undefined);

export const ProdutosFavoritosProvider = ({ children }: { children: ReactNode }) => {
  const [produtosFavoritos, setProdutosFavoritos] = useState<Produto[] | undefined>(undefined)

  const [carregandoFavoritos, setCarregandoFavoritos] = useState<boolean>(false)

  const carregarProdutosFavoritos = async () => {
    if (produtosFavoritos !== undefined) return
    setCarregandoFavoritos(true);
    console.info('carregando produtos favoritos .....')
    const resultado = await FavoritosService.listarProdutosFavoritados();
    setProdutosFavoritos(resultado);
    setCarregandoFavoritos(false);
  }

  const recarregarProdutosFavoritos = async () => {
    setCarregandoFavoritos(true);
    const resultado = await FavoritosService.listarProdutosFavoritados();
    setProdutosFavoritos(resultado);
    setCarregandoFavoritos(false);
  }

  const curtirOuDescurtirProduto = async (id_produto: string) => {
    const resultado = await FavoritosService.acaoFavoritar(id_produto);
    return resultado
  }

  const isProdutoFavoritado = (id_produto: string | undefined) => {
    if (id_produto === undefined || produtosFavoritos === undefined) return false
    return (produtosFavoritos.find(prod => prod.id === id_produto) !== undefined) 
  }

  const limparConext = () => {
    setProdutosFavoritos([])
  }

  return (
    <ProdutosFavoritosContext.Provider value={{ produtosFavoritos, carregarProdutosFavoritos, recarregarProdutosFavoritos, curtirOuDescurtirProduto, carregandoFavoritos, isProdutoFavoritado, limparConext }}>
      {children}
    </ProdutosFavoritosContext.Provider>
  )
}

export const useProdutosFavoritos = () => {
  const context = useContext(ProdutosFavoritosContext);
  if (!context) {
    throw new Error("useProdutosFavoritos deve ser usado dentro de um ProdutosFavoritosProvider");
  }
  return context;
};