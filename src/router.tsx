import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inicio } from "./pages/Inicio";
import { Perfil } from "./pages/Perfil";
import { Carrinho } from "./pages/Carrinho";
import { Notificacoes } from "./pages/Notificacoes";
import { ItensPedidoProvider } from "./contexts/ItensCarrinhoContext";
import Entrar from "./pages/Entrar";
import Cadastro from "./pages/Cadastro";
import { Navbar } from "./components/Navbar";
import { FormularioEncomenda } from "./pages/Encomenda";
import { DetalhesProduto } from "./pages/DetalheProduto";
import { Favoritos } from "./pages/Favoritos";

export default function Rotas() {
  return (
    <ItensPedidoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >

            <Route path="/" element={<Inicio />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/perfil" element={<Perfil />} />

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