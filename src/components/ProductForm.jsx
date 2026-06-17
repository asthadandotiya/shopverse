import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORIES, BADGE_CONFIG } from '../data/products.js'

const FIELD = (label, content) => (
  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
    <label style={{ fontSize:11, fontWeight:800, color:'#374151', textTransform:'uppercase', letterSpacing:0.8 }}>{label}</label>
    {content}
  </div>
)

const INPUT_STYLE = {
  padding:'10px 14px', borderRadius:11, border:'1.5px solid #E5E7EB',
  fontSize:14, fontFamily:'inherit', background:'#FAFAFA', outline:'none',
  transition:'all 0.2s', width:'100%', boxSizing:'border-box',
}

const focusStyle = (e) => { e.target.style.borderColor='#6366F1'; e.target.style.background='#fff'; e.target.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)' }
const blurStyle  = (e) => { e.target.style.borderColor='#E5E7EB'; e.target.style.background='#FAFAFA'; e.target.style.boxShadow='none' }

const EMOJI_OPTIONS = ['📦','🎧','💻','📱','🖥️','⌨️','🖱️','📷','🎮','📺','🎵','👟','👗','👜','⌚','🧥','💍','🕶️','🏠','🕯️','🪴','🛋️','🍳','🧘','🏋️','🥤','🚴','⛹️','✨','💚','💄','🧴','📚','📖','🎨','✏️','🔬','🌿']

