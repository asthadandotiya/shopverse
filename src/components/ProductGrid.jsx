import { useApp } from '../context/AppContext.jsx'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid() {
  const { filtered, setSearch, setCategory } = useApp()

  if (filtered.length === 0) {
    return (
      <div style={{
        textAlign:'center', padding:'100px 20px',
        animation:'fadeIn 0.4s ease',
      }}>
        <div style={{ fontSize:64, marginBottom:16, animation:'float 3s ease-in-out infinite' }}>🔍</div>
        <h3 style={{ fontSize:24, fontWeight:800, color:'#374151', marginBottom:10 }}>No products found</h3>
        <p style={{ fontSize:15, color:'#9CA3AF', marginBottom:24 }}>
          Try a different search term or category.
        </p>
        <button onClick={() => { setSearch(''); setCategory('all') }} style={{
          padding:'12px 28px', borderRadius:12, border:'none',
          background:'linear-gradient(135deg,#6366F1,#8B5CF6)',
          color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer',
        }}>
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <div style={{
      display:'grid',
      gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',
      gap:22,
    }}>
      {filtered.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}
