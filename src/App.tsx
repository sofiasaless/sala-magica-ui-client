import { NotificacaoProvider } from './providers/NotificacaoProvider'
import Rotas from './router'

function App() {

  return (
    <NotificacaoProvider>
      <Rotas />
    </NotificacaoProvider>
  )
}

export default App
