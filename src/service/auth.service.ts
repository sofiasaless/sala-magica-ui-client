import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../client/firebase";
import type { User } from "../types/user.type";
import { authApi } from "../api/modules/auth.api";

export const AuthService = {
  async logarUsuario(email: string, senha: string) {
    return await signInWithEmailAndPassword(auth, email, senha).then(async (response) => {
      const token = await auth.currentUser?.getIdTokenResult();
      localStorage.setItem('jwt', token?.token!)
    })
    .catch(err => {
      console.error('erro ao logar ', err)
    });
  },

  async cadastrarUsuario(usuario: User | any) {
    const { data } = await authApi.cadastrarUsuario(usuario)
    return data
  },

  async testarToken() {
    const response = await authApi.teste()
    console.info('resultado do teste do token ', response);
  }
}