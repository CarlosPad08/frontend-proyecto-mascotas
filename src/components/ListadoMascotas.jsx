import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import '../styles/listadoMascotas.css';
import { FaPaw, FaSearch, FaFilter, FaEdit, FaTrashAlt, FaDog, FaCat, FaSortAmountDown, FaPlus } from 'react-icons/fa';

const ListadoMascotas = () => {

    // Esatdo inicial de las mascotas
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        // Obtener datos del refugio
        const userData = localStorage.getItem('userData');
        const refugio_id = userData ? JSON.parse(userData).refugio.id : null;

        if (refugio_id) {
            // Llamado al backend
            axiosInstance.get(`/api/animal-adopcion/refugio/${refugio_id}`)
                .then(response => {
                    console.log("Datos recibidos satisfactoriamente");

                    const animalesData = response.data.map(animal => ({
                        id: animal.animal_id,
                        nombre: animal.nombre,
                        especie: animal.especie,
                        raza: animal.raza,
                        edad: animal.edad,
                        sexo: 'No especificado',
                        tamano: 'No especificado',
                        estado: animal.estado,
                        imagen: animal.foto,
                        descripcion: animal.descripcion
                    }));

                    setMascotas(animalesData);
                })
                .catch(error => {
                    console.error("Error al obtener los datos del refugio:", error);
                });
        }
    }, []);
    
    // Estados para filtros
    const [filtros, setFiltros] = useState({
        tipo: 'todos',
        estado: 'todos',
        busqueda: ''
    });
    
    // Filtrar mascotas según los criterios
    const mascotasFiltradas = mascotas.filter(mascota => {
        // Filtro por tipo
        if (filtros.tipo !== 'todos' && mascota.tipo !== filtros.tipo) {
            return false;
        }
        
        // Filtro por estado
        if (filtros.estado !== 'todos' && mascota.estado !== filtros.estado) {
            return false;
        }
        
        // Filtro por texto de búsqueda (nombre o raza)
        if (filtros.busqueda && !(
            mascota.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            mascota.raza.toLowerCase().includes(filtros.busqueda.toLowerCase())
        )) {
            return false;
        }
        
        return true;
    });
    
    // Actualizar filtros
    const actualizarFiltros = (e) => {
        const { name, value } = e.target;
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [name]: value
        }));
    };
    
    // Manejar la eliminación de una mascota
    const eliminarMascota = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
            setMascotas(mascotas.filter(mascota => mascota.id !== id));
        }
    };

    return (
        <div className="listado-mascotas">
            {/* Título del componente */}
            <div className="listado-mascotas-header">
                <h1 className="listado-mascotas-titulo">
                    <FaPaw className="listado-mascotas-titulo-icon" />
                    Mascotas en Adopción
                </h1>
            </div>
            
            {/* Filtros y búsqueda */}
            <div className="listado-mascotas-filtros">
                <div className="listado-mascotas-filtro-grupo">
                    <FaFilter className="listado-mascotas-filtro-icon" />
                    <select 
                        name="tipo" 
                        value={filtros.tipo} 
                        onChange={actualizarFiltros}
                        className="listado-mascotas-select"
                    >
                        <option value="todos">Todos los tipos</option>
                        <option value="perro">Perros</option>
                        <option value="gato">Gatos</option>
                        <option value="otro">Otros</option>
                    </select>
                </div>
                
                <div className="listado-mascotas-filtro-grupo">
                    <FaFilter className="listado-mascotas-filtro-icon" />
                    <select 
                        name="estado" 
                        value={filtros.estado} 
                        onChange={actualizarFiltros}
                        className="listado-mascotas-select"
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="disponible">Disponible</option>
                        <option value="en proceso">En proceso</option>
                        <option value="adoptado">Adoptado</option>
                    </select>
                </div>
                
                <div className="listado-mascotas-busqueda">
                    <div className="listado-mascotas-busqueda-grupo">
                        <FaSearch className="listado-mascotas-busqueda-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre o raza" 
                            name="busqueda"
                            value={filtros.busqueda}
                            onChange={actualizarFiltros}
                            className="listado-mascotas-input"
                        />
                    </div>
                </div>
            </div>
            
            {/* Grid de tarjetas de mascotas */}
            {mascotasFiltradas.length === 0 ? (
                <div className="listado-mascotas-no-resultados">
                    <p>No se encontraron mascotas con los filtros aplicados.</p>
                </div>
            ) : (
                <div className="listado-mascotas-grid">
                    {mascotasFiltradas.map(mascota => (
                        <div key={mascota.id} className="mascota-card">
                            <div className="mascota-card-imagen-container">
                                <img 
                                    src={mascota.imagen} 
                                    alt={mascota.nombre} 
                                    className="mascota-card-imagen"
                                />
                                <span className={`mascota-estado ${mascota.estado}`}>
                                    {mascota.estado === 'disponible' && 'Disponible'}
                                    {mascota.estado === 'en proceso' && 'En proceso'}
                                    {mascota.estado === 'adoptado' && 'Adoptado'}
                                </span>
                            </div>
                            
                            <div className="mascota-card-contenido">
                                <h3 className="mascota-card-nombre">{mascota.nombre}</h3>
                                
                                <div className="mascota-card-tipo">
                                    {mascota.tipo === 'perro' ? 
                                        <FaDog className="mascota-tipo-icon perro" /> : 
                                        <FaCat className="mascota-tipo-icon gato" />
                                    }
                                    <span>{mascota.raza}</span>
                                </div>
                                
                                <div className="mascota-card-detalles">
                                    <div className="mascota-detalle">
                                        <span className="mascota-detalle-label">Edad:</span>
                                        <span className="mascota-detalle-valor">{mascota.edad}</span>
                                    </div>
                                    
                                    <div className="mascota-detalle">
                                        <span className="mascota-detalle-label">Sexo:</span>
                                        <span className="mascota-detalle-valor">
                                            {mascota.sexo === 'macho' ? 'Macho' : 
                                             mascota.sexo === 'hembra' ? 'Hembra' : '????'}
                                        </span>
                                    </div>
                                    
                                    <div className="mascota-detalle">
                                        <span className="mascota-detalle-label">Tamaño:</span>
                                        <span className="mascota-detalle-valor">
                                            {mascota.tamano === 'pequeno' ? 'Pequeño' : 
                                             mascota.tamano === 'mediano' ? 'Mediano' : 
                                             mascota.tamano === 'grande' ? 'Grande' : 'Normal'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="mascota-card-descripcion">
                                    <p>{mascota.descripcion}</p>
                                </div>
                            </div>
                            
                            <div className="mascota-card-acciones">
                                <button 
                                    className="btn-accion btn-editar"
                                    title="Editar mascota"
                                    onClick={() => alert(`Editar mascota ${mascota.nombre}`)}
                                >
                                    <FaEdit />
                                </button>
                                
                                <button 
                                    className="btn-accion btn-eliminar"
                                    title="Eliminar mascota"
                                    onClick={() => eliminarMascota(mascota.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListadoMascotas;