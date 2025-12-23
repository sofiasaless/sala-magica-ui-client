import { api } from "../api/axios";
import type { ContadorQuantidade } from "../types/contador.type";
import type { User, UserFirestore } from "../types/user.type";

export const UsuarioService = {
  async contarUsuarios() {
    return await api.get<ContadorQuantidade>('/users/admin/count')
  },

  async encontrarPorId(id: string) {
    return await api.get<UserFirestore>(`/users/admin/find/${id}`)
  },

  async atualizarUsuario(body: Partial<User>) {
    return await api.put(`/users/update/user`, body);
  },

  async deletarUsuario() {
    return await api.delete(`/users/delete/user`);
  }
}