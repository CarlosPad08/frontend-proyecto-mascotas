import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPencilAlt, FaArrowLeft } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
    // Estado para almacenar los datos del usuario
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    // Estado para controlar el modo de edición
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para almacenar los datos temporales durante la edición
    const [tempData, setTempData] = useState({});

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
                    direccion: parsedUser.usuario?.direccion || ''
                });
            } catch (error) {
                console.error('Error al parsear los datos del usuario:', error);
            }
        }
    }, []);

    // Función para manejar el inicio de la edición
    const handleEditClick = () => {
        setTempData({...userData});
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

    // Función para guardar los cambios
    const handleSaveChanges = () => {
        setUserData(tempData);
        localStorage.setItem('userData', JSON.stringify(tempData));
        setIsEditing(false);
    };

    // Función para cancelar la edición
    const handleCancelEdit = () => {
        setIsEditing(false);
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
                        {getUserInitials()}
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