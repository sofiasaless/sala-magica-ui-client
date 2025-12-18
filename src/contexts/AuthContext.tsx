import type { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../client/firebase";

interface AuthContextType {
  usuario: User | null
  isAutenticado: boolean,
  carregarUsuarioAtivo: () => void
  desconectarUsuario: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<User | null>(null)
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false)

  const carregarUsuarioAtivo = () => {
    setUsuario(auth.currentUser)
    setIsAutenticado((auth.currentUser != null))
  }

  const desconectarUsuario = async () => {
    await auth.signOut();
    setIsAutenticado(false)
  }

  useEffect(() => {
    carregarUsuarioAtivo()
  }, [])

  return (
    <AuthContext.Provider value={{ usuario, desconectarUsuario, isAutenticado, carregarUsuarioAtivo }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};