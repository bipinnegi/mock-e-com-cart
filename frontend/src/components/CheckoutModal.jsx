
import React, { useState } from 'react';

export default function CheckoutModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Checkout</h3>
        <form onSubmit={submit}>
          <label>
            Name
            <input value={name} onChange={e=>setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <div className="row r">
            <button type="button" className="ghost" onClick={onClose}>Cancel</button>
            <button className="primary" type="submit">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
}
