import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './features/Home/Home'
import Order from './pages/Order/Order'
import Profile from './pages/Profile/Profile'
import OrderDetail from './pages/OrderDetail/OrderDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedidos" element={<Order />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/pedidos/:id" element={<OrderDetail />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


