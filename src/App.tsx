import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './features/Home/Home'
import Order from './pages/Order/Order'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedidos" element={<Order />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


