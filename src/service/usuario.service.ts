import { api } from "../api/axios";
import type { ContadorQuantidade } from "../types/contador.type";
import type { User, UserFirestore } from "../types/user.type";

export const UsuarioService = {
  async contarUsuarios() {
    return await api.get<ContadorQuantidade>('/users/admin/count')
  },

  async encontrarPorId(id: string) {
    return await api.get<UserFirestore>(`/users/admin/find/${id}`)
  }
}