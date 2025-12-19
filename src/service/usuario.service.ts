import { api } from "../api/axios";
import type { ContadorQuantidade } from "../types/contador.type";

export const UsuarioService = {
  async contarUsuarios() {
    return await api.get<ContadorQuantidade>('/auth/admin/count/users')
  }
}