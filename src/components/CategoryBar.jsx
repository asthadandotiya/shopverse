import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES } from '../data/products.js'

export default function CategoryBar() {
  const { category, setCategory, categoryCounts } = useApp()

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display:'flex', gap:8, overflowX:'auto', padding:'2px 0 10px', scrollbarWidth:'none' }}>
        {CATEGORIES.map(cat => {
          const active = category === cat.id
          const count  = categoryCounts[cat.id] || 0
          return (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'10px 18px', borderRadius:50, whiteSpace:'nowrap',
              border:`2px solid ${active ? cat.color : '#E5E7EB'}`,
              background: active ? cat.gradient : '#fff',
              color: active ? '#fff' : '#374151',
              fontWeight:700, fontSize:13, cursor:'pointer',
              transition:'all .25s cubic-bezier(0.34,1.56,0.64,1)',
              transform: active ? 'scale(1.03)' : 'scale(1)',
              boxShadow: active ? `0 4px 16px ${cat.color}44` : 'none',
              flexShrink:0,
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'scale(1.02)' }}}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'scale(1)' }}}
            >
              <span style={{ fontSize:16 }}>{cat.emoji}</span>
              {cat.label}
              <span style={{
                background: active ? 'rgba(255,255,255,0.25)' : '#F3F4F6',
                color: active ? '#fff' : '#9CA3AF',
                borderRadius:20, padding:'1px 9px', fontSize:11, fontWeight:800,
              }}>{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
