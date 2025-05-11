import React, { useState } from "react";
import ModalAdopcion from "./ModalAdopcion";
import axiosInstance from "../api/axios";
import "../styles/cardMascota.css";

function CardMascota({ mascota = {} }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const { animal_id, nombre, especie, raza, edad, descripcion, foto } = mascota;

  const mascota_id = animal_id;

  const manejarEdad = (edad) => {
    if (edad > 1) return `${edad} años`;
    else if (edad === 1) return `${edad} año`;
    else return `${edad * 10} meses`;
  };

  const edadMascota = manejarEdad(edad);

  const handleAdoptar = async () => {
    setMostrarModal(true);
  };

  const enviarSolicitud = async (nota) => {
    try {
      const payload = {
        mascota_id,
        mensaje: nota,
        estado: "pendiente"
      };

      console.log("Enviando solicitud con payload:", payload);
      
      const response = await axiosInstance.post("/api/solicitudes-adopcion/", payload);
      
      console.log("Respuesta del servidor:", response.data);
      alert("✅ Solicitud enviada con éxito.");
    } catch (err) {
      console.error("Error al enviar solicitud:", err);
      console.error("Detalles:", err.response?.data);
      
      // Mejor mensaje de error para el usuario
      if (err.response?.status === 401) {
        alert("❌ Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else {
        alert(`❌ Error: ${err.response?.data?.mensaje || err.message}`);
      }
    } finally {
      setMostrarModal(false);
    }
  };

  return (
    <>
      <ModalAdopcion
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={enviarSolicitud}
      />

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
            <button className="card-mascota-btn-adoptar" onClick={handleAdoptar}>
              Adoptar
            </button>
            <button className="card-mascota-btn-info">Más info</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardMascota;
