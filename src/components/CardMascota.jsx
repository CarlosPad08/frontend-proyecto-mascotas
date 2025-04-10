import React from "react";
import "../styles/cardMascota.css";

function CardMascota({ mascota = {} }) {
    // Default values if no mascota prop is provided
    const {
        nombre = "Luna",
        edad = "2 años",
        tipo = "Perro",
        raza = "Labrador",
        descripcion = "Una compañera juguetona y cariñosa que adora los paseos y los abrazos.",
        imagen = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    } = mascota;

    return (
        <div className="card-mascota">
            <div className="card-mascota-image-container">
                <img src={imagen} alt={nombre} className="card-mascota-image" />
                <div className="card-mascota-badge">{tipo}</div>
            </div>
            
            <div className="card-mascota-content">
                <h3 className="card-mascota-nombre">{nombre}</h3>
                
                <div className="card-mascota-detalles">
                    <span className="card-mascota-edad">{edad}</span>
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