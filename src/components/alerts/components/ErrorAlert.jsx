import React, { useEffect } from 'react';
import '../../alerts/styles/ErrorAlert.css';

const ErrorAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Prevenir scroll mientras la alerta está visible
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="error-alert">
        {message}
      </div>
    </div>
  );
};

export default ErrorAlert;
