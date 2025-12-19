import { UsuarioService } from "../service/usuario.service";
import type { ContadorQuantidade } from "../types/contador.type";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";

export function useUsuarios() {
  async function contarUsuarios() {
    try {
      const result = await UsuarioService.contarUsuarios();
      return successHookResponseByAxios<ContadorQuantidade>(result, 'contar usuários para admin');
    } catch (error) {
      return errorHookResponse<ContadorQuantidade>(error);
    }
  }

  return {
    contarUsuarios
  }
}