import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { PRODUCTS } from '../data/products.js'

const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

let _nextId = 200

export function AppProvider({ children }) {
  // ── Products ──
  const [products, setProducts] = useState(PRODUCTS)
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('all')
  const [sort,     setSort]     = useState('default')
  const [wishlist, setWishlist] = useState([])

  // ── Cart ──
  const [cartItems,    setCartItems]    = useState([])
  const [cartOpen,     setCartOpen]     = useState(false)

  // ── Modal ──
  const [modal,        setModal]        = useState(null) // null | 'add' | 'edit' | 'view'
  const [activeProduct,setActiveProduct]= useState(null)

  // ── Toast ──
  const [toasts, setToasts] = useState([])

  // ── Filtered products ──
  const filtered = useMemo(() => {
    return products
      .filter(p => category === 'all' || p.category === category)
      .filter(p => {
        const q = search.toLowerCase().trim()
        if (!q) return true
        return p.name.toLowerCase().includes(q) ||
               p.description.toLowerCase().includes(q) ||
               (p.tags || []).some(t => t.includes(q))
      })
      .sort((a, b) => {
        switch (sort) {
          case 'price-asc':  return a.price - b.price
          case 'price-desc': return b.price - a.price
          case 'rating':     return b.rating - a.rating
          case 'reviews':    return b.reviews - a.reviews
          case 'name':       return a.name.localeCompare(b.name)
          case 'sale':       return (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0)
          default:           return 0
        }
      })
  }, [products, category, search, sort])

  const categoryCounts = useMemo(() => {
    const counts = { all: products.length }
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return counts
  }, [products])

  // ── Toast ──
  const toast = useCallback((message, type = 'success', icon = '') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type, icon }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  // ── CRUD ──
  const addProduct = useCallback((data) => {
    const p = { ...data, id: _nextId++, reviews: 0, colors: data.colors || [], specs: data.specs || {}, tags: data.tags || [] }
    setProducts(prev => [p, ...prev])
    toast(`"${data.name}" added!`, 'success', '✦')
    return p
  }, [toast])

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => prev.map(x => x.id === id ? { ...x, ...data } : x))
    toast('Product updated!', 'success', '✎')
  }, [toast])

  const deleteProduct = useCallback((id, name) => {
    setProducts(prev => prev.filter(x => x.id !== id))
    setCartItems(prev => prev.filter(i => i.id !== id))
    toast(`"${name}" deleted`, 'error', '⊗')
  }, [toast])

  // ── Cart ──
  const addToCart = useCallback((product, qty = 1) => {
    if (product.stock === 0) { toast('Out of stock!', 'error', '⊗'); return }
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id)
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty }]
    })
    toast(`${product.name} added to cart`, 'success', '🛒')
  }, [toast])

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateCartQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [removeFromCart])

  const clearCart = useCallback(() => setCartItems([]), [])

  const checkout = useCallback(() => {
    clearCart()
    setCartOpen(false)
    toast('Order placed! Thank you 🎉', 'success', '✓')
  }, [clearCart, toast])

  // ── Wishlist ──
  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])

  const cartTotal   = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.qty, 0), [cartItems])
  const cartCount   = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems])
  const cartSavings = useMemo(() => cartItems.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0), [cartItems])

  // ── Modal helpers ──
  const openAdd  = () => { setActiveProduct(null); setModal('add') }
  const openEdit = (p) => { setActiveProduct(p);   setModal('edit') }
  const openView = (p) => { setActiveProduct(p);   setModal('view') }
  const closeModal = () => { setModal(null); setActiveProduct(null) }

  return (
    <AppCtx.Provider value={{
      products, filtered, categoryCounts,
      search, setSearch,
      category, setCategory,
      sort, setSort,
      wishlist, toggleWishlist,
      cartItems, cartOpen, setCartOpen, cartTotal, cartCount, cartSavings,
      addToCart, removeFromCart, updateCartQty, clearCart, checkout,
      addProduct, updateProduct, deleteProduct,
      modal, activeProduct, openAdd, openEdit, openView, closeModal,
      toasts,
    }}>
      {children}
    </AppCtx.Provider>
  )
}
