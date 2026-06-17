import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'

const SLIDES = [
  {
    headline: 'Premium Sound,\nUnleashed.',
    sub: 'Industry-leading headphones for audiophiles',
    emoji: '🎧', color: '#6366F1',
    bg: 'linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 60%,#C7D2FE 100%)',
    tag: 'Electronics', cta: 'Shop Audio',
  },
  {
    headline: 'Street Style,\nDefined.',
    sub: 'Iconic fashion pieces curated for your aesthetic',
    emoji: '👟', color: '#EC4899',
    bg: 'linear-gradient(135deg,#FDF2F8 0%,#FCE7F3 60%,#FBCFE8 100%)',
    tag: 'Fashion', cta: 'Shop Fashion',
  },
  {
    headline: 'Your Dream\nHome Awaits.',
    sub: 'Elevate every corner with curated living essentials',
    emoji: '🏠', color: '#10B981',
    bg: 'linear-gradient(135deg,#ECFDF5 0%,#D1FAE5 60%,#A7F3D0 100%)',
    tag: 'Home & Living', cta: 'Shop Home',
  },
  {
    headline: 'Perform at\nYour Peak.',
    sub: 'Pro-grade sports gear for every athlete',
    emoji: '🏋️', color: '#F59E0B',
    bg: 'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 60%,#FDE68A 100%)',
    tag: 'Sports', cta: 'Shop Sports',
  },
]

const STATS = [
  { num: '18+', label: 'Products' },
  { num: '6',   label: 'Categories' },
  { num: '4.8★', label: 'Avg Rating' },
  { num: '∞',   label: 'CRUD Ops' },
]

export default function Hero() {
  const { products, setCategory } = useApp()
  const [idx, setIdx]       = useState(0)
  const [visible, setVisible] = useState(false)
  const [prevIdx, setPrevIdx] = useState(null)

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setPrevIdx(idx)
      setIdx(i => (i + 1) % SLIDES.length)
    }, 4500)
    return () => clearInterval(t)
  }, [idx])

  const s = SLIDES[idx]

  const handleCta = () => {
    const cat = ['electronics','fashion','home','sports'][idx]
    setCategory(cat)
    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      background: s.bg,
      transition: 'background 1s ease',
      padding: '56px 24px 44px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background: s.color, opacity:.06, transition:'background 1s', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-80, left:-80, width:280, height:280, borderRadius:'50%', background: s.color, opacity:.04, transition:'background 1s', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'30%', left:'45%', width:180, height:180, borderRadius:'50%', background: s.color, opacity:.03, transition:'background 1s', pointerEvents:'none' }} />

      <div style={{ maxWidth:1380, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 240px', alignItems:'center', gap:48 }}>

        {/* Text content */}
        <div style={{ opacity: visible ? 1:0, transform: visible ? 'none':'translateY(28px)', transition:'all .7s ease' }}>

          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,0.75)', backdropFilter:'blur(12px)',
            borderRadius:20, padding:'6px 14px', marginBottom:20,
            border:`1px solid ${s.color}33`, transition:'border-color 1s',
          }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background: s.color, animation:'pulse 2s infinite', transition:'background 1s' }} />
            <span style={{ fontSize:11, fontWeight:800, color: s.color, letterSpacing:1.2, textTransform:'uppercase', transition:'color 1s' }}>
              {s.tag} — New Arrivals
            </span>
          </div>

          <h1 style={{
            fontFamily:"'Syne',sans-serif", fontSize:'clamp(36px,5vw,66px)',
            fontWeight:900, lineHeight:1.06, marginBottom:18, color:'#111827',
            whiteSpace:'pre-line',
          }}>
            {s.headline.split('\n')[0]}{'\n'}
            <span style={{ color: s.color, transition:'color 1s', display:'block' }}>{s.headline.split('\n')[1]}</span>
          </h1>

          <p style={{ fontSize:17, color:'#6B7280', marginBottom:32, maxWidth:480, lineHeight:1.75 }}>
            {s.sub} — {products.length}+ curated products crafted for your lifestyle.
          </p>

          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:40 }}>
            <button onClick={handleCta} style={{
              padding:'13px 28px', borderRadius:13, border:'none',
              background:`linear-gradient(135deg,${s.color},${s.color}bb)`,
              color:'#fff', fontWeight:700, fontSize:15, cursor:'pointer',
              boxShadow:`0 6px 22px ${s.color}44`, transition:'all .25s',
              display:'flex', alignItems:'center', gap:8,
            }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 10px 30px ${s.color}55` }}
            onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 6px 22px ${s.color}44` }}
            >
              {s.cta} →
            </button>
            <button style={{
              padding:'13px 22px', borderRadius:13, border:'1.5px solid rgba(0,0,0,0.1)',
              background:'rgba(255,255,255,0.75)', backdropFilter:'blur(10px)',
              fontWeight:600, fontSize:15, cursor:'pointer', color:'#374151',
            }}>
              ✨ View All Deals
            </button>
          </div>

          {/* Stats */}
          <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
            {STATS.map(({ num, label }) => (
              <div key={label} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:900, color: s.color, transition:'color 1s' }}>{num}</div>
                <div style={{ fontSize:11, color:'#9CA3AF', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Emoji orb */}
        <div style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap:24,
          opacity: visible ? 1:0, transition:'opacity .6s ease .2s',
        }}>
          <div style={{
            width:200, height:200, borderRadius:'50%',
            background:'rgba(255,255,255,0.6)', backdropFilter:'blur(20px)',
            border:`2px solid ${s.color}22`, transition:'border-color 1s',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:90, animation:'float 3.5s ease-in-out infinite',
            boxShadow:`0 20px 60px ${s.color}22`,
          }}>
            {s.emoji}
          </div>

          {/* Dots */}
          <div style={{ display:'flex', gap:8 }}>
            {SLIDES.map((sl, i) => (
              <button key={i} onClick={() => { setPrevIdx(idx); setIdx(i) }} style={{
                width: i===idx ? 28 : 8, height:8, borderRadius:4,
                background: i===idx ? s.color : '#D1D5DB',
                border:'none', cursor:'pointer',
                transition:'all .4s cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ maxWidth:1380, margin:'40px auto 0', display:'flex', gap:20, flexWrap:'wrap' }}>
        {['🚚 Free shipping over $50','🛡️ 2-year warranty','↩️ 30-day returns','⭐ 4.9 rated store'].map(t => (
          <div key={t} style={{
            display:'flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,0.65)', backdropFilter:'blur(10px)',
            borderRadius:10, padding:'8px 16px', border:'1px solid rgba(255,255,255,0.9)',
            fontSize:13, fontWeight:600, color:'#374151',
          }}>{t}</div>
        ))}
      </div>
    </section>
  )
}
