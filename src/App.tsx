import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import HygieneMissionPage from './pages/HygieneMissionPage'
import SubscriptionBridgePage from './pages/SubscriptionBridgePage'
import TossBenefitsPage from './pages/TossBenefitsPage'
import SubscriptionFlowPage from './pages/SubscriptionFlowPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/mission/hygiene" element={<HygieneMissionPage />} />
        <Route path="/subscribe/bridge" element={<SubscriptionBridgePage />} />
        <Route path="/subscribe/flow/:stepId" element={<SubscriptionFlowPage />} />
        <Route path="/toss-benefits" element={<TossBenefitsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
