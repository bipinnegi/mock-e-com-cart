
import React from 'react';

export default function ProductsGrid({ products, onAdd }) {
  return (
    <div className="products">
      {products.map(p => (
        <div className="card" key={p._id}>
          <img src={p.image} alt={p.name} loading="lazy" />
          <div className="card-body">
            <h3>{p.name}</h3>
            <p className="desc">{p.description}</p>
            <div className="row">
              <strong>₹ {p.price.toFixed(2)}</strong>
              <button onClick={()=>onAdd(p._id, 1)}>Add</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
