import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/barraLateral.css';

// Componentes
import PublicarMascotaAdopcion from './PublicarMascotaAdopcion.jsx';

// Importando íconos
import { FaHome, FaPaw, FaPlusCircle, FaInbox, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const BarraLateral = ({ vistaActiva, setVistaActiva }) => {
    // Tomar datos del refugio desde el localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Descomponer los datos del refugio
    const { id, nombre, email, telefono, direccion } = userData.refugio;

    return (
        <aside className="barra-lateral">
            <div className="barra-lateral-header">
                <div className="barra-lateral-logo">
                    <FaPaw className="barra-lateral-logo-icon" />
                    <h2>MiMascota</h2>
                </div>
                <div className="barra-lateral-refugio">
                    <h3>{nombre}</h3>
                    <p className="barra-lateral-subtitulo">Refugio de Mascotas</p>
                </div>
            </div>
            
            <nav className="barra-lateral-nav">
                <ul className="barra-lateral-menu">
                    <li className={vistaActiva === 'inicio' ? 'barra-lateral-item active' : 'barra-lateral-item'}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setVistaActiva('inicio');
                        }}>
                            <FaHome className="barra-lateral-icon" />
                            <span>Inicio</span>
                        </a>
                    </li>
                    <li className={vistaActiva === 'mascotas' ? 'barra-lateral-item active' : 'barra-lateral-item'}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setVistaActiva('mascotas');
                        }}>
                            <FaPaw className="barra-lateral-icon" />
                            <span>Mascotas en adopción</span>
                        </a>
                    </li>
                    <li className={vistaActiva === 'publicar' ? 'barra-lateral-item active' : 'barra-lateral-item'}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setVistaActiva('publicar');
                        }}>
                            <FaPlusCircle className="barra-lateral-icon" />
                            <span>Publicar mascota</span>
                        </a>
                    </li>
                    <li className={vistaActiva === 'solicitudes' ? 'barra-lateral-item active' : 'barra-lateral-item'}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setVistaActiva('solicitudes');
                        }}>
                            <FaInbox className="barra-lateral-icon" />
                            <span>Solicitudes</span>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div className="barra-lateral-footer">
                <ul className="barra-lateral-menu">
                    <li className="barra-lateral-item">
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            // Aquí podrías agregar lógica para manejar la navegación al perfil
                            // Por ahora solo prevenimos el comportamiento por defecto
                        }}>
                            <FaUser className="barra-lateral-icon" />
                            <span>Mi Perfil</span>
                        </a>
                    </li>
                    <li className="barra-lateral-item">
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            // Aquí podrías agregar lógica para manejar la navegación a configuración
                        }}>
                            <FaCog className="barra-lateral-icon" />
                            <span>Configuración</span>
                        </a>
                    </li>
                    <li className="barra-lateral-item">
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            // Aquí podrías agregar lógica para manejar el cierre de sesión
                        }}>
                            <FaSignOutAlt className="barra-lateral-icon" />
                            <span>Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default BarraLateral;