import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, cartTotal, cartSavings, removeFromCart, updateCartQty, clearCart, checkout } = useApp()

  if (!cartOpen) return null

  const shipping   = cartTotal >= 50 ? 0 : 5.99
  const tax        = cartTotal * 0.08
  const orderTotal = cartTotal + shipping + tax

  return (
    <div style={{ position:'fixed', inset:0, zIndex:400 }}>
      <div onClick={() => setCartOpen(false)} style={{
        position:'absolute', inset:0, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(6px)',
        animation:'fadeIn 0.2s ease',
      }} />
      <div style={{
        position:'absolute', right:0, top:0, bottom:0, width:420, maxWidth:'95vw',
        background:'#fff', display:'flex', flexDirection:'column',
        animation:'slideRight 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        boxShadow:'-16px 0 64px rgba(0,0,0,0.14)',
      }}>
        {/* Header */}
        <div style={{
          padding:'22px 24px', borderBottom:'1px solid #F3F4F6',
          background:'linear-gradient(135deg,#EEF2FF,#F5F3FF)',
          display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0,
        }}>
          <div>
            <h2 style={{ margin:0, fontSize:20, fontWeight:900, display:'flex', alignItems:'center', gap:10 }}>
              🛒 Your Cart
              {cartItems.length > 0 && (
                <span style={{ background:'linear-gradient(135deg,#6366F1,#8B5CF6)', color:'#fff', minWidth:24, height:24, borderRadius:12, fontSize:12, fontWeight:800, display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'0 6px' }}>
                  {cartItems.reduce((s,i)=>s+i.qty,0)}
                </span>
              )}
            </h2>
            {cartSavings > 0 && <p style={{ margin:'4px 0 0', fontSize:12, color:'#10B981', fontWeight:700 }}>You're saving ${cartSavings.toFixed(2)}! 🎉</p>}
          </div>
          <button onClick={() => setCartOpen(false)} style={{ width:34, height:34, borderRadius:10, background:'rgba(255,255,255,0.8)', border:'1.5px solid #E5E7EB', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', color:'#6B7280' }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', animation:'fadeIn 0.3s ease' }}>
              <div style={{ fontSize:56, marginBottom:16, animation:'float 3s ease-in-out infinite' }}>🛒</div>
              <h3 style={{ fontWeight:800, color:'#374151', marginBottom:8, fontSize:18 }}>Your cart is empty</h3>
              <p style={{ fontSize:14, color:'#9CA3AF' }}>Add some products to get started!</p>
              <button onClick={() => setCartOpen(false)} style={{ marginTop:20, padding:'11px 24px', borderRadius:12, border:'none', background:'linear-gradient(135deg,#6366F1,#8B5CF6)', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer' }}>Continue Shopping</button>
            </div>
          ) : cartItems.map(item => (
            <CartItem key={item.id} item={item} onRemove={() => removeFromCart(item.id)} onQty={q => updateCartQty(item.id, q)} />
          ))}
        </div>

        {/* Free shipping bar */}
        {cartTotal < 50 && cartItems.length > 0 && (
          <div style={{ padding:'12px 24px', background:'#FFFBEB', borderTop:'1px solid #FEF3C7', flexShrink:0 }}>
            <p style={{ fontSize:12, fontWeight:700, color:'#92400E', marginBottom:6 }}>Add ${(50-cartTotal).toFixed(2)} more for FREE shipping! 🚚</p>
            <div style={{ height:6, background:'#FEF3C7', borderRadius:3, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${Math.min((cartTotal/50)*100,100)}%`, background:'linear-gradient(90deg,#F59E0B,#EF4444)', borderRadius:3, transition:'width 0.4s ease' }} />
            </div>
          </div>
        )}

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding:'20px 24px', borderTop:'1px solid #F3F4F6', flexShrink:0 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
              <Row label="Subtotal"                   value={`$${cartTotal.toFixed(2)}`} />
              <Row label={`Shipping${cartTotal>=50?' (Free!)':''}`} value={shipping===0?'✓ Free':`$${shipping.toFixed(2)}`} valueColor={shipping===0?'#10B981':undefined} />
              <Row label="Tax (8%)"                   value={`$${tax.toFixed(2)}`} />
              {cartSavings > 0 && <Row label="You save" value={`-$${cartSavings.toFixed(2)}`} valueColor="#10B981" />}
              <div style={{ borderTop:'1px solid #E5E7EB', paddingTop:10, marginTop:4 }}>
                <Row label="Total" value={`$${orderTotal.toFixed(2)}`} bold />
              </div>
            </div>
            <button onClick={checkout} style={{
              width:'100%', padding:'15px', borderRadius:13, border:'none',
              background:'linear-gradient(135deg,#6366F1,#8B5CF6)', color:'#fff',
              fontWeight:800, fontSize:16, cursor:'pointer',
              boxShadow:'0 6px 20px rgba(99,102,241,0.4)', marginBottom:8, transition:'all .25s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 10px 28px rgba(99,102,241,0.5)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 20px rgba(99,102,241,0.4)'}}
            >
              Checkout — ${orderTotal.toFixed(2)} →
            </button>
            <button onClick={clearCart} style={{ width:'100%', padding:'10px', borderRadius:11, border:'1.5px solid #F3F4F6', background:'#fff', fontSize:13, cursor:'pointer', color:'#9CA3AF', fontWeight:600 }}>Clear cart</button>
          </div>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, onRemove, onQty }) {
  const [imgErr, setImgErr] = useState(false)
  const isUrl = item.image?.startsWith?.('http')
  return (
    <div style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:'1px solid #F9FAFB', animation:'fadeUp 0.3s ease' }}>
      <div style={{ width:72, height:72, borderRadius:12, overflow:'hidden', flexShrink:0, background:'#F8F9FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {isUrl && !imgErr
          ? <img src={item.image} alt={item.name} onError={() => setImgErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          : <span style={{ fontSize:32 }}>{isUrl ? '📦' : item.image}</span>
        }
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ margin:'0 0 3px', fontWeight:700, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name}</p>
        <p style={{ margin:'0 0 8px', fontSize:12, color:'#9CA3AF' }}>Unit: ${item.price}</p>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #E5E7EB', borderRadius:8, overflow:'hidden' }}>
            <button onClick={() => onQty(item.qty-1)} style={{ width:28, height:28, background:'#F9FAFB', border:'none', cursor:'pointer', fontWeight:700, fontSize:14, color:'#374151' }}>−</button>
            <span style={{ width:32, textAlign:'center', fontWeight:800, fontSize:13 }}>{item.qty}</span>
            <button onClick={() => onQty(item.qty+1)} style={{ width:28, height:28, background:'#F9FAFB', border:'none', cursor:'pointer', fontWeight:700, fontSize:14, color:'#374151' }}>＋</button>
          </div>
          <button onClick={onRemove} style={{ background:'none', border:'none', color:'#EF4444', cursor:'pointer', fontSize:12, fontWeight:700 }}>Remove</button>
        </div>
      </div>
      <div style={{ textAlign:'right', flexShrink:0 }}>
        <p style={{ margin:0, fontWeight:900, fontSize:16 }}>${(item.price*item.qty).toFixed(2)}</p>
        {item.originalPrice && <p style={{ margin:'3px 0 0', fontSize:11, color:'#9CA3AF', textDecoration:'line-through' }}>${(item.originalPrice*item.qty).toFixed(2)}</p>}
      </div>
    </div>
  )
}

function Row({ label, value, bold, valueColor }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ fontSize:bold?15:13, fontWeight:bold?800:500, color:bold?'#111':'#6B7280' }}>{label}</span>
      <span style={{ fontSize:bold?17:13, fontWeight:bold?900:600, color:valueColor||(bold?'#111':'#374151') }}>{value}</span>
    </div>
  )
}
