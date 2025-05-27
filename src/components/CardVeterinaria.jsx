import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaStarHalfAlt, FaRegStar, FaPaw } from 'react-icons/fa';
import '../styles/cardVeterinaria.css';

const CardVeterinaria = ({ veterinaria }) => {
    const {
        nombre,
        imagen,
        direccion,
        telefono,
        horario,
        calificacion,
        servicios,
    } = veterinaria;

    // Renderiza las estrellas de calificación
    const renderEstrellas = (calificacion) => {
        const estrellas = [];
        const calificacionEntera = Math.floor(calificacion);
        const tieneMedia = calificacion % 1 >= 0.5;
        
        // Estrellas completas
        for (let i = 0; i < calificacionEntera; i++) {
            estrellas.push(<FaStar key={`star-${i}`} className="estrella-llena" />);
        }
        
        // Estrella media si corresponde
        if (tieneMedia) {
            estrellas.push(<FaStarHalfAlt key="star-half" className="estrella-media" />);
        }
        
        // Estrellas vacías
        const estrellasVacias = 5 - calificacionEntera - (tieneMedia ? 1 : 0);
        for (let i = 0; i < estrellasVacias; i++) {
            estrellas.push(<FaRegStar key={`star-empty-${i}`} className="estrella-vacia" />);
        }
        
        return estrellas;
    };

    return (
        <div className="veterinaria-card">
            <div className="veterinaria-card-imagen-container">
                <img 
                    src={imagen} 
                    alt={nombre} 
                    className="veterinaria-card-imagen" 
                />
            </div>
            
            <div className="veterinaria-card-contenido">
                <h3 className="veterinaria-card-nombre">{nombre}</h3>
                
                <div className="veterinaria-card-calificacion">
                    <div className="veterinaria-estrellas">
                        {renderEstrellas(calificacion)}
                    </div>
                    <span className="veterinaria-calificacion-valor">{calificacion.toFixed(1)}</span>
                </div>
                
                <div className="veterinaria-card-info">
                    <div className="veterinaria-info-item">
                        <FaMapMarkerAlt className="veterinaria-info-icon" />
                        <span>{direccion}</span>
                    </div>
                    
                    <div className="veterinaria-info-item">
                        <FaPhone className="veterinaria-info-icon" />
                        <span>{telefono}</span>
                    </div>
                    
                    <div className="veterinaria-info-item">
                        <FaClock className="veterinaria-info-icon" />
                        <span>{horario}</span>
                    </div>
                </div>
                
                <div className="veterinaria-card-servicios">
                    <h4>Servicios:</h4>
                    <div className="veterinaria-servicios-lista">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="veterinaria-servicio-tag">
                                <FaPaw className="veterinaria-servicio-icon" />
                                <span>{servicio}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="veterinaria-card-footer">
                <button className="veterinaria-btn-contactar">
                    Contactar
                </button>
                <button className="veterinaria-btn-ver-mas">
                    Ver más información
                </button>
            </div>
        </div>
    );
};

export default CardVeterinaria;