import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Container from './components/container/Container'

function App() {

  return (
    <>
    <Container>
      <Routes>
        <Route path='/' element={<Index />} />
      </Routes>
    </Container>
    </>
  )
}

export default App
