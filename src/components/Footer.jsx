import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES } from '../data/products.js'

export default function Footer() {
  const { products, setCategory } = useApp()

  return (
    <footer style={{ background:'#0F0F1A', color:'#9CA3AF', marginTop:'auto' }}>

      {/* Main grid */}
      <div style={{ maxWidth:1380, margin:'0 auto', padding:'56px 24px 40px', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40 }}>

        {/* Brand */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{ width:38, height:38, borderRadius:11, background:'linear-gradient(135deg,#6366F1,#8B5CF6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:19 }}>🛍️</div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:900, background:'linear-gradient(135deg,#6366F1,#8B5CF6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ShopVerse</div>
              <div style={{ fontSize:9, letterSpacing:2, color:'#4B5563', fontWeight:700 }}>PREMIUM STORE</div>
            </div>
          </div>
          <p style={{ fontSize:14, lineHeight:1.75, maxWidth:280, color:'#6B7280' }}>
            A fully functional, professional e-commerce experience built with React. Full CRUD operations, stunning UI, real product images, cart management, and smooth animations.
          </p>
          <div style={{ display:'flex', gap:10, marginTop:20 }}>
            {['🐦','💼','📷','▶️'].map(icon => (
              <button key={icon} style={{ width:36, height:36, borderRadius:9, background:'#1F2937', border:'1px solid #374151', cursor:'pointer', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='#374151';e.currentTarget.style.borderColor='#6366F1'}}
              onMouseLeave={e=>{e.currentTarget.style.background='#1F2937';e.currentTarget.style.borderColor='#374151'}}
              >{icon}</button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ color:'#fff', fontSize:14, fontWeight:800, marginBottom:16, letterSpacing:0.5 }}>Categories</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {CATEGORIES.filter(c=>c.id!=='all').map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)} style={{
                background:'none', border:'none', cursor:'pointer', color:'#6B7280',
                fontSize:14, textAlign:'left', padding:0, display:'flex', alignItems:'center', gap:7,
                transition:'color .2s', fontFamily:'inherit',
              }}
              onMouseEnter={e=>{e.currentTarget.style.color=c.color}}
              onMouseLeave={e=>{e.currentTarget.style.color='#6B7280'}}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 style={{ color:'#fff', fontSize:14, fontWeight:800, marginBottom:16, letterSpacing:0.5 }}>Features</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {['Full CRUD Operations','Real-time Search','Cart & Checkout','Wishlist','Sort & Filter','Product Detail View','Responsive Design','Toast Notifications'].map(f => (
              <div key={f} style={{ fontSize:13, color:'#6B7280', display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ color:'#6366F1', fontSize:10 }}>✦</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color:'#fff', fontSize:14, fontWeight:800, marginBottom:16, letterSpacing:0.5 }}>Stay Updated</h4>
          <p style={{ fontSize:13, color:'#6B7280', marginBottom:14, lineHeight:1.6 }}>Get deals and new arrivals straight to your inbox.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <input placeholder="your@email.com" style={{
              padding:'10px 14px', borderRadius:10, border:'1px solid #374151',
              background:'#1F2937', color:'#fff', fontSize:13, fontFamily:'inherit', outline:'none',
              transition:'border-color .2s',
            }}
            onFocus={e=>e.target.style.borderColor='#6366F1'}
            onBlur={e=>e.target.style.borderColor='#374151'}
            />
            <button style={{
              padding:'10px', borderRadius:10, border:'none',
              background:'linear-gradient(135deg,#6366F1,#8B5CF6)', color:'#fff',
              fontWeight:700, fontSize:13, cursor:'pointer',
            }}>Subscribe →</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:'1px solid #1F2937', padding:'20px 24px' }}>
        <div style={{ maxWidth:1380, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:13 }}>© 2025 ShopVerse. Built with React + Vite · {products.length} products across 6 categories.</p>
          <div style={{ display:'flex', gap:16 }}>
            {['Privacy','Terms','Cookies'].map(l => (
              <button key={l} style={{ background:'none', border:'none', color:'#6B7280', cursor:'pointer', fontSize:13, fontFamily:'inherit', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#6366F1'}
              onMouseLeave={e=>e.currentTarget.style.color='#6B7280'}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
