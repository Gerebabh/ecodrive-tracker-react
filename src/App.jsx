import { Route, Routes } from 'react-router'
import Cadastro from '../pages/Cadastro'
import Combustivel from '../pages/Combustivel'
import Comparador from '../pages/Comparador'
import Erro404 from '../pages/Erro404'
import Home from '../pages/Home'
import Veiculos from '../pages/Veiculos'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/veiculos" element={<Veiculos />} />
      <Route path="/combustivel" element={<Combustivel />} />
      <Route path="/comparador" element={<Comparador />} />
      <Route path="*" element={<Erro404 />} />
    </Routes>
  )
}

export default App
