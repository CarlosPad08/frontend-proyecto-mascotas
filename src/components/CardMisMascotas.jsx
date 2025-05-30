import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import '../styles/cardMisMascotas.css';

const CardMisMascotas = ({ mascota, onEdit, onDelete }) => {
    const { animal_id, nombre, especie, raza, edad, foto } = mascota;
    
    // Función para manejar la edad y mostrarla en formato adecuado
    const formatearEdad = (edad) => {
        if (edad > 1) return `${edad} años`;
        else if (edad === 1) return `${edad} año`;
        else return `${edad * 10} meses`;
    };
    
    return (
        <div className="card-mis-mascotas">
            <div className="card-mis-mascotas-imagen">
                <img src={foto} alt={nombre} />
                <div className="card-mis-mascotas-especie">{especie}</div>
            </div>
            
            <div className="card-mis-mascotas-info">
                <h3 className="card-mis-mascotas-nombre">{nombre}</h3>
                
                <div className="card-mis-mascotas-detalles">
                    <div className="detalle">
                        <span className="etiqueta">Raza:</span>
                        <span className="valor">{raza}</span>
                    </div>
                    
                    <div className="detalle">
                        <span className="etiqueta">Edad:</span>
                        <span className="valor">{formatearEdad(edad)}</span>
                    </div>
                </div>
            </div>
            
            <div className="card-mis-mascotas-acciones">
                <button 
                    className="accion-editar" 
                    onClick={() => onEdit(animal_id)}
                    title="Editar mascota"
                >
                    <FaPencilAlt />
                </button>
                
                <button 
                    className="accion-eliminar" 
                    onClick={() => onDelete(animal_id)}
                    title="Eliminar mascota"
                >
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default CardMisMascotas;