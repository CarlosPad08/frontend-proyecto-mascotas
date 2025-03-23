import React from "react";
import "../styles/login.css";

const Login = ({ onClose }) => {
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-icon">
          <img src="/assets/user-icon.png" alt="Usuario" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <button className="login-button">Iniciar sesión</button>
        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default Login;
