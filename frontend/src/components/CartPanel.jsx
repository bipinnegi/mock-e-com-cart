
import React from 'react';

export default function CartPanel({ cart, onRemove, onSetQty, onCheckout }) {
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.items.length === 0 && <p className="muted">Your cart is empty.</p>}
      {cart.items.map(ci => (
        <div className="cart-row" key={ci._id}>
          <img src={ci.product.image} alt={ci.product.name} />
          <div className="grow">
            <div className="name">{ci.product.name}</div>
            <div className="muted">₹ {ci.product.price.toFixed(2)}</div>
            <div className="qty">
              <button onClick={()=>onSetQty(ci, ci.qty - 1)}>-</button>
              <span>{ci.qty}</span>
              <button onClick={()=>onSetQty(ci, ci.qty + 1)}>+</button>
            </div>
          </div>
          <button className="ghost" onClick={()=>onRemove(ci._id)}>✕</button>
        </div>
      ))} 
      <div className="total">
        <span>Total</span>
        <strong>₹ {cart.total?.toFixed ? cart.total.toFixed(2) : cart.total}</strong>
      </div>
      <button className="primary" disabled={!cart.items.length} onClick={onCheckout}>Checkout</button>
    </div>
  );
}
