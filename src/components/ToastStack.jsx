import { useApp } from '../context/AppContext.jsx'

const COLORS = {
  success: { bg:'#111827', border:'rgba(16,185,129,0.4)', icon:'#10B981' },
  error:   { bg:'#111827', border:'rgba(239,68,68,0.4)',  icon:'#EF4444' },
  info:    { bg:'#111827', border:'rgba(99,102,241,0.4)', icon:'#6366F1' },
}

export default function ToastStack() {
  const { toasts } = useApp()

  return (
    <div style={{
      position:'fixed', bottom:28, right:24, zIndex:9999,
      display:'flex', flexDirection:'column', gap:8, pointerEvents:'none',
    }}>
      {toasts.map(t => {
        const c = COLORS[t.type] || COLORS.info
        return (
          <div key={t.id} style={{
            display:'flex', alignItems:'center', gap:12,
            background: c.bg, color:'#fff',
            padding:'13px 18px', borderRadius:14,
            border:`1px solid ${c.border}`,
            boxShadow:'0 8px 32px rgba(0,0,0,0.25)',
            fontSize:14, fontWeight:600,
            animation:'toastSlide 0.3s cubic-bezier(0.34,1.2,0.64,1)',
            maxWidth:340, pointerEvents:'all',
            backdropFilter:'blur(20px)',
          }}>
            <span style={{ fontSize:18, color: c.icon, flexShrink:0 }}>{t.icon}</span>
            <span style={{ lineHeight:1.4 }}>{t.message}</span>
          </div>
        )
      })}
    </div>
  )
}
