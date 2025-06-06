import React, { useState, useEffect } from 'react';
import AxiosInstance from '../api/axios.js';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPencilAlt, FaArrowLeft, FaImage, FaUpload, FaSpinner } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { uploadImageToCloudinary } from '../utils/uploadImage.js';
import '../styles/profile.css';

const Profile = () => {
    // Estado para almacenar los datos del usuario
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        imagen: ''
    });

    // Estado para controlar el modo de edición
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para almacenar los datos temporales durante la edición
    const [tempData, setTempData] = useState({});

    // Estados para manejar la imagen de perfil
    const [imagenPreview, setImagenPreview] = useState(null);
    const [cargandoImagen, setCargandoImagen] = useState(false);
    const [progresoSubida, setProgresoSubida] = useState(0);

    // Efecto para cargar los datos del usuario desde localStorage al montar el componente
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserData({
                    nombre: parsedUser.usuario?.nombre || '',
                    apellido: parsedUser.usuario?.apellido || '',
                    email: parsedUser.usuario?.email || '',
                    telefono: parsedUser.usuario?.telefono || '',
                    direccion: parsedUser.usuario?.direccion || '',
                    imagen: parsedUser.usuario?.imagen || ''
                });
            } catch (error) {
                console.error('Error al parsear los datos del usuario:', error);
            }
        }
    }, []);

    // Función para manejar el inicio de la edición
    const handleEditClick = () => {
        setTempData({...userData});
        setImagenPreview(userData.imagen);
        setIsEditing(true);
    };

    // Función para manejar los cambios en los campos de edición
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempData({
            ...tempData,
            [name]: value
        });
    };

    // Función para manejar la subida de imágenes de perfil
    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];

            if (file) {
                // Iniciar proceso de carga
                setCargandoImagen(true);
                setProgresoSubida(0);
                
                // Simular progreso de carga
                const intervalo = setInterval(() => {
                    setProgresoSubida(prev => {
                        const nuevoProgreso = prev + 10;
                        return nuevoProgreso > 90 ? 90 : nuevoProgreso;
                    });
                }, 200);
                
                const imageUrl = URL.createObjectURL(file);
                setImagenPreview(imageUrl);

                const uploadedUrl = await uploadImageToCloudinary(file);

                if (uploadedUrl) {
                    setTempData((prevData) => ({
                        ...prevData,
                        imagen: uploadedUrl,
                    }));
                    
                    // Completar la barra de progreso
                    setProgresoSubida(100);
                    // Limpiar intervalo
                    clearInterval(intervalo);
                    // Indicar que la carga ha terminado
                    setCargandoImagen(false);
                } else {
                    console.error("Error: La URL subida es inválida o no se generó correctamente.");
                    setCargandoImagen(false);
                    clearInterval(intervalo);
                }
            } else {
                console.warn("Advertencia: No se seleccionó ningún archivo.");
            }
        } catch (error) {
            console.error("Error durante la carga de la imagen:", error);
            setCargandoImagen(false);
            setProgresoSubida(0);
        }
    };

    // Función para guardar los cambios
    const handleSaveChanges = async () => {
        try {
            // Obtener el id del usuario desde localStorage
            const storedUserData = localStorage.getItem('userData');
            if (!storedUserData) {
                throw new Error('No se encontró información del usuario');
            }
            
            const parsedUserData = JSON.parse(storedUserData);
            const userId = parsedUserData.usuario?.usuario_id;
            
            if (!userId) {
                throw new Error('ID de usuario no encontrado');
            }
            
            console.log('User ID:', userId);
            console.log('Datos a actualizar:', tempData);
            
            // Realizar la petición al backend
            const response = await AxiosInstance.put(`/api/usuarios/${userId}`, tempData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status !== 200) {
                throw new Error('Error al actualizar el perfil');
            }
            
            const updatedUser = response.data;
            console.log('Respuesta del servidor:', updatedUser);
            
            // Actualizar el estado con los datos que tenemos en tempData
            // ya que sabemos que la actualización fue exitosa
            setUserData({...tempData});
            
            // Actualizar en localStorage manteniendo la estructura correcta
            const updatedLocalStorage = {
                ...parsedUserData,
                usuario: {
                    ...parsedUserData.usuario,
                    ...tempData // Usamos directamente los datos que enviamos
                }
            };
            
            localStorage.setItem('userData', JSON.stringify(updatedLocalStorage));
            setIsEditing(false);
            
            // Mostrar mensaje de éxito
            alert('Perfil actualizado correctamente');
            
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Ha ocurrido un error al actualizar el perfil: ' + error.message);
        }
    };

    // Función para cancelar la edición
    const handleCancelEdit = () => {
        setIsEditing(false);
        setImagenPreview(null);
        setCargandoImagen(false);
        setProgresoSubida(0);
    };

    // Función para generar las iniciales del usuario para el avatar
    const getUserInitials = () => {
        const firstInitial = userData.nombre ? userData.nombre.charAt(0).toUpperCase() : '';
        const lastInitial = userData.apellido ? userData.apellido.charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <Link to="/inicio" className="back-button">
                    <FaArrowLeft /> Volver al inicio
                </Link>
                <h1>Mi Perfil</h1>
                <MdPets className="pet-icon" />
            </div>

            <div className="profile-content">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        {userData.imagen ? (
                            <img src={userData.imagen} alt="Foto de perfil" className="profile-avatar-image" />
                        ) : (
                            getUserInitials()
                        )}
                    </div>
                    {!isEditing && (
                        <button className="edit-profile-btn" onClick={handleEditClick}>
                            <FaPencilAlt /> Editar Perfil
                        </button>
                    )}
                </div>

                <div className="profile-info-section">
                    {isEditing ? (
                        // Formulario de edición
                        <div className="profile-edit-form">
                            {/* Sección de imagen de perfil */}
                            <div className="form-group profile-image-section">
                                <label>Imagen de perfil</label>
                                <div className="imagen-upload-container">
                                    <div className="imagen-preview-area">
                                        {imagenPreview ? (
                                            <img src={imagenPreview} alt="Vista previa" className="imagen-preview profile-preview" />
                                        ) : (
                                            <div className="imagen-placeholder profile-placeholder">
                                                <FaImage />
                                                <p>Sin imagen de perfil</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="imagen-upload-controls">
                                        <label htmlFor="profile-image-upload" className="upload-btn">
                                            <FaUpload /> Seleccionar imagen
                                        </label>
                                        <input 
                                            type="file" 
                                            id="profile-image-upload" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            className="hidden-upload-input"
                                        />
                                        <p className="upload-help-text">Sube una foto para tu perfil</p>
                                        
                                        {/* Indicador de progreso */}
                                        {cargandoImagen && (
                                            <div className="upload-progress-container">
                                                <div className="upload-progress-bar" style={{ width: `${progresoSubida}%` }}></div>
                                                <div className="upload-spinner">
                                                    <FaSpinner className="spin-animation" /> Subiendo imagen...
                                                </div>
                                            </div>
                                        )}
                                        
                                        {!cargandoImagen && progresoSubida === 100 && (
                                            <div className="upload-success">
                                                <p>Imagen subida correctamente</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="nombre">
                                    <FaUser /> Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={tempData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellido">
                                    <FaUser /> Apellido
                                </label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={tempData.apellido}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    <FaEnvelope /> Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={tempData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">
                                    <FaPhone /> Teléfono
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={tempData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="direccion">
                                    <FaMapMarkerAlt /> Dirección
                                </label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    value={tempData.direccion}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="edit-actions">
                                <button className="save-btn" onClick={handleSaveChanges}>
                                    Guardar Cambios
                                </button>
                                <button className="cancel-btn" onClick={handleCancelEdit}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Vista de información
                        <div className="profile-info-card">
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaUser />
                                </div>
                                <div className="info-content">
                                    <h3>Nombre Completo</h3>
                                    <p>{userData.nombre} {userData.apellido}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="info-content">
                                    <h3>Email</h3>
                                    <p>{userData.email}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <FaPhone />
                                </div>
                                <div className="info-content">
                                    <h3>Teléfono</h3>
                                    <p>{userData.telefono || 'No especificado'}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="info-content">
                                    <h3>Dirección</h3>
                                    <p>{userData.direccion || 'No especificada'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-footer">
                <p>MiMascota - Tu perfil de usuario</p>
            </div>
        </div>
    );
};

export default Profile;