import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaQuestion } from 'react-icons/fa';
import '../styles/botonCerrarSesion.css';

const BotonCerrarSesion = () => {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const navigate = useNavigate();
    
    const handleCerrarSesion = () => {
        // Si no se está mostrando la confirmación, mostrarla
        if (!mostrarConfirmacion) {
            setMostrarConfirmacion(true);
            // Ocultar automáticamente después de 3 segundos
            setTimeout(() => {
                setMostrarConfirmacion(false);
            }, 3000);
            return;
        }
        
        // Si ya se está mostrando la confirmación, cerrar sesión
        // Eliminar datos de sesión del localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        
        // Redirigir al login
        navigate('/signin');
    };
    
    return (
        <div className={`boton-cerrar-sesion-container ${mostrarConfirmacion ? 'expandido' : ''}`}>
            {mostrarConfirmacion && (
                <div className="confirmacion-cerrar-sesion">
                    <p>¿Cerrar sesión?</p>
                </div>
            )}
            
            <button 
                className="boton-cerrar-sesion" 
                onClick={handleCerrarSesion}
                title={mostrarConfirmacion ? "Confirmar cerrar sesión" : "Cerrar sesión"}
            >
                {mostrarConfirmacion ? <FaQuestion /> : <FaSignOutAlt />}
            </button>
        </div>
    );
};

export default BotonCerrarSesion;