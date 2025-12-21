import { UsuarioService } from "../service/usuario.service";
import type { ContadorQuantidade } from "../types/contador.type";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";
import type { UserFirestore } from "../types/user.type";

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

  return {
    contarUsuarios,
    encontrarUsuarioPorId
  }
}