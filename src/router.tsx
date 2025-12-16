import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ItensPedidoProvider } from "./contexts/ItensCarrinhoContext";
import Cadastro from "./pages/Cadastro";
import { DetalhesProduto } from "./pages/DetalheProduto";
import { FormularioEncomenda } from "./pages/Encomenda";
import Entrar from "./pages/Entrar";
import { Favoritos } from "./pages/Favoritos";
import { Inicio } from "./pages/Inicio";
import { Notificacoes } from "./pages/Notificacoes";
import { Usuario } from "./pages/Usuario";
import { Carrinho } from "./pages/Carrinho";

export default function Rotas() {
  return (
    <ItensPedidoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >

            <Route path="/" element={<Inicio />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<Usuario />} />

            <Route path="/produto/:id" element={<DetalhesProduto />} />
            <Route path="/encomenda" element={<FormularioEncomenda />}></Route>

            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/notificacoes" element={<Notificacoes />} />

          </Route>
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </ItensPedidoProvider>
  )
}