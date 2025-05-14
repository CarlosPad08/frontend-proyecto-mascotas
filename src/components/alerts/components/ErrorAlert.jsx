import React, { useEffect } from 'react';
import '../../alerts/styles/ErrorAlert.css';

const ErrorAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-alert">
      {message}
    </div>
  );
};

export default ErrorAlert;
