import React from "react";
import "../styles/cardMascota.css";

function CardMascota({ mascota = {} }) {

    const { animal_id, refugio_id, nombre, especie, raza, edad, estado, descripcion, foto } = mascota;

    const manejarEdad = (edad) => {
        if (edad > 1) {
            return `${edad} años`;
        } else if (edad === 1) {
            return `${edad} año`;
        } else {
            let edadMeses = edad * 10;
            return `${edadMeses} meses`;
        }
    }

    const edadMascota = manejarEdad(edad);

    return (
        <div className="card-mascota">
            <div className="card-mascota-image-container">
                <img src={foto} alt={nombre} className="card-mascota-image" />
                <div className="card-mascota-badge">{especie}</div>
            </div>
            
            <div className="card-mascota-content">
                <h3 className="card-mascota-nombre">{nombre}</h3>
                
                <div className="card-mascota-detalles">
                    <span className="card-mascota-edad">{edadMascota}</span>
                    <span className="card-mascota-separador">•</span>
                    <span className="card-mascota-raza">{raza}</span>
                </div>
                
                <p className="card-mascota-descripcion">{descripcion}</p>
                
                <div className="card-mascota-footer">
                    <button className="card-mascota-btn-adoptar">Adoptar</button>
                    <button className="card-mascota-btn-info">Más info</button>
                </div>
            </div>
        </div>
    );
}

export default CardMascota;