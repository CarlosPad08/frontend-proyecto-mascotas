import React from "react";
import "../styles/principal.css";

const Principal = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="container">
      <header className="banner">
        <div className="logo">MiMascota</div>
        <nav className="b-link">
          <a href="#clientes">Clientes</a>
          <a href="#acerca">Acerca de</a>
        </nav>
        <div className="auth-buttons">
          <button className="login" onClick={onLoginClick}>Ingresar</button>
          <button className="register" onClick={onRegisterClick}>Registrarse</button>
        </div>
      </header>

      <main className="main-content">
        <div className="welcome-text">
          <h1>¡Bienvenido a MiMascota!</h1>
          <p>Cuida, ama y adopta!!.</p>
        </div>
        <button className="cta-button">¡Ingresa aquí!</button>
      </main>

      <footer className="footer">© 2025 MiMascota - Todos los derechos reservados</footer>
    </div>
  );
};

export default Principal;
