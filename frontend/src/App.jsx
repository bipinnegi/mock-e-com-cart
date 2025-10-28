
import React, { useEffect, useState } from 'react';
import { api } from './api';
import ProductsGrid from './components/ProductsGrid.jsx';
import CartPanel from './components/CartPanel.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [toast, setToast] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const load = async () => {
    const [p, c] = await Promise.all([api.getProducts(), api.getCart()]);
    setProducts(p);
    setCart(c);
  };

  useEffect(() => { load(); }, []);

  const addToCart = async (productId, qty=1) => {
    const updated = await api.addToCart(productId, qty);
    setCart(updated);
    setToast({ type: 'success', message: 'Added to cart!' });
  };

  const removeFromCart = async (cartItemId) => {
    const updated = await api.removeFromCart(cartItemId);
    setCart(updated);
    setToast({ type: 'info', message: 'Removed from cart' });
  };

  const setQty = async (cartItem, qty) => {
    if (qty < 1) return;
    const updated = await api.addToCart(cartItem.product._id, qty);
    setCart(updated);
  };

  const checkout = () => setShowCheckout(true);

  const onSubmitCheckout = async (payload) => {
    const res = await api.checkout(payload);
    setShowCheckout(false);
    setToast({ type: 'success', message: `Order ${res.receipt.orderId} placed!` });
    const c = await api.getCart();
    setCart(c);
  };

  return (
    <div className="container">
      <header>
        <h1>Vibe Commerce</h1>
        <p className="sub">Mock E‑Com Cart</p>
      </header>

      <main className="grid">
        <section>
          <h2>Products</h2>
          <ProductsGrid products={products} onAdd={addToCart} />
        </section>
        <aside>
          <CartPanel cart={cart} onRemove={removeFromCart} onSetQty={setQty} onCheckout={checkout} />
        </aside>
      </main>

      {showCheckout && <CheckoutModal onClose={()=>setShowCheckout(false)} onSubmit={onSubmitCheckout} />}
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}

      <footer>
        <small>© {new Date().getFullYear()} Vibe Commerce • Demo only</small>
      </footer>
    </div>
  );
}
