import { signInWithEmailAndPassword } from "firebase/auth";
import { api } from "../api/axios";
import { auth } from "../client/firebase";
import type { User } from "../types/user.type";
import { errorHookResponse, successHookResponseByAxios } from "../types/hookResponse.type";

export const AuthService = {
  async logarUsuario(email: string, senha: string) {
    return await signInWithEmailAndPassword(auth, email, senha).then(async () => {
      const token = await auth.currentUser?.getIdTokenResult();
      localStorage.setItem('jwt', token?.token!)
    })
    .catch(err => {
      console.error('erro ao logar ', err)
    });
  },

  async cadastrarUsuario(usuario: User | any) {
    return await api.post<User>(`/auth/create/user`, usuario)
  },

  async verificarAdmin() {
    try {
      const resultado =  await api.get('/auth/admin/verify');
      return successHookResponseByAxios(resultado, 'verificar se o usuário é do tipo admin');
    } catch (error) {
      return errorHookResponse(error)
    }
  },

  async testarToken() {
    const response = await api.get('/auth/test')
    console.info('resultado do teste do token ', response);
  }
}