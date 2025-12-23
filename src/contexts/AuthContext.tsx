import type { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../client/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../service/auth.service";

interface AuthContextType {
  usuario: User | null;
  isAutenticado: boolean;
  isAdmin: boolean;
  desconectarUsuario: () => Promise<void>;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUsuario(user);
      setIsAutenticado(!!user);

      const resultado = await AuthService.verificarAdmin()
      setIsAdmin(resultado.ok)

      setLoading(false);
    });

    // limpa o listener ao desmontar
    return () => unsubscribe();
  }, []);

  const desconectarUsuario = async () => {
    await auth.signOut();
    // aqui o onAuthStateChanged já vai atualizar o estado automaticamente
  };

  return (
    <AuthContext.Provider value={{ usuario, isAutenticado, desconectarUsuario, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};