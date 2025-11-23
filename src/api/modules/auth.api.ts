import type { User } from "../../types/user.type";
import { api } from "../axios";

export const authApi = {
  cadastrarUsuario: (usuario: User) => api.post<User>(`/auth/create/user`, usuario),

  teste: () => api.get('/auth/test')
}