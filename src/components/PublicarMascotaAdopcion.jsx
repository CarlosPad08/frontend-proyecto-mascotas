import React, { useState } from 'react';
import axiosInstance from '../api/axios.js'
import '../styles/publicarMascotaAdopcion.css';
import { FaPaw, FaImage, FaUpload } from 'react-icons/fa';

const PublicarMascotaAdopcion = () => {
    // Tomar datos del refugio desde el localStorage
    const refugioData = JSON.parse(localStorage.getItem('userData'));
    const refugio_id = refugioData.refugio.id;
    // Estados para los datos del formulario
    const [mascotaData, setMascotaData] = useState({
        refugio_id: refugio_id,
        nombre: '',
        especie: 'perro',
        raza: '',
        edad: '',
        estado: 'disponible',
        descripcion: '',
    });
    
    // Para manejar las imágenes
    const [imagenPreview, setImagenPreview] = useState(null);
    
    // Maneja los cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMascotaData({
            ...mascotaData,
            [name]: value
        });
    };
    
    // Maneja la subida de imágenes
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Crear una URL para previsualizar la imagen
            const imageUrl = URL.createObjectURL(file);
            setImagenPreview(imageUrl);
            
            // En una aplicación real, aquí se subiria la imagen a un servidor
            // y se guardaría la URL en el estado
            setMascotaData({
                ...mascotaData,
                imagenes: [...mascotaData.imagenes, file]
            });
        }
    };
    
    // Maneja el envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de la mascota a publicar:', mascotaData);

        // Mandar datos al backend

        axiosInstance.post('/api/animal-adopcion/',
            mascotaData,
            { withCredentials: true })
        .then((response) => {
            alert('Mascota publicada exitosamente');
            console.log('Respuesta del servidor:', response.data);
        }).catch((error) => {
            console.error('Error al publicar la mascota:', error);
            alert('Error al publicar la mascota. Por favor, intenta nuevamente.');
        });


        // Resetear el formulario
        setMascotaData({
            refugio_id: refugio_id,
            nombre: '',
            especie: 'perro',
            raza: '',
            edad: '',
            estado: 'disponible',
            descripcion: '',
        });
        setImagenPreview(null);
    };
    
    return (
        <div className="publicar-mascota">
            <h1 className="publicar-mascota-titulo">
                <FaPaw style={{ marginRight: '10px' }} />
                Publicar mascota en adopción
            </h1>
            
            <div className="publicar-mascota-container">
                <form onSubmit={handleSubmit} className="publicar-mascota-form">
                    <div className="publicar-mascota-grid">
                        <div className="publicar-mascota-section">
                            <h3 className="publicar-mascota-subtitle">Información básica</h3>
                            
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre de la mascota</label>
                                <input 
                                    type="text" 
                                    id="nombre" 
                                    name="nombre" 
                                    value={mascotaData.nombre} 
                                    onChange={handleInputChange} 
                                    required 
                                    placeholder="Nombre de la mascota"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="tipo">Tipo de mascota</label>
                                <select 
                                    id="especie" 
                                    name="especie" 
                                    value={mascotaData.especie} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="perro">Perro</option>
                                    <option value="gato">Gato</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="raza">Raza</label>
                                <input 
                                    type="text" 
                                    id="raza" 
                                    name="raza" 
                                    value={mascotaData.raza} 
                                    onChange={handleInputChange} 
                                    placeholder="Raza o tipo"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="edad">Edad aproximada</label>
                                <input 
                                    type="text" 
                                    id="edad" 
                                    name="edad" 
                                    value={mascotaData.edad} 
                                    onChange={handleInputChange} 
                                    placeholder="Por ejemplo: 2 años, 5 meses"
                                />
                            </div>
                        </div>
                        
                        <div className="publicar-mascota-section">
                            <h3 className="publicar-mascota-subtitle">Características</h3>
                            
                            <div className="form-group">
                                <label htmlFor="sexo">Sexo</label>
                                <select 
                                    id="sexo" 
                                    name="sexo" 
                                    value={mascotaData.sexo} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="macho">Macho</option>
                                    <option value="hembra">Hembra</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="tamano">Tamaño</label>
                                <select 
                                    id="tamano" 
                                    name="tamano" 
                                    value={mascotaData.tamano} 
                                    onChange={handleInputChange} 
                                    required
                                >
                                    <option value="pequeno">Pequeño</option>
                                    <option value="mediano">Mediano</option>
                                    <option value="grande">Grande</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea 
                                    id="descripcion" 
                                    name="descripcion" 
                                    value={mascotaData.descripcion} 
                                    onChange={handleInputChange} 
                                    rows="4" 
                                    placeholder="Personalidad, historia y detalles importantes de la mascota..."
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="requisitosAdopcion">Requisitos para adopción</label>
                                <textarea 
                                    id="requisitosAdopcion" 
                                    name="requisitosAdopcion" 
                                    value={mascotaData.requisitosAdopcion} 
                                    onChange={handleInputChange} 
                                    rows="3" 
                                    placeholder="Requisitos específicos para adoptar esta mascota..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div className="publicar-mascota-section">
                        <h3 className="publicar-mascota-subtitle">Fotos</h3>
                        
                        <div className="imagen-upload-container">
                            <div className="imagen-preview-area">
                                {imagenPreview ? (
                                    <img src={imagenPreview} alt="Vista previa" className="imagen-preview" />
                                ) : (
                                    <div className="imagen-placeholder">
                                        <FaImage />
                                        <p>No hay imagen seleccionada</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="imagen-upload-controls">
                                <label htmlFor="imagen-upload" className="upload-btn">
                                    <FaUpload /> Seleccionar imagen
                                </label>
                                <input 
                                    type="file" 
                                    id="imagen-upload" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="hidden-upload-input"
                                />
                                <p className="upload-help-text">Se recomienda subir imágenes claras de la mascota</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="publicar-btn">
                            Publicar mascota en adopción
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PublicarMascotaAdopcion;