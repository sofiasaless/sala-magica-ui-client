import { useState } from "react";
import { auth } from "../client/firebase";
import { AuthService } from "../service/auth.service";
import { UsuarioService } from "../service/usuario.service";
import type { ContadorQuantidade } from "../types/contador.type";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import type { User, UserFirestore } from "../types/user.type";

export function useUsuarios() {
  async function contarUsuarios() {
    try {
      const result = await UsuarioService.contarUsuarios();
      return successHookResponseByAxios<ContadorQuantidade>(result, 'contar usuários para admin');
    } catch (error) {
      return errorHookResponse<ContadorQuantidade>(error);
    }
  }

  async function encontrarUsuarioPorId(id: string) {
    try {
      const result = await UsuarioService.encontrarPorId(id);
      return successHookResponseByAxios<UserFirestore>(result, 'ao buscar usuário para admin')
    } catch (error) {
      return errorHookResponse<UserFirestore>(error);
    }
  }

  async function atualizarUsuario(body: Partial<User>) {
    try {
      const result = await UsuarioService.atualizarUsuario(body);
      await auth.currentUser?.reload()
      return successHookResponseByAxios(result, 'ao atualizar informações do usuário')
    } catch (error) {
      return errorHookResponse(error);
    }
  }

  async function excluirConta() {
    try {
      const result = await UsuarioService.deletarUsuario();
      await auth.currentUser?.reload()
      return successHookResponseByAxios(result, 'ao deletar conta')
    } catch (error) {
      return errorHookResponse(error);
    }
  }

  const [isCadastrando, setIsCadastrando] = useState<boolean>(false)
  async function cadastrarUsuario(body: User) {
    try {
      setIsCadastrando(true)
      const result = await AuthService.cadastrarUsuario(body);
      return successHookResponseByAxios(result, 'ao cadastrar conta')
    } catch (error) {
      return errorHookResponse(error);
    } finally {
      setIsCadastrando(false)
    }
  }

  return {
    contarUsuarios,
    encontrarUsuarioPorId,
    excluirConta,
    atualizarUsuario,
    cadastrarUsuario,
    isCadastrando
  }
}