
import React, { useEffect } from 'react';

export default function Toast({ type='info', message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`toast ${type}`} onClick={onClose}>
      {message}
    </div>
  );
}
