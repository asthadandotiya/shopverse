# 🛍️ ShopVerse — Premium E-Commerce

A fully functional, production-ready e-commerce site built with **React + Vite**.

## 🚀 Deploy to Vercel (3 steps)

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo → click **Deploy**
   - Framework: **Vite** (auto-detected)
   - Build command: `npm run build`
   - Output dir: `dist`

## 💻 Run Locally
```bash
npm install
npm run dev
```

## 🏗️ Build for Production
```bash
npm run build
npm run preview
```

## ✦ Features
- **Full CRUD** — Add, Edit, Delete products with form validation
- **18 Real Products** — With Unsplash images across 6 categories
- **Smart Cart** — Qty control, savings, free shipping threshold, tax calc
- **Search & Filter** — Live search, 7 sort modes, category filters
- **Product Detail Modal** — Specs, color swatches, qty selector
- **Wishlist** — Toggle per product
- **Animated Hero** — 4-slide auto-rotating banner
- **Toast Notifications** — For every action
- **Responsive** — Works on mobile, tablet, desktop

## 📁 Structure
```
src/
├── App.jsx
├── context/AppContext.jsx     ← All state management
├── data/products.js           ← Product data + categories
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── CategoryBar.jsx
│   ├── Toolbar.jsx
│   ├── ProductGrid.jsx
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   ├── ProductForm.jsx
│   ├── CartDrawer.jsx
│   ├── StarRating.jsx
│   ├── ToastStack.jsx
│   └── Footer.jsx
└── styles/global.css
```