export default function ProductForm() {
  const { modal, activeProduct, closeModal, addProduct, updateProduct } = useApp()

  const isEdit = modal === 'edit'
  const open   = modal === 'add' || modal === 'edit'

  const blank = {
    name:'', category:'electronics', price:'', originalPrice:'',
    description:'', image: EMOJI_OPTIONS[0], badge:'', stock:10,
    rating:4.5, colors:[], tags:'',
  }
  const [form, setForm] = useState(blank)
  const [errors, setErrors] = useState({})
  const [saving, setSaving]  = useState(false)

  useEffect(() => {
    if (open) {
      setForm(isEdit && activeProduct ? {
        ...activeProduct,
        price: activeProduct.price,
        originalPrice: activeProduct.originalPrice || '',
        tags: (activeProduct.tags || []).join(', '),
        image: activeProduct.image || EMOJI_OPTIONS[0],
      } : blank)
      setErrors({})
    }
  }, [open, activeProduct?.id])

  if (!open) return null

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))
  const setVal = (k) => (e) => set(k)(e.target.value)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.price || isNaN(form.price) || +form.price < 0) e.price = 'Valid price required'
    if (!form.description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 400))
    const data = {
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock) || 0,
      rating: parseFloat(form.rating) || 4.5,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }
    if (isEdit) updateProduct(activeProduct.id, data)
    else addProduct(data)
    setSaving(false)
    closeModal()
  }

  const cat = CATEGORIES.find(c => c.id === form.category)

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:500,
      background:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:20, animation:'fadeIn 0.2s ease',
    }} onClick={e => e.target === e.currentTarget && closeModal()}>

      <div style={{
        background:'#fff', borderRadius:24, width:'100%', maxWidth:620,
        maxHeight:'90vh', overflowY:'auto',
        animation:'scaleIn 0.25s cubic-bezier(0.34,1.2,0.64,1)',
        boxShadow:'0 32px 96px rgba(0,0,0,0.22)',
      }}>

        {/* Header */}
        <div style={{
          padding:'24px 28px', borderBottom:'1px solid #F3F4F6',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          background: `linear-gradient(135deg, ${cat?.color || '#6366F1'}10, transparent)`,
          borderRadius:'24px 24px 0 0',
          position:'sticky', top:0, zIndex:10, backdropFilter:'blur(20px)',
        }}>
          <div>
            <h2 style={{ margin:0, fontSize:20, fontWeight:900, color:'#111' }}>
              {isEdit ? '✎ Edit Product' : '＋ Add New Product'}
            </h2>
            <p style={{ margin:'4px 0 0', fontSize:13, color:'#9CA3AF' }}>
              {isEdit ? 'Update product information' : 'Fill in the details to list your product'}
            </p>
          </div>
          <button onClick={closeModal} style={{
            width:34, height:34, borderRadius:10, background:'#F3F4F6',
            border:'none', cursor:'pointer', fontSize:18, display:'flex',
            alignItems:'center', justifyContent:'center', color:'#6B7280',
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding:'28px', display:'flex', flexDirection:'column', gap:20 }}>

          {/* Name */}
          {FIELD('Product Name *',
            <div>
              <input value={form.name} onChange={setVal('name')} placeholder="e.g. Sony WH-1000XM5"
                style={{ ...INPUT_STYLE, borderColor: errors.name ? '#EF4444' : undefined }}
                onFocus={focusStyle} onBlur={blurStyle} />
              {errors.name && <p style={{ margin:'4px 0 0', fontSize:11, color:'#EF4444' }}>{errors.name}</p>}
            </div>
          )}

          {/* Category + Badge */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {FIELD('Category',
              <select value={form.category} onChange={setVal('category')}
                style={{ ...INPUT_STYLE }} onFocus={focusStyle} onBlur={blurStyle}>
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                ))}
              </select>
            )}
            {FIELD('Badge',
              <select value={form.badge} onChange={setVal('badge')}
                style={{ ...INPUT_STYLE }} onFocus={focusStyle} onBlur={blurStyle}>
                <option value="">No badge</option>
                {Object.keys(BADGE_CONFIG).map(b => <option key={b}>{b}</option>)}
              </select>
            )}
          </div>

          {/* Price + Original Price */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {FIELD('Price (USD) *',
              <div>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', fontWeight:700 }}>$</span>
                  <input type="number" value={form.price} onChange={setVal('price')} placeholder="0.00" min="0" step="0.01"
                    style={{ ...INPUT_STYLE, paddingLeft:26, borderColor: errors.price ? '#EF4444' : undefined }}
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                {errors.price && <p style={{ margin:'4px 0 0', fontSize:11, color:'#EF4444' }}>{errors.price}</p>}
              </div>
            )}
            {FIELD('Original Price (optional)',
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', fontWeight:700 }}>$</span>
                <input type="number" value={form.originalPrice} onChange={setVal('originalPrice')} placeholder="For discount display"
                  style={{ ...INPUT_STYLE, paddingLeft:26 }} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            )}
          </div>

          {/* Rating + Stock */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {FIELD('Rating (0–5)',
              <input type="number" value={form.rating} min="0" max="5" step="0.1"
                onChange={e => set('rating')(Math.min(5, Math.max(0, parseFloat(e.target.value)||0)))}
                style={{ ...INPUT_STYLE }} onFocus={focusStyle} onBlur={blurStyle} />
            )}
            {FIELD('Stock Quantity',
              <input type="number" value={form.stock} min="0"
                onChange={setVal('stock')} placeholder="0"
                style={{ ...INPUT_STYLE }} onFocus={focusStyle} onBlur={blurStyle} />
            )}
          </div>

          {/* Emoji / Image */}
          {FIELD('Product Icon',
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {EMOJI_OPTIONS.map(em => (
                <button key={em} onClick={() => set('image')(em)} type="button" style={{
                  fontSize:20, padding:'6px 8px', borderRadius:9,
                  border:`2px solid ${form.image===em ? '#6366F1' : '#E5E7EB'}`,
                  background: form.image===em ? '#EEF2FF' : '#fff',
                  cursor:'pointer', transition:'all .15s',
                  transform: form.image===em ? 'scale(1.12)' : 'scale(1)',
                }}>
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* Image URL override */}
          {FIELD('Image URL (optional — overrides icon)',
            <input value={typeof form.image === 'string' && form.image.startsWith('http') ? form.image : ''}
              onChange={e => set('image')(e.target.value || EMOJI_OPTIONS[0])}
              placeholder="https://images.unsplash.com/…"
              style={{ ...INPUT_STYLE }} onFocus={focusStyle} onBlur={blurStyle} />
          )}

          {/* Description */}
          {FIELD('Description *',
            <div>
              <textarea value={form.description} onChange={setVal('description')}
                placeholder="Describe the product — key features, materials, use cases…"
                style={{ ...INPUT_STYLE, minHeight:90, resize:'vertical', lineHeight:1.6 }}
                onFocus={focusStyle} onBlur={blurStyle} />
              {errors.description && <p style={{ margin:'4px 0 0', fontSize:11, color:'#EF4444' }}>{errors.description}</p>}
            </div>
          )}

          {/* Tags */}
          {FIELD('Tags (comma-separated)',
            <input value={form.tags} onChange={setVal('tags')}
              placeholder="wireless, premium, noise-cancel"
              style={{ ...INPUT_STYLE }} onFocus={focusStyle} onBlur={blurStyle} />
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding:'0 28px 28px', display:'flex', gap:10,
          position:'sticky', bottom:0, background:'#fff',
          borderTop:'1px solid #F3F4F6', paddingTop:20, marginTop:4,
        }}>
          <button onClick={closeModal} style={{
            flex:1, padding:'13px', borderRadius:12, border:'1.5px solid #E5E7EB',
            background:'#fff', fontWeight:700, fontSize:14, cursor:'pointer', color:'#374151',
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={saving} style={{
            flex:2, padding:'13px', borderRadius:12, border:'none',
            background: saving ? '#E5E7EB' : 'linear-gradient(135deg,#6366F1,#8B5CF6)',
            color: saving ? '#9CA3AF' : '#fff',
            fontWeight:800, fontSize:14.5, cursor: saving ? 'not-allowed':'pointer',
            boxShadow: !saving ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
            transition:'all .25s', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            {saving
              ? <><span style={{ animation:'rotate 1s linear infinite', display:'inline-block' }}>◌</span> Saving…</>
              : isEdit ? '✓ Save Changes' : '✦ Add Product'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
