import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import '../styles/contacto.css';
import emailjs from '@emailjs/browser';

const Contacto = () => {
    const formRef = useRef();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.email || !formData.mensaje) {
            setError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Enviar correo con EmailJS
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setEnviado(true);
            setError(null);
            setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        }).catch((err) => {
            console.error(err);
            setError('Hubo un error al enviar el mensaje. Intenta nuevamente.');
        });
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
                                <p>mimascotaweboficial@gmail.com</p>
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
                        <form
                            ref={formRef}
                            className="contacto-formulario"
                            onSubmit={handleSubmit}
                        >
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
