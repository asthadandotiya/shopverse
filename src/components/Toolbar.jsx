import { useApp } from '../context/AppContext.jsx'

const SORTS = [
  { v:'default',    l:'Featured' },
  { v:'price-asc',  l:'Price: Low → High' },
  { v:'price-desc', l:'Price: High → Low' },
  { v:'rating',     l:'Top Rated' },
  { v:'reviews',    l:'Most Reviewed' },
  { v:'name',       l:'Name A–Z' },
  { v:'sale',       l:'On Sale First' },
]

export default function Toolbar() {
  const { filtered, sort, setSort, search, category, setSearch, setCategory } = useApp()
  const hasFilters = search || category !== 'all'

  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <p style={{ fontSize:14, color:'#6B7280', fontWeight:500 }}>
          <strong style={{ color:'#111', fontWeight:800 }}>{filtered.length}</strong> products found
          {search && <> for <strong style={{ color:'#6366F1' }}>"{search}"</strong></>}
        </p>
        {hasFilters && (
          <button onClick={() => { setSearch(''); setCategory('all') }} style={{
            padding:'5px 12px', borderRadius:8, border:'1.5px solid #E5E7EB',
            background:'#fff', fontSize:12, cursor:'pointer', color:'#EF4444', fontWeight:700,
            display:'flex', alignItems:'center', gap:4, transition:'all .2s',
          }}>✕ Clear filters</button>
        )}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:13, color:'#9CA3AF', fontWeight:500 }}>Sort by:</span>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          padding:'8px 14px', borderRadius:10, border:'1.5px solid #E5E7EB',
          fontSize:13, fontFamily:'inherit', background:'#fff', cursor:'pointer',
          outline:'none', fontWeight:600, color:'#374151',
          transition:'border-color .2s',
        }}
        onFocus={e => e.target.style.borderColor = '#6366F1'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        >
          {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
      </div>
    </div>
  )
}
