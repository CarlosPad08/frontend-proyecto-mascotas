import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import CardGuarderia from '../components/CardGuarderia';
import axiosInstance from '../api/axios';
import '../styles/guarderia.css';

const Guarderias = () => {
    const [guarderias, setGuarderias] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroTipoMascota, setFiltroTipoMascota] = useState('todos');
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    // Obtener datos de la API
    useEffect(() => {
        axiosInstance.get('/api/guarderias')
            .then(response => {
                const guarderiasData = response.data.map(guarderia => {
                    // Procesar descripción para cada guardería individual
                    const horario = guarderia.descripcion?.match(/horario:\s([^;]+)/)?.[1] || '';
                    const calificacion = guarderia.descripcion?.match(/calificacion:\s([^;]+)/)?.[1] || '';
                    const servicios = guarderia.descripcion?.match(/servicios:\s([^;]+)/)?.[1]?.split(', ') || [];
                    const tiposMascota = guarderia.descripcion?.match(/tiposMascota:\s([^;]+)/)?.[1]?.split(', ') || [];
                    
                    return {
                        id: guarderia.id,
                        nombre: guarderia.nombre,
                        imagen: guarderia.imagen || 'https://via.placeholder.com/150',
                        direccion: guarderia.direccion,
                        telefono: guarderia.telefono,
                        horario: horario,
                        calificacion: calificacion ? parseFloat(calificacion) : 0,
                        servicios: servicios,
                        tiposMascota: tiposMascota
                    };
                });
                setGuarderias(guarderiasData);
            })
            .catch(error => {
                console.error('Error al obtener las guarderías:', error);
            });
    }, []);

    // Función para filtrar guarderías
    const guarderiasFiltradas = () => {
        return guarderias.filter(guarderia => {
            // Filtro por búsqueda
            const coincideBusqueda = 
                guarderia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                guarderia.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
                guarderia.servicios.some(servicio => servicio.toLowerCase().includes(busqueda.toLowerCase()));
            
            // Filtro por tipo de mascota
            const coincideTipoMascota = 
                filtroTipoMascota === 'todos' ||
                guarderia.tiposMascota.some(tipo => 
                    tipo.toLowerCase().includes(filtroTipoMascota.toLowerCase())
                );
            
            return coincideBusqueda && coincideTipoMascota;
        });
    };

    // Manejadores de eventos
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleTipoMascotaChange = (e) => {
        setFiltroTipoMascota(e.target.value);
    };

    const toggleFiltros = () => {
        setMostrarFiltros(!mostrarFiltros);
    };

    // Lista de todos los tipos de mascota disponibles
    const todosLosTiposMascota = [...new Set(
        guarderias.flatMap(guarderia => guarderia.tiposMascota)
    )];

    return (
        <div className="guarderias-container">
            <div className="guarderias-header">
                <h1>Guarderías para Mascotas</h1>
                <button 
                    className="volver-atras-btn" 
                    onClick={() => window.history.back()}
                >
                    Volver Atrás
                </button>
            </div>

            <div className="guarderias-busqueda-container">
                <div className="guarderias-busqueda">
                    <FaSearch className="busqueda-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, dirección o servicio..."
                        value={busqueda}
                        onChange={handleBusquedaChange}
                        className="busqueda-input"
                    />
                </div>
                <button 
                    className="filtro-toggle-btn"
                    onClick={toggleFiltros}
                >
                    <FaFilter /> Filtros
                </button>
            </div>

            {mostrarFiltros && (
                <div className="guarderias-filtros">
                    <div className="filtro-grupo">
                        <label htmlFor="filtroTipoMascota">Tipo de mascota:</label>
                        <select 
                            id="filtroTipoMascota" 
                            value={filtroTipoMascota} 
                            onChange={handleTipoMascotaChange}
                            className="filtro-select"
                        >
                            <option value="todos">Todos los tipos</option>
                            {todosLosTiposMascota.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="guarderias-resultados">
                <p className="resultados-contador">
                    {guarderiasFiltradas().length} guarderías encontradas
                </p>

                <div className="guarderias-grid">
                    {guarderiasFiltradas().length > 0 ? (
                        guarderiasFiltradas().map(guarderia => (
                            <CardGuarderia 
                                key={guarderia.id} 
                                guarderia={guarderia} 
                            />
                        ))
                    ) : (
                        <div className="no-resultados">
                            <p>No se encontraron guarderías que coincidan con tu búsqueda.</p>
                            <p>Intenta con otros términos o ajusta los filtros.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Guarderias;