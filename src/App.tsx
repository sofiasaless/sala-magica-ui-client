import { ProdutosFavoritosProvider } from './contexts/ProdutosFavoritosContext'
import { NotificacaoProvider } from './providers/NotificacaoProvider'
import Rotas from './router'

function App() {

  return (
    <NotificacaoProvider>
      <ProdutosFavoritosProvider>
        <Rotas />
      </ProdutosFavoritosProvider>
    </NotificacaoProvider>
  )
}

export default App
