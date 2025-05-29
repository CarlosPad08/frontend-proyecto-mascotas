import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
    const location = useLocation();
    const isInicio = location.pathname === '/inicio';

    return (
        <nav className={`navbar ${isInicio ? 'navbar-transparent' : ''}`}>
            <div className="navbar-left">
                <ul className="navbar-nav-links">
                    <li><a href="/inicio">Inicio</a></li>
                    <li><a href="/dashboard-refugio">Guarderías</a></li>
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