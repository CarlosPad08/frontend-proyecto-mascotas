import React from 'react';
import '../styles/notfound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate (-1);
  }
  return (
    <div className="notfound-container">
      <button className="back-button" onClick={handleBack}>Regresar</button>
      <h1 className="notfound-title">Error 404</h1>
      <p className="notfound-message">Página no encontrada :/</p>
      <p className="notfound-message">¡No pierdas las huellas de tu próxima mascota!</p>
    </div>
  );
};

export default NotFound;
