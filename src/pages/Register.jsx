import React from "react";
import "../styles/register.css";

const Register = ({ onClose }) => {
  return (
    <div className="register-overlay" onClick={onClose}>
      <div className="register-container" onClick={(e) => e.stopPropagation()}>
        <div className="register-icon">
          <img src="/assets/user-icon.jpg" alt="Usuario" />
        </div>
        <input type="name" placeholder="Nombre" />
        <input type="surname" placeholder="Apellido" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button className="register-button">Registrarse</button>
      </div>
    </div>
  );
};

export default Register;
