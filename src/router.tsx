import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Inicio } from "./pages/Inicio";
import { Produtos } from "./pages/Produtos";
import { Favoritos } from "./pages/Favoritos";
import { Perfil } from "./pages/Perfil";
import { DetalheProduto } from "./pages/DetalheProduto";
import { Carrinho } from "./pages/Carrinho";
import { Notificacoes } from "./pages/Notificacoes";
import { ItensPedidoProvider } from "./contexts/ItensCarrinhoContext";
import Entrar from "./pages/Entrar";
import Cadastro from "./pages/Cadastro";

export default function Rotas() {
  return (
    <ItensPedidoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >

            <Route path="/" element={<Inicio />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<Perfil />} />

            <Route path="/produto/:id" element={<DetalheProduto />} />

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