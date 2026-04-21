import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import HygieneMissionPage from './pages/HygieneMissionPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/mission/hygiene" element={<HygieneMissionPage />} />
      </Routes>
    </BrowserRouter>
  )
}
