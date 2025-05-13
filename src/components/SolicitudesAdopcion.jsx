import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import '../styles/solicitudesAdopcion.css';
import { FaInbox, FaCheck, FaTimes, FaEye, FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';

const SolicitudesAdopcion = () => {
    // Estado para las solicitudes de adopción
    const [solicitudes, setSolicitudes] = useState([]);
    // Estado para filtros
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [busqueda, setBusqueda] = useState('');
    
    useEffect(() => {
        // Tomar el ID del refugio desde el localStorage
        const userData = localStorage.getItem('userData');
        const refugio_id = userData ? JSON.parse(userData).refugio.id : null;
        
        if (refugio_id) {
            // Llamado al backend
            axiosInstance.get(`/api/solicitudes-adopcion/refugio/${refugio_id}`)
                .then(response => {
                    console.log('Datos de solicitudes de adopción:', response.data);
                    // Obtener solo los datos necesarios
                    const solicitudesData = response.data.map(solicitud => ({
                        id: solicitud.solicitud_id,
                        mascota: solicitud.nombre_mascota,
                        raza: '',
                        solicitante: solicitud.nombre_usuario,
                        contacto: solicitud.email_usuario,
                        fecha: new Date(solicitud.fecha_solicitud).toLocaleDateString(),
                        estado: solicitud.estado,
                        mensaje: solicitud.mensaje
                    }));
                    // Actualizar el estado con los datos obtenidos
                    setSolicitudes(solicitudesData);
                    console.log('Solicitudes de adopción:', solicitudesData);
                })
                .catch(error => {
                    console.error('Error al obtener las solicitudes de adopción:', error);
                });
        }
    }, []); // Array vacío para que se ejecute solo en el montaje inicial
    
    // Manejador para cambiar el estado de una solicitud
    const cambiarEstado = (id, nuevoEstado) => {
        setSolicitudes(solicitudes.map(solicitud => {
            if (solicitud.id === id) {
                return {...solicitud, estado: nuevoEstado};
            }
            return solicitud;
        }));
    };
    
    // Filtrar solicitudes según estado y búsqueda
    const solicitudesFiltradas = solicitudes.filter(solicitud => {
        // Filtro por estado
        if (filtroEstado !== 'todos' && solicitud.estado !== filtroEstado) {
            return false;
        }
        
        // Filtro por búsqueda (en mascota o solicitante)
        if (busqueda && !(
            solicitud.mascota.toLowerCase().includes(busqueda.toLowerCase()) ||
            solicitud.solicitante.toLowerCase().includes(busqueda.toLowerCase())
        )) {
            return false;
        }
        
        return true;
    });
    
    // Obtener conteo de solicitudes por estado
    const conteoEstados = {
        total: solicitudes.length,
        pendientes: solicitudes.filter(s => s.estado === 'pendiente').length,
        aceptadas: solicitudes.filter(s => s.estado === 'aceptada').length,
        rechazadas: solicitudes.filter(s => s.estado === 'rechazada').length
    };

    return (
        <div className="solicitudes-adopcion">
            <h1 className="solicitudes-adopcion-titulo">
                <FaInbox className="solicitudes-adopcion-titulo-icon" />
                Solicitudes de Adopción
            </h1>
            
            {/* Tarjetas de resumen */}
            <div className="solicitudes-adopcion-resumen">
                <div className="solicitudes-adopcion-card">
                    <h3>Total</h3>
                    <p className="solicitudes-adopcion-numero">{conteoEstados.total}</p>
                    <span className="solicitudes-adopcion-etiqueta">Solicitudes</span>
                </div>
                
                <div className="solicitudes-adopcion-card pendientes">
                    <h3>Pendientes</h3>
                    <p className="solicitudes-adopcion-numero">{conteoEstados.pendientes}</p>
                    <span className="solicitudes-adopcion-etiqueta">Por revisar</span>
                </div>
                
                <div className="solicitudes-adopcion-card aceptadas">
                    <h3>Aceptadas</h3>
                    <p className="solicitudes-adopcion-numero">{conteoEstados.aceptadas}</p>
                    <span className="solicitudes-adopcion-etiqueta">En proceso</span>
                </div>
                
                <div className="solicitudes-adopcion-card rechazadas">
                    <h3>Rechazadas</h3>
                    <p className="solicitudes-adopcion-numero">{conteoEstados.rechazadas}</p>
                    <span className="solicitudes-adopcion-etiqueta">No viables</span>
                </div>
            </div>
            
            {/* Filtros y búsqueda */}
            <div className="solicitudes-adopcion-filtros">
                <div className="solicitudes-adopcion-filtro-grupo">
                    <FaFilter className="solicitudes-adopcion-filtro-icon" />
                    <select 
                        value={filtroEstado} 
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        className="solicitudes-adopcion-select"
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="pendiente">Pendientes</option>
                        <option value="aceptada">Aceptadas</option>
                        <option value="rechazada">Rechazadas</option>
                    </select>
                </div>
                
                <div className="solicitudes-adopcion-busqueda">
                    <div className="solicitudes-adopcion-busqueda-grupo">
                        <FaSearch className="solicitudes-adopcion-busqueda-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar por mascota o solicitante" 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="solicitudes-adopcion-input"
                        />
                    </div>
                </div>
            </div>
            
            {/* Lista de solicitudes */}
            <div className="solicitudes-adopcion-lista-container">
                <div className="solicitudes-adopcion-lista-header">
                    <div className="solicitudes-adopcion-lista-header-item">
                        <span>Mascota</span>
                        <FaSortAmountDown className="solicitudes-adopcion-sort-icon" />
                    </div>
                    <div className="solicitudes-adopcion-lista-header-item">
                        <span>Solicitante</span>
                    </div>
                    <div className="solicitudes-adopcion-lista-header-item">
                        <span>Fecha</span>
                    </div>
                    <div className="solicitudes-adopcion-lista-header-item">
                        <span>Estado</span>
                    </div>
                    <div className="solicitudes-adopcion-lista-header-item">
                        <span>Acciones</span>
                    </div>
                </div>
                
                {solicitudesFiltradas.length === 0 ? (
                    <div className="solicitudes-adopcion-no-resultados">
                        <p>No se encontraron solicitudes con los filtros aplicados.</p>
                    </div>
                ) : (
                    <ul className="solicitudes-adopcion-lista">
                        {solicitudesFiltradas.map(solicitud => (
                            <li key={solicitud.id} className="solicitudes-adopcion-item">
                                <div className="solicitudes-adopcion-item-mascota">
                                    <h4>{solicitud.mascota}</h4>
                                    <span>{solicitud.raza}</span>
                                </div>
                                
                                <div className="solicitudes-adopcion-item-solicitante">
                                    <h4>{solicitud.solicitante}</h4>
                                    <span>{solicitud.contacto}</span>
                                </div>
                                
                                <div className="solicitudes-adopcion-item-fecha">
                                    {solicitud.fecha}
                                </div>
                                
                                <div className="solicitudes-adopcion-item-estado">
                                    <span className={`solicitud-estado ${solicitud.estado}`}>
                                        {solicitud.estado === 'pendiente' && 'Pendiente'}
                                        {solicitud.estado === 'aceptada' && 'Aceptada'}
                                        {solicitud.estado === 'rechazada' && 'Rechazada'}
                                    </span>
                                </div>
                                
                                <div className="solicitudes-adopcion-item-acciones">
                                    <button 
                                        className="btn-accion btn-ver"
                                        title="Ver detalles"
                                        onClick={() => alert(`Mensaje de ${solicitud.solicitante}: ${solicitud.mensaje}`)}
                                    >
                                        <FaEye />
                                    </button>
                                    
                                    {solicitud.estado === 'pendiente' && (
                                        <>
                                            <button 
                                                className="btn-accion btn-aceptar"
                                                title="Aceptar solicitud"
                                                onClick={() => cambiarEstado(solicitud.id, 'aceptada')}
                                            >
                                                <FaCheck />
                                            </button>
                                            
                                            <button 
                                                className="btn-accion btn-rechazar"
                                                title="Rechazar solicitud"
                                                onClick={() => cambiarEstado(solicitud.id, 'rechazada')}
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SolicitudesAdopcion;