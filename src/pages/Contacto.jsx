import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import '../styles/contacto.css';

const Contacto = () => {
    // Estado para el formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });
    
    // Estado para mensajes de éxito o error
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);
    
    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!formData.nombre || !formData.email || !formData.mensaje) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario a un backend
        // Por ahora solo simulamos el envío
        setTimeout(() => {
            setEnviado(true);
            setError(null);
            setFormData({
                nombre: '',
                email: '',
                asunto: '',
                mensaje: ''
            });
        }, 1000);
    };
    
    return (
        <div className="contacto-container">
            <div className="contacto-header">
                <Link to="/inicio" className="back-button">
                    <FaArrowLeft /> Volver al inicio
                </Link>
                <h1>Contáctanos</h1>
            </div>
            
            <div className="contacto-content">
                <div className="contacto-info">
                    <h2>Información de contacto</h2>
                    <p>Estamos aquí para ayudarte con cualquier pregunta o inquietud sobre nuestros servicios para mascotas.</p>
                    
                    <div className="contacto-detalles">
                        <div className="contacto-detalle">
                            <FaEnvelope className="contacto-icon" />
                            <div>
                                <h3>Email</h3>
                                <p>info@mimascota.com</p>
                            </div>
                        </div>
                        
                        <div className="contacto-detalle">
                            <FaPhone className="contacto-icon" />
                            <div>
                                <h3>Teléfono</h3>
                                <p>+123 456 7890</p>
                            </div>
                        </div>
                        
                        <div className="contacto-detalle">
                            <FaMapMarkerAlt className="contacto-icon" />
                            <div>
                                <h3>Dirección</h3>
                                <p>Av. Mascotas 123, Ciudad Animalitos</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="contacto-formulario-container">
                    <h2>Envíanos un mensaje</h2>
                    
                    {enviado ? (
                        <div className="mensaje-exito">
                            <h3>¡Mensaje enviado con éxito!</h3>
                            <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
                            <button 
                                className="nuevo-mensaje-btn"
                                onClick={() => setEnviado(false)}
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form className="contacto-formulario" onSubmit={handleSubmit}>
                            {error && <div className="error-mensaje">{error}</div>}
                            
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre *</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Tu email"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="asunto">Asunto</label>
                                <input
                                    type="text"
                                    id="asunto"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                    placeholder="Asunto del mensaje"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="mensaje">Mensaje *</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    placeholder="Escribe tu mensaje aquí"
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            
                            <button type="submit" className="enviar-btn">
                                <FaPaperPlane /> Enviar mensaje
                            </button>
                        </form>
                    )}
                </div>
            </div>
            
            <div className="contacto-footer">
                <p>MiMascota - Cuida y protege a tus compañeros peludos</p>
            </div>
        </div>
    );
};

export default Contacto;