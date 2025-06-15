import React, { useEffect } from 'react';
import '../styles/ToastNotification.css';

function ToastNotification({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const iconClass = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
  const typeClass = `toast-${type}`;

  return (
    <div className={`toast-notification ${typeClass}`}>
      <i className={`bi ${iconClass} me-2`}></i>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close-btn">&times;</button>
    </div>
  );
}

export default ToastNotification;
