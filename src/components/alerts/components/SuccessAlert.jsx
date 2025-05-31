import React, { useEffect } from 'react';
import '../../alerts/styles/SuccessAlert.css';

const SuccessAlert = ({ message, onClose }) => {
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
      <div className="success-alert">
        {message}
      </div>
    </div>
  );
};

export default SuccessAlert;
