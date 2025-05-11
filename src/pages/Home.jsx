import { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import axiosInstance from "../api/axios";
import "../styles/home.css";

function Home() {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    // Verificar si la URL actual es /signin
    const currentPath = window.location.pathname;
    if (currentPath === "/signin") {
      setShowSignIn(true);
    }
  }, []);

  axiosInstance.get("/api/");

  return (
    <div>
      <div className="home-container">
        <div className="home-navbar">
          <div className="home-navbar-menu">
            <div className="home-navbar-logo">
              <img src="../public/logo.webp" alt="Logo" />
            </div>
            <div className="home-navbar-title">
              <h1>MiMascota</h1>
              <span className="home-span-about">Sobre nosotros</span>
            </div>
          </div>
          <div className="home-navbar-links">
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
          <div className="home-signin-wrapper">
            <SignIn />
          </div>
        ) : (
          <div className="home-info-container">
            <div className="home-info">
              <h1>Disfruta de una amplia gama de servicios para tu mascota</h1>
              <p>En MiMascota encontrarás desde centros veterinarios y guarderías ¡hasta una nueva compañía para tu mascota!</p>
              <div className="home-info-boton">
                <button className="home-boton" onClick={() => window.location.href = '/signup'}>Comienza</button>
              </div>
            </div>
            <div className="home-info-image">
              <img src="/fondo-aternativo1.webp" alt="Placeholder" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default Home;