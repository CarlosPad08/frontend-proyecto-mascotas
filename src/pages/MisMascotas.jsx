import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import axiosInstance from '../api/axios';
import CardMisMascotas from '../components/CardMisMascotas';
import '../styles/misMascotas.css';

const MisMascotas = () => {
    // Estado para almacenar las mascotas del usuario
    const [mascotas, setMascotas] = useState([]);
    
    // Estado para manejar la carga y errores
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Obtener el ID del usuario del localStorage
    const getUserId = () => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedData = JSON.parse(userData);
                return parsedData.usuario?.usuario_id;
            }
            return null;
        } catch (error) {
            console.error('Error al obtener el ID del usuario:', error);
            return null;
        }
    };
    
    // Efecto para cargar las mascotas del usuario
    useEffect(() => {
        const fetchMascotas = async () => {
            setLoading(true);
            setError(null);
            
            const userId = getUserId();
            
            if (!userId) {
                setError('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
                setLoading(false);
                return;
            }
            
            try {
                // const response = await axiosInstance.get(`/api/mascotas/buscar/${userId}`);
                const response = await axiosInstance.get(`/api/mascotas`);
                setMascotas(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar las mascotas:', err);
                setError('Error al cargar tus mascotas. Por favor, intenta nuevamente más tarde.');
                setLoading(false);
                
                // Datos de ejemplo en caso de error
                setMascotas([
                    {
                        animal_id: 1,
                        nombre: 'Luna',
                        especie: 'Perro',
                        raza: 'Labrador',
                        edad: 2,
                        descripcion: 'Luna es una perra muy cariñosa y juguetona. Le encanta correr en el parque y jugar con pelotas.',
                        foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                        animal_id: 2,
                        nombre: 'Michi',
                        especie: 'Gato',
                        raza: 'Siamés',
                        edad: 3,
                        descripcion: 'Michi es un gato muy tranquilo y cariñoso. Le gusta dormir en lugares cálidos y jugar con juguetes pequeños.',
                        foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                        animal_id: 3,
                        nombre: 'Rocky',
                        especie: 'Perro',
                        raza: 'Bulldog',
                        edad: 4,
                        descripcion: 'Rocky es un perro fuerte y protector. Es muy leal a su familia y le encanta recibir caricias.',
                        foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
                    }
                ]);
            }
        };
        
        fetchMascotas();
    }, []);
    
    // Funciones para manejar la edición y eliminación de mascotas
    const handleEditMascota = (mascotaId) => {
        console.log('Editar mascota con ID:', mascotaId);
        // Aquí iría la lógica para editar la mascota
    };
    
    const handleDeleteMascota = (mascotaId) => {
        console.log('Eliminar mascota con ID:', mascotaId);
        // Aquí iría la lógica para eliminar la mascota
        if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
            // Implementar la eliminación
        }
    };
    
    return (
        <div className="mis-mascotas-container">
            <div className="mis-mascotas-header">
                <Link to="/inicio" className="back-button">
                    <FaArrowLeft /> Volver al inicio
                </Link>
                <h1>Mis Mascotas</h1>
                <MdPets className="pet-icon" />
            </div>
            
            <div className="mis-mascotas-actions-simple">
                <Link to="/registrar-mascota" className="agregar-mascota-btn">
                    <FaPlus /> Agregar Mascota
                </Link>
            </div>
            
            <div className="mis-mascotas-content">
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Cargando tus mascotas...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <p className="error-message">{error}</p>
                        <button
                            className="retry-button"
                            onClick={() => window.location.reload()}
                        >
                            Intentar nuevamente
                        </button>
                    </div>
                ) : mascotas.length > 0 ? (
                    <div className="mis-mascotas-lista">
                        {mascotas.map((mascota) => (
                            <CardMisMascotas 
                                key={mascota.animal_id} 
                                mascota={mascota} 
                                onEdit={handleEditMascota}
                                onDelete={handleDeleteMascota}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-mascotas">
                        <MdPets className="no-mascotas-icon" />
                        <h2>No tienes mascotas registradas</h2>
                        <p>¡Registra tu primera mascota haciendo clic en "Agregar Mascota"!</p>
                        <Link to="/registrar-mascota" className="registrar-mascota-btn">
                            <FaPlus /> Registrar Mascota
                        </Link>
                    </div>
                )}
            </div>
            
            <div className="mis-mascotas-footer">
                <p>MiMascota - Cuida y protege a tus compañeros peludos</p>
            </div>
        </div>
    );
};

export default MisMascotas;