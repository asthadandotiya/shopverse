import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { BADGE_CONFIG, CATEGORIES } from '../data/products.js'
import StarRating from './StarRating.jsx'

export default function ProductModal() {
  const { modal, activeProduct, closeModal, addToCart, toggleWishlist, wishlist, openEdit } = useApp()
  const [qty, setQty]           = useState(1)
  const [imgError, setImgError] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)
  const [addAnim, setAddAnim]   = useState(false)

  if (modal !== 'view' || !activeProduct) return null

  const p       = activeProduct
  const badge   = BADGE_CONFIG[p.badge]
  const cat     = CATEGORIES.find(c => c.id === p.category)
  const discPct = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null
  const isWished = wishlist.includes(p.id)

  const handleAdd = () => {
    if (p.stock === 0) return
    addToCart(p, qty)
    setAddAnim(true)
    setTimeout(() => { setAddAnim(false); closeModal() }, 900)
  }

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:500,
      background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:20, animation:'fadeIn 0.2s ease',
    }} onClick={e => e.target === e.currentTarget && closeModal()}>

      <div style={{
        background:'#fff', borderRadius:24, width:'100%', maxWidth:860,
        maxHeight:'88vh', overflowY:'auto',
        animation:'scaleIn 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        boxShadow:'0 32px 96px rgba(0,0,0,0.25)',
        display:'grid', gridTemplateColumns:'1fr 1fr',
      }}>

        {/* ── Image panel ── */}
        <div style={{ position:'relative', overflow:'hidden', borderRadius:'24px 0 0 24px', minHeight:400, background:'#F8F9FF' }}>
          {!imgError ? (
            <img src={p.image} alt={p.name} onError={() => setImgError(true)}
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          ) : (
            <div style={{ width:'100%', height:'100%', minHeight:400, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, background: `linear-gradient(135deg,${cat?.color}15,${cat?.color}30)` }}>
              {cat?.emoji}
            </div>
          )}

          {/* Overlay badges */}
          <div style={{ position:'absolute', top:14, left:14, display:'flex', flexDirection:'column', gap:6 }}>
            {badge && <span style={{ background:badge.bg, color:badge.text, border:`1px solid ${badge.border}`, padding:'5px 12px', borderRadius:8, fontSize:11, fontWeight:800 }}>{p.badge}</span>}
            {discPct && <span style={{ background:'#EF4444', color:'#fff', padding:'5px 10px', borderRadius:8, fontSize:11, fontWeight:800 }}>−{discPct}% OFF</span>}
          </div>

          <button onClick={() => toggleWishlist(p.id)} style={{
            position:'absolute', top:14, right:14, width:40, height:40, borderRadius:'50%',
            background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', fontSize:20,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 2px 12px rgba(0,0,0,0.12)',
            animation: isWished ? 'heartBeat 0.7s ease' : 'none',
          }}>
            {isWished ? '❤️' : '🤍'}
          </button>
        </div>

        {/* ── Info panel ── */}
        <div style={{ padding:'28px', overflowY:'auto', display:'flex', flexDirection:'column', gap:16 }}>

          {/* Close */}
          <button onClick={closeModal} style={{
            alignSelf:'flex-end', width:34, height:34, borderRadius:10,
            background:'#F3F4F6', border:'none', cursor:'pointer', fontSize:18,
            display:'flex', alignItems:'center', justifyContent:'center', color:'#6B7280',
            flexShrink:0,
          }}>✕</button>

          {/* Category */}
          <span style={{ fontSize:11, fontWeight:800, color: cat?.color, textTransform:'uppercase', letterSpacing:1.2 }}>
            {cat?.emoji} {cat?.label}
          </span>

          {/* Name */}
          <h2 style={{ fontSize:26, fontWeight:900, color:'#111827', lineHeight:1.2, margin:0 }}>{p.name}</h2>

          {/* Rating */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <StarRating rating={p.rating} size={16} />
            <span style={{ fontSize:13, color:'#6B7280' }}>{p.reviews.toLocaleString()} reviews</span>
            <span style={{ fontSize:13, color: p.stock < 10 ? '#EF4444' : '#10B981', fontWeight:700 }}>
              {p.stock === 0 ? '⊗ Out of stock' : p.stock <= 10 ? `⚠ ${p.stock} left` : `✓ In stock`}
            </span>
          </div>

          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
            <span style={{ fontSize:32, fontWeight:900, color:'#111827' }}>${p.price.toLocaleString()}</span>
            {p.originalPrice && (
              <span style={{ fontSize:16, color:'#9CA3AF', textDecoration:'line-through' }}>${p.originalPrice.toLocaleString()}</span>
            )}
            {discPct && <span style={{ fontSize:13, fontWeight:700, color:'#EF4444' }}>Save {discPct}%</span>}
          </div>

          {/* Description */}
          <p style={{ fontSize:14, color:'#4B5563', lineHeight:1.7, margin:0 }}>{p.description}</p>

          {/* Colors */}
          {p.colors?.length > 0 && (
            <div>
              <p style={{ fontSize:12, fontWeight:700, color:'#374151', marginBottom:8, textTransform:'uppercase', letterSpacing:0.8 }}>Color</p>
              <div style={{ display:'flex', gap:8 }}>
                {p.colors.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)} style={{
                    width:26, height:26, borderRadius:'50%', background:c,
                    border:`3px solid ${selectedColor===i ? '#6366F1' : '#fff'}`,
                    boxShadow:`0 0 0 ${selectedColor===i ? '2px' : '1px'} ${selectedColor===i ? '#6366F1' : '#E5E7EB'}`,
                    cursor:'pointer', transition:'all .2s',
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {p.specs && Object.keys(p.specs).length > 0 && (
            <div style={{ background:'#F8F9FF', borderRadius:12, padding:'14px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 16px' }}>
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize:10, fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:0.8 }}>{k}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#374151', marginTop:2 }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {/* Qty + Cart */}
          <div style={{ display:'flex', gap:10, alignItems:'center', marginTop:'auto' }}>
            <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #E5E7EB', borderRadius:11, overflow:'hidden' }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width:38, height:44, background:'#F9FAFB', border:'none', cursor:'pointer', fontSize:18, fontWeight:700, color:'#374151' }}>−</button>
              <span style={{ width:40, textAlign:'center', fontWeight:800, fontSize:16 }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(p.stock, q+1))} style={{ width:38, height:44, background:'#F9FAFB', border:'none', cursor:'pointer', fontSize:18, fontWeight:700, color:'#374151' }}>＋</button>
            </div>
            <button onClick={handleAdd} disabled={p.stock===0} style={{
              flex:1, padding:'13px 0', borderRadius:12, border:'none',
              background: p.stock===0 ? '#F3F4F6' : addAnim ? '#10B981' : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              color: p.stock===0 ? '#9CA3AF' : '#fff',
              fontWeight:800, fontSize:15, cursor: p.stock===0 ? 'not-allowed' : 'pointer',
              transform: addAnim ? 'scale(1.02)' : 'scale(1)',
              transition:'all 0.25s', boxShadow: p.stock>0 && !addAnim ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
            }}>
              {p.stock===0 ? 'Out of Stock' : addAnim ? '✓ Added to Cart!' : `Add to Cart — $${(p.price*qty).toLocaleString()}`}
            </button>
          </div>

          {/* Edit btn */}
          <button onClick={() => { closeModal(); openEdit(p) }} style={{
            padding:'10px', borderRadius:11, border:'1.5px solid #E5E7EB',
            background:'#fff', fontWeight:600, fontSize:13, cursor:'pointer', color:'#374151',
            transition:'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#6366F1'; e.currentTarget.style.color='#6366F1' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='#E5E7EB'; e.currentTarget.style.color='#374151' }}
          >
            ✎ Edit Product
          </button>
        </div>
      </div>
    </div>
  )
}
