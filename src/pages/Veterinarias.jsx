import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import CardVeterinaria from '../components/CardVeterinaria';
import axiosInstance from '../api/axios';
import '../styles/veterinarias.css';

const Veterinarias = () => {
    const [veterinarias, setVeterinarias] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroServicio, setFiltroServicio] = useState('todos');
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    // Datos de ejemplo (en un caso real, estos vendrían de una API)
    useEffect(() => {
        axiosInstance.get('/api/veterinarias')
            .then(response => {
                const veterinariaData = response.data.map(vet => {
                    // Procesar descripción para cada veterinaria individual
                    const horario = vet.descripcion?.match(/horario:\s([^;]+)/)?.[1] || '';
                    const calificacion = vet.descripcion?.match(/calificacion:\s([^;]+)/)?.[1] || '';
                    const servicios = vet.descripcion?.match(/servicios:\s([^;]+)/)?.[1]?.split(', ') || [];
                    
                    return {
                        id: vet.id,
                        nombre: vet.nombre,
                        imagen: vet.imagen || 'https://via.placeholder.com/150',
                        direccion: vet.direccion,
                        telefono: vet.telefono,
                        horario: horario,
                        calificacion: calificacion ? parseFloat(calificacion) : 0,
                        servicios: servicios,
                    };
                });
                setVeterinarias(veterinariaData);
            })
            .catch(error => {
                console.error('Error al obtener las veterinarias:', error);
            });
    }, []);

    // Función para filtrar veterinarias
    const veterinariasFiltradas = () => {
        return veterinarias.filter(vet => {
            // Filtro por búsqueda
            const coincideBusqueda = 
                vet.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                vet.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
                vet.servicios.some(servicio => servicio.toLowerCase().includes(busqueda.toLowerCase()));
            
            // Filtro por servicio
            const coincideServicio = 
                filtroServicio === 'todos' ||
                vet.servicios.some(servicio => 
                    servicio.toLowerCase().includes(filtroServicio.toLowerCase())
                );
            
            return coincideBusqueda && coincideServicio;
        });
    };

    // Manejadores de eventos
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleServicioChange = (e) => {
        setFiltroServicio(e.target.value);
    };

    const toggleFiltros = () => {
        setMostrarFiltros(!mostrarFiltros);
    };

    // Lista de todos los servicios disponibles
    const todosLosServicios = [...new Set(
        veterinarias.flatMap(vet => vet.servicios)
    )];

    return (
        <div className="veterinarias-container">
            <div className="veterinarias-header">
                <h1>Veterinarias disponibles</h1>
                <button 
                    className="volver-atras-btn" 
                    onClick={() => window.history.back()}
                >
                    Volver Atrás
                </button>
            </div>

            <div className="veterinarias-busqueda-container">
                <div className="veterinarias-busqueda">
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
                <div className="veterinarias-filtros">
                    <div className="filtro-grupo">
                        <label htmlFor="filtroServicio">Servicio:</label>
                        <select 
                            id="filtroServicio" 
                            value={filtroServicio} 
                            onChange={handleServicioChange}
                            className="filtro-select"
                        >
                            <option value="todos">Todos los servicios</option>
                            {todosLosServicios.map((servicio, index) => (
                                <option key={index} value={servicio}>
                                    {servicio}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="veterinarias-resultados">
                <p className="resultados-contador">
                    {veterinariasFiltradas().length} veterinarias encontradas
                </p>

                <div className="veterinarias-grid">
                    {veterinariasFiltradas().length > 0 ? (
                        veterinariasFiltradas().map(veterinaria => (
                            <CardVeterinaria 
                                key={veterinaria.id} 
                                veterinaria={veterinaria} 
                            />
                        ))
                    ) : (
                        <div className="no-resultados">
                            <p>No se encontraron veterinarias que coincidan con tu búsqueda.</p>
                            <p>Intenta con otros términos o ajusta los filtros.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Veterinarias;