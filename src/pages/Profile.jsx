import React from "react";
import "../styles/profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="menu-icon">{/* TODO: agregar icono hamburguesa */}</div>
        <h3 className="sidebar-title">PERFIL DE USUARIO</h3>

        {/* Panel interno con borde */}
        <div className="sidebar-panel">
          <nav className="sidebar-nav">
            <button className="nav-button active">
              {/* TODO: icono de casa */}
              Inicio
            </button>
            <button className="nav-button">
              {/* TODO: icono de búsqueda */}
              Ir a búsqueda
            </button>
          </nav>
          <button className="help-button">
            {/* TODO: icono de ayuda */}
            Ayuda
          </button>
        </div>
      </aside>

      <main className="profile-main">
        <div className="logo-header">
          {/* TODO: logo MiMascota */}
          <span className="logo">🐾 MiMascota</span>
        </div>

        <div className="user-section">
          <div className="user-icon">{/* TODO: imagen de usuario */}</div>
          <h2 className="user-name">NOMBRE DE USUARIO</h2>
        </div>

        <div className="info-cards">
          <div className="card">
            <div className="card-icon">{/* TODO: icono contacto */}</div>
            <p>INFORMACIÓN DE CONTACTO</p>
          </div>
          <div className="card">
            <div className="card-icon">{/* TODO: icono personal */}</div>
            <p>INFORMACIÓN PERSONAL</p>
          </div>
          <div className="card wide">
            <div className="card-icon">{/* TODO: icono adicional */}</div>
            <p>INFORMACIÓN ADICIONAL</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

