import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul className="navbar-nav-links">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/guarderias">Guarderías</a></li>
                    <li><a href="/veterinarias">Veterinarias</a></li>
                </ul>
            </div>
            
            <div className="navbar-center">
                <h1 className="navbar-site-title">MiMascota</h1>
            </div>
            
            <div className="navbar-right">
                <ul className="navbar-nav-links">
                    <li><a href="/contacto">Contacto</a></li>
                    <li><a href="/mascotas">Mis Mascotas</a></li>
                    <li><a href="/perfil">Perfil</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;