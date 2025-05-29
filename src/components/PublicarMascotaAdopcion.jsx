import React, { useState } from 'react';
import axiosInstance from '../api/axios.js'
import { uploadImageToCloudinary } from '../utils/uploadImage.js';
import '../styles/publicarMascotaAdopcion.css';
import { FaPaw, FaImage, FaUpload, FaSpinner } from 'react-icons/fa';

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
        foto: '',
    });
    
    // Para manejar las imágenes
    const [imagenPreview, setImagenPreview] = useState(null);
    // Nuevos estados para controlar la carga y el botón
    const [cargandoImagen, setCargandoImagen] = useState(false);
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [progresoSubida, setProgresoSubida] = useState(0);
    
    // Maneja los cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMascotaData({
            ...mascotaData,
            [name]: value
        });
    };
    
    // Maneja la subida de imágenes
    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];

            if (file) {
                // Iniciar proceso de carga
                setCargandoImagen(true);
                setBotonHabilitado(false);
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
                    setMascotaData((prevData) => {
                        const updatedData = {
                            ...prevData,
                            foto: uploadedUrl,
                        };
                        return updatedData;
                    });
                    
                    // Completar la barra de progreso
                    setProgresoSubida(100);
                    // Limpiar intervalo
                    clearInterval(intervalo);
                    // Indicar que la carga ha terminado
                    setCargandoImagen(false);
                    
                    // Habilitar el botón después de 3 segundos
                    setTimeout(() => {
                        setBotonHabilitado(true);
                    }, 3500);
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
        setBotonHabilitado(false);
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
                                
                                {/* Indicador de progreso */}
                                {cargandoImagen && (
                                    <div className="upload-progress-container">
                                        <div className="upload-progress-bar" style={{ width: `${progresoSubida}%` }}></div>
                                        <div className="upload-spinner">
                                            <FaSpinner className="spin-animation" /> Subiendo imagen...
                                        </div>
                                    </div>
                                )}
                                
                                {!cargandoImagen && progresoSubida === 100 && !botonHabilitado && (
                                    <div className="upload-success">
                                        <p>Imagen subida correctamente. El botón se habilitará en 3 segundos...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className={`publicar-btn ${!botonHabilitado && mascotaData.foto ? 'publicar-btn-disabled' : ''}`}
                            disabled={!botonHabilitado && mascotaData.foto}
                        >
                            {!botonHabilitado && mascotaData.foto ? 'Preparando...' : 'Publicar mascota en adopción'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PublicarMascotaAdopcion;