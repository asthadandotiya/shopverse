import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Header() {
  const { search, setSearch, cartCount, setCartOpen, openAdd } = useApp()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 300,
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(248,249,255,0.8)',
      backdropFilter: 'blur(24px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(99,102,241,0.15)' : 'transparent'}`,
      boxShadow: scrolled ? '0 4px 32px rgba(99,102,241,0.08)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        maxWidth: 1380, margin: '0 auto', padding: '0 24px',
        height: 70, display: 'flex', alignItems: 'center', gap: 20,
      }}>

        {/* ── Logo ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 13,
            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            animation: 'float 4s ease-in-out infinite',
          }}>🛍️</div>
          <div>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>ShopVerse</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#9CA3AF', marginTop: -3 }}>PREMIUM STORE</div>
          </div>
        </div>

        {/* ── Search ── */}
        <div style={{ flex: 1, maxWidth: 540, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, pointerEvents: 'none' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products, brands, categories…"
            style={{
              width: '100%', padding: '11px 40px 11px 42px',
              borderRadius: 14, border: '1.5px solid #E5E7EB',
              fontSize: 14, fontFamily: 'inherit', background: '#F8F9FF',
              outline: 'none', transition: 'all 0.25s',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#6366F1'
              e.target.style.background = '#fff'
              e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'
            }}
            onBlur={e => {
              e.target.style.borderColor = '#E5E7EB'
              e.target.style.background = '#F8F9FF'
              e.target.style.boxShadow = 'none'
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              width: 22, height: 22, borderRadius: '50%', background: '#E5E7EB',
              border: 'none', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          )}
        </div>

        {/* ── Right actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto', flexShrink: 0 }}>
          <HeaderBtn emoji="♡" label="Wishlist" />
          <HeaderBtn emoji="◎" label="Account" />

          <button onClick={openAdd} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 13, border: 'none',
            background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
            color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)' }}
          >
            ＋ Add Product
          </button>

          <button onClick={() => setCartOpen(true)} style={{
            position: 'relative', display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 13, border: '1.5px solid #E5E7EB',
            background: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366F1'; e.currentTarget.style.background = '#F8F9FF' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#fff' }}
          >
            <span style={{ fontSize: 17 }}>🛒</span>
            <span style={{ color: '#374151' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8,
                background: 'linear-gradient(135deg,#EF4444,#DC2626)',
                color: '#fff', minWidth: 22, height: 22, borderRadius: 11,
                fontSize: 11, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px',
                border: '2px solid #fff', animation: 'cartBounce .4s ease',
              }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function HeaderBtn({ emoji, label }) {
  return (
    <button title={label} style={{
      width: 42, height: 42, borderRadius: 11, border: '1.5px solid #E5E7EB',
      background: '#fff', cursor: 'pointer', fontSize: 17, display: 'flex',
      alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366F1'; e.currentTarget.style.background = '#F8F9FF'; e.currentTarget.style.transform = 'translateY(-1px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)' }}
    >{emoji}</button>
  )
}
