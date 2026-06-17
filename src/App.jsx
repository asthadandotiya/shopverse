import { AppProvider } from './context/AppContext.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import CategoryBar from './components/CategoryBar.jsx'
import Toolbar from './components/Toolbar.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductModal from './components/ProductModal.jsx'
import ProductForm from './components/ProductForm.jsx'
import ToastStack from './components/ToastStack.jsx'
import Footer from './components/Footer.jsx'

function ShopApp() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Hero />
      <main style={{ flex: 1, maxWidth: 1380, width: '100%', margin: '0 auto', padding: '32px 24px 64px' }}>
        <CategoryBar />
        <Toolbar />
        <ProductGrid />
      </main>
      <Footer />
      <CartDrawer />
      <ProductModal />
      <ProductForm />
      <ToastStack />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <ShopApp />
    </AppProvider>
  )
}
