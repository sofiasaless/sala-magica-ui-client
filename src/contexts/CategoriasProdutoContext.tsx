import type { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CategoriaService } from "../service/categoria.service";
import type { CategoriaResponseBody } from "../types/cateogiras.type";
import { errorHookResponse, successHookResponseByAxios, type HookResponse } from "../types/hookResponse.type";

interface CategoriasProdutoContextType {
  categoriasProdutos: CategoriaResponseBody[] | undefined,
  carregandoCategorias: boolean,
  encontrarNomePorId: (id: string | undefined) => string | undefined,
  adicionarCategoria: (nome: string) => Promise<HookResponse<unknown>>,
  atualizarCategoria: (id_categoria: string, nome: string) => Promise<HookResponse<unknown>>,
  excluirCategoria: (id_categoria: string) => Promise<HookResponse<unknown>>,
}

const CategoriasProdutoContext = createContext<CategoriasProdutoContextType | undefined>(undefined);

export const CategoriasProdutoProvider = ({ children }: { children: ReactNode }) => {
  const [categoriasProdutos, setCategoriasProduto] = useState<CategoriaResponseBody[] | undefined>(undefined)
  const [carregandoCategorias, setCarregandoCategorias] = useState(false)

  useEffect(() => {
    if (!categoriasProdutos) buscarTodas();
  }, [])

  const buscarTodas = async (): Promise<HookResponse<CategoriaResponseBody[]>> => {
    try {
      setCarregandoCategorias(true)
      const resultado = await CategoriaService.listarTodasCategorias();
      setCategoriasProduto(resultado.data)
      return successHookResponseByAxios<CategoriaResponseBody[]>(resultado, 'buscar categorias de produtos');
    } catch (error: AxiosError | any) {
      return errorHookResponse<CategoriaResponseBody[]>(error);
    } finally {
      setCarregandoCategorias(false)
    }
  }

  const encontrarNomePorId = (id: string | undefined) => {
    if (!id) return ''
    return categoriasProdutos?.find(cat => cat.id === id)?.nome
  }

  const atualizarCategoria = async (id_categoria: string, nome: string) => {
    try {
      const res = await CategoriaService.atualizar(id_categoria, { nome });
      await buscarTodas();
      return successHookResponseByAxios(res, 'atualizar categoria na Sala Mágica');
    } catch (error) {
      return errorHookResponse(error);
    }
  }

  const adicionarCategoria = async (nome: string) => {
    try {
      const res = await CategoriaService.adicionar({ nome });
      await buscarTodas();
      return successHookResponseByAxios(res, 'adicionar nova categoria na Sala Mágica');
    } catch (error) {
      return errorHookResponse(error);
    }
  }

  const excluirCategoria = async (id_categoria: string) => {
    try {
      const res = await CategoriaService.excluir(id_categoria);
      await buscarTodas();
      return successHookResponseByAxios(res, 'adicionar nova categoria na Sala Mágica');
    } catch (error) {
      return errorHookResponse(error);
    }
  }

  return (
    <CategoriasProdutoContext.Provider value={{ categoriasProdutos, carregandoCategorias, encontrarNomePorId, adicionarCategoria, atualizarCategoria, excluirCategoria }}>
      {children}
    </CategoriasProdutoContext.Provider>
  )
}

export const useCategoriasProduto = () => {
  const context = useContext(CategoriasProdutoContext);
  if (!context) {
    throw new Error("useCategoriasProduto deve ser usado dentro de um CategoriasProdutoProvider");
  }
  return context;
};