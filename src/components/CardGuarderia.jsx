import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaStarHalfAlt, FaRegStar, FaPaw, FaDog, FaCat } from 'react-icons/fa';
import '../styles/cardGuarderia.css';

const CardGuarderia = ({ guarderia }) => {
    const {
        nombre,
        imagen,
        direccion,
        telefono,
        horario,
        calificacion,
        servicios,
        tiposMascota
    } = guarderia;

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

    // Renderiza los iconos de tipos de mascota
    const renderTiposMascota = (tipos) => {
        return tipos.map((tipo, index) => {
            let icono;
            switch (tipo.toLowerCase()) {
                case 'perros':
                    icono = <FaDog key={`tipo-${index}`} className="tipo-mascota-icon" />;
                    break;
                case 'gatos':
                    icono = <FaCat key={`tipo-${index}`} className="tipo-mascota-icon" />;
                    break;
                default:
                    icono = <FaPaw key={`tipo-${index}`} className="tipo-mascota-icon" />;
            }
            return (
                <div key={index} className="tipo-mascota-tag">
                    {icono}
                    <span>{tipo}</span>
                </div>
            );
        });
    };

    return (
        <div className="guarderia-card">
            <div className="guarderia-card-imagen-container">
                <img 
                    src={imagen} 
                    alt={nombre} 
                    className="guarderia-card-imagen" 
                />
            </div>
            
            <div className="guarderia-card-contenido">
                <h3 className="guarderia-card-nombre">{nombre}</h3>
                
                <div className="guarderia-card-calificacion">
                    <div className="guarderia-estrellas">
                        {renderEstrellas(calificacion)}
                    </div>
                    <span className="guarderia-calificacion-valor">{calificacion.toFixed(1)}</span>
                </div>
                
                <div className="guarderia-card-info">
                    <div className="guarderia-info-item">
                        <FaMapMarkerAlt className="guarderia-info-icon" />
                        <span>{direccion}</span>
                    </div>
                    
                    <div className="guarderia-info-item">
                        <FaPhone className="guarderia-info-icon" />
                        <span>{telefono}</span>
                    </div>
                    
                    <div className="guarderia-info-item">
                        <FaClock className="guarderia-info-icon" />
                        <span>{horario}</span>
                    </div>
                </div>
                
                <div className="guarderia-card-tipos-mascota">
                    <h4>Aceptamos:</h4>
                    <div className="guarderia-tipos-mascota-lista">
                        {renderTiposMascota(tiposMascota)}
                    </div>
                </div>
                
                <div className="guarderia-card-servicios">
                    <h4>Servicios:</h4>
                    <div className="guarderia-servicios-lista">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="guarderia-servicio-tag">
                                <FaPaw className="guarderia-servicio-icon" />
                                <span>{servicio}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="guarderia-card-footer">
                <button className="guarderia-btn-contactar">
                    Contactar
                </button>
                <button className="guarderia-btn-ver-mas">
                    Ver más información
                </button>
            </div>
        </div>
    );
};

export default CardGuarderia;