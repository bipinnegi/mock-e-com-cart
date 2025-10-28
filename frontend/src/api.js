
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function req(path, opts={}) {
  const res = await fetch(BASE + path, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) {
    const err = await res.json().catch(()=>({error:`HTTP ${res.status}`}));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  getProducts: () => req('/api/products'),
  getCart: () => req('/api/cart'),
  addToCart: (productId, qty) => req('/api/cart', { method:'POST', body: JSON.stringify({ productId, qty }) }),
  removeFromCart: (id) => req(`/api/cart/${id}`, { method:'DELETE' }),
  checkout: ({name, email}) => req('/api/checkout', { method:'POST', body: JSON.stringify({ name, email }) })
};
 