import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import "../styles/dashboardRefugio.css";

// Componentes
import BarraLateral from "../components/BarraLateral.jsx";
import PublicarMascotaAdopcion from "../components/PublicarMascotaAdopcion.jsx";
import SolicitudesAdopcion from "../components/SolicitudesAdopcion.jsx";

// Íconos
import { FaPaw, FaHome, FaCalendarAlt, FaUsers } from "react-icons/fa";

function DashboardRefugio() {
    // Datos del refugio
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { id, nombre, email, telefono, direccion } = userData.refugio;
    
    // Estado para controlar qué vista se muestra
    const [vistaActiva, setVistaActiva] = useState('inicio');
    
    // Algunos datos de ejemplo (estos deberían venir de una API en una aplicación real)
    const [stats, setStats] = useState({
        mascotasTotal: 12,
        mascotasAdoptadas: 5,
        solicitudesPendientes: 3,
        visitasRecientes: 28
    });
    
    // Renderiza el contenido según la vista activa
    const renderContenido = () => {
        switch(vistaActiva) {
            case 'publicar':
                return <PublicarMascotaAdopcion />;
            case 'mascotas':
                return (
                    <div>
                        <h1 className="dashboard-refugio-titulo">Mascotas en adopción</h1>
                        <div className="dashboard-refugio-card">
                            <h3 className="dashboard-refugio-card-titulo">Listado de mascotas</h3>
                            <p>Aquí se mostrará el listado de mascotas en adopción...</p>
                        </div>
                    </div>
                );
            case 'solicitudes':
                return <SolicitudesAdopcion />;
            case 'inicio':
            default:
                return (
                    <div>
                        <h1 className="dashboard-refugio-titulo">Bienvenido, {nombre}</h1>
                        
                        <div className="dashboard-refugio-stats-grid">
                            <div className="dashboard-refugio-card">
                                <h3 className="dashboard-refugio-card-titulo">
                                    <FaPaw style={{ marginRight: '8px' }} />
                                    Mascotas en adopción
                                </h3>
                                <p className="dashboard-refugio-card-stats">{stats.mascotasTotal - stats.mascotasAdoptadas}</p>
                                <p className="dashboard-refugio-card-descripcion">Mascotas buscando hogar</p>
                            </div>
                            
                            <div className="dashboard-refugio-card">
                                <h3 className="dashboard-refugio-card-titulo">
                                    <FaHome style={{ marginRight: '8px' }} />
                                    Adopciones exitosas
                                </h3>
                                <p className="dashboard-refugio-card-stats">{stats.mascotasAdoptadas}</p>
                                <p className="dashboard-refugio-card-descripcion">Mascotas con nuevo hogar</p>
                            </div>
                            
                            <div className="dashboard-refugio-card">
                                <h3 className="dashboard-refugio-card-titulo">
                                    <FaUsers style={{ marginRight: '8px' }} />
                                    Solicitudes pendientes
                                </h3>
                                <p className="dashboard-refugio-card-stats">{stats.solicitudesPendientes}</p>
                                <p className="dashboard-refugio-card-descripcion">Esperando revisión</p>
                            </div>
                            
                            <div className="dashboard-refugio-card">
                                <h3 className="dashboard-refugio-card-titulo">
                                    <FaCalendarAlt style={{ marginRight: '8px' }} />
                                    Visitas recientes
                                </h3>
                                <p className="dashboard-refugio-card-stats">{stats.visitasRecientes}</p>
                                <p className="dashboard-refugio-card-descripcion">Últimos 30 días</p>
                            </div>
                        </div>
                        
                        <div className="dashboard-refugio-card">
                            <h3 className="dashboard-refugio-card-titulo">Mascotas recientemente añadidas</h3>
                            <p>Aquí se mostrará un listado de las últimas mascotas añadidas...</p>
                        </div>
                        
                        <div className="dashboard-refugio-card">
                            <h3 className="dashboard-refugio-card-titulo">Últimas solicitudes de adopción</h3>
                            <p>Aquí se mostrarán las solicitudes de adopción más recientes...</p>
                        </div>
                    </div>
                );
        }
    };
    
    return (
        <div className="dashboard-refugio">
            <BarraLateral vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />
            <div className="dashboard-refugio-contenido">
                {renderContenido()}
            </div>
        </div>
    );
};

export default DashboardRefugio;