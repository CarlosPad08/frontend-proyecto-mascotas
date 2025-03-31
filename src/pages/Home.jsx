import { useState, useEffect } from "react";
import "../styles/home.css";
import SignIn from "../components/SignIn";

function Home() {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    // Verificar si la URL actual es /signin
    const currentPath = window.location.pathname;
    if (currentPath === "/signin") {
      setShowSignIn(true);
    }
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="home-navbar">
          <div className="navbar-menu">
            <div className="navbar-logo">
              <img src="../public/logo.png" alt="Logo" />
            </div>
            <div className="navbar-title">
              <h1>MiMascota</h1>
              <span className="home-span-about">Sobre nosotros</span>
            </div>
          </div>
          <div className="navbar-links">
            <span onClick={() => window.location.href = '/signup'}>Registrate</span>
            <p>|</p>
            <span onClick={() => {
              if (showSignIn) {
                window.location.href = '/';
              } else {
                window.location.href = '/signin';
              }
            }}>
              {showSignIn ? "Volver" : "Iniciar Sesión"}
            </span>
          </div>
        </div>
        
        {showSignIn ? (
          <div className="signin-wrapper">
            <SignIn />
          </div>
        ) : (
          <div className="info-container">
            <div className="info">
              <h1>Disfruta de una amplia gama de servicios para tu mascota</h1>
              <p>En MiMascota encontrarás desde centros veterinarios y guarderías ¡hasta una nueva compañía para tu mascota!</p>
              <div className="info-boton">
                <button className="boton" onClick={() => window.location.href = '/signup'}>Comienza</button>
              </div>
            </div>
            <div className="info-image">
              <img src="/fondo-aternativo1.png" alt="Placeholder" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Home;