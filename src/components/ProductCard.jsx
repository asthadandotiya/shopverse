import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { BADGE_CONFIG, CATEGORIES } from '../data/products.js'
import StarRating from './StarRating.jsx'

export default function ProductCard({ product, index }) {
  const { addToCart, toggleWishlist, wishlist, openView, openEdit, deleteProduct } = useApp()
  const [hovered, setHovered]     = useState(false)
  const [imgError, setImgError]   = useState(false)
  const [addAnim, setAddAnim]      = useState(false)
  const [wishAnim, setWishAnim]    = useState(false)

  const isWished  = wishlist.includes(product.id)
  const badge     = BADGE_CONFIG[product.badge]
  const discount  = product.originalPrice
    ? Math.round((1 - product.originalPrice / product.originalPrice) * 100)
    : null
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null
  const cat = CATEGORIES.find(c => c.id === product.category)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (product.stock === 0) return
    addToCart(product)
    setAddAnim(true)
    setTimeout(() => setAddAnim(false), 600)
  }

  const handleWish = (e) => {
    e.stopPropagation()
    toggleWishlist(product.id)
    setWishAnim(true)
    setTimeout(() => setWishAnim(false), 700)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: `1.5px solid ${hovered ? '#C7D2FE' : '#F3F4F6'}`,
        boxShadow: hovered
          ? '0 16px 56px rgba(99,102,241,0.14), 0 4px 16px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        animation: `fadeUp 0.5s ease ${Math.min(index, 8) * 0.06}s both`,
      }}
      onClick={() => openView(product)}
    >
      {/* ── Image section ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${cat?.color || '#6366F1'}15, ${cat?.color || '#6366F1'}30)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72,
          }}>
            {cat?.emoji || '📦'}
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }} />

        {/* Badge */}
        {badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: badge.bg, color: badge.text, border: `1px solid ${badge.border}`,
            padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 800,
            letterSpacing: 0.5, backdropFilter: 'blur(4px)',
            animation: 'numberPop 0.4s ease',
          }}>
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {discountPct && (
          <div style={{
            position: 'absolute', top: badge ? 44 : 12, left: 12,
            background: '#EF4444', color: '#fff',
            padding: '4px 8px', borderRadius: 8, fontSize: 10, fontWeight: 800,
          }}>
            -{discountPct}%
          </div>
        )}

        {/* Stock warning */}
        {product.stock > 0 && product.stock <= 5 && (
          <div style={{
            position: 'absolute', bottom: 10, left: 12,
            background: 'rgba(254,243,199,0.95)', color: '#92400E',
            padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 800,
            backdropFilter: 'blur(4px)',
          }}>
            Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>SOLD OUT</span>
          </div>
        )}

        {/* Wishlist btn */}
        <button onClick={handleWish} style={{
          position: 'absolute', top: 10, right: 10,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          border: 'none', cursor: 'pointer', fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered || isWished ? 1 : 0,
          transition: 'all 0.25s',
          transform: wishAnim ? 'scale(1.4)' : 'scale(1)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
        }}>
          {isWished ? '❤️' : '🤍'}
        </button>

        {/* Quick action overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', gap: 6, padding: '12px',
          opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.25s',
        }}>
          <button onClick={e => { e.stopPropagation(); openEdit(product) }} style={{
            flex: 1, padding: '8px', borderRadius: 10,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
            border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', color: '#374151',
          }}>✎ Edit</button>
          <button onClick={e => { e.stopPropagation(); deleteProduct(product.id, product.name) }} style={{
            flex: 1, padding: '8px', borderRadius: 10,
            background: 'rgba(254,226,226,0.92)', backdropFilter: 'blur(8px)',
            border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer', color: '#DC2626',
          }}>⊗ Delete</button>
        </div>
      </div>

      {/* ── Info section ── */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Category pill */}
        <div style={{ marginBottom: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, color: cat?.color || '#6366F1',
            textTransform: 'uppercase', letterSpacing: 1.2,
          }}>
            {cat?.emoji} {cat?.label}
          </span>
        </div>

        <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 800, color: '#111827', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize:11, color:'#9CA3AF' }}>({product.reviews.toLocaleString()})</span>
        </div>

        <p style={{ fontSize:12, color:'#6B7280', lineHeight:1.55, flex:1, margin:'0 0 14px' }}>
          {product.description.slice(0, 78)}…
        </p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div style={{ display:'flex', gap:5, marginBottom:12, alignItems:'center' }}>
            {product.colors.slice(0,5).map((c, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: '50%', background: c,
                border: '2px solid #fff', boxShadow: '0 0 0 1px #E5E7EB',
                flexShrink: 0,
              }} />
            ))}
            {product.colors.length > 5 && <span style={{ fontSize:10, color:'#9CA3AF' }}>+{product.colors.length-5}</span>}
          </div>
        )}

        {/* Price + Cart */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:900, color:'#111827', lineHeight:1 }}>
              ${product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div style={{ fontSize:12, color:'#9CA3AF', textDecoration:'line-through', marginTop:2 }}>
                ${product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              padding: '10px 16px', borderRadius: 12, border: 'none',
              background: product.stock === 0
                ? '#F3F4F6'
                : addAnim
                  ? '#10B981'
                  : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              color: product.stock === 0 ? '#9CA3AF' : '#fff',
              fontWeight: 800, fontSize: 13, cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.25s',
              transform: addAnim ? 'scale(1.08)' : 'scale(1)',
              boxShadow: addAnim ? '0 4px 14px rgba(16,185,129,0.4)' : product.stock > 0 ? '0 3px 10px rgba(99,102,241,0.3)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {product.stock === 0 ? 'Sold Out' : addAnim ? '✓ Added!' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
