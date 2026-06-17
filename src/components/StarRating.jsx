export default function StarRating({ rating, size = 13 }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:2 }}>
      {[1,2,3,4,5].map(i => {
        const filled = i <= Math.floor(rating)
        const half   = !filled && (i - 0.5) <= rating
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`hg${i}${size}`} x1="0" x2="1">
                <stop offset="50%" stopColor="#F59E0B"/>
                <stop offset="50%" stopColor="#D1D5DB"/>
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={filled ? '#F59E0B' : half ? `url(#hg${i}${size})` : '#E5E7EB'}
              stroke={filled || half ? '#F59E0B' : '#D1D5DB'}
              strokeWidth="0.5"
            />
          </svg>
        )
      })}
      <span style={{ fontSize: size - 1, color:'#6B7280', fontWeight:600, marginLeft:3 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  )
}
