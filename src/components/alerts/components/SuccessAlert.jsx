import React, { useEffect } from 'react';
import '../../alerts/styles/SuccessAlert.css';

const SuccessAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-alert">
      {message}
    </div>
  );
};

export default SuccessAlert;
