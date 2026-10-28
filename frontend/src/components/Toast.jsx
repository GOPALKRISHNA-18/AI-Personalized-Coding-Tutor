import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { subscribeToToasts } from '../utils/toast';
import './Toast.css';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((toastItem) => {
      setToasts((prev) => [...prev, toastItem]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastItem.id));
      }, toastItem.duration || 3000);
    });
    return unsubscribe;
  }, []);

  const handleDismiss = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className='toast-viewport' aria-live='polite'>
      {toasts.map((t) => (
        <div key={t.id} className={`toast-card toast-${t.type}`}>
          <div className='toast-icon'>
            {t.type === 'success' && <CheckCircle2 size={18} />}
            {t.type === 'error' && <AlertCircle size={18} />}
            {t.type === 'warning' && <AlertTriangle size={18} />}
            {t.type === 'info' && <Info size={18} />}
          </div>
          <div className='toast-message'>{t.message}</div>
          <button
            type='button'
            className='toast-close-btn'
            onClick={() => handleDismiss(t.id)}
            aria-label='Dismiss toast'
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;