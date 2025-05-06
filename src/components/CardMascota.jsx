import React, { useState } from "react";
import "../styles/cardMascota.css";
import ModalAdopcion from "./ModalAdopcion";
import axiosInstance from "../api/axios";

function CardMascota({ mascota = {} }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const { animal_id, nombre, especie, raza, edad, descripcion, foto } = mascota;

  const manejarEdad = (edad) => {
    if (edad > 1) return `${edad} años`;
    else if (edad === 1) return `${edad} año`;
    else return `${edad * 10} meses`;
  };

  const edadMascota = manejarEdad(edad);

  const handleAdoptar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para adoptar.");
      return;
    }
    setMostrarModal(true);
  };

  const enviarSolicitud = async (nota) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        animal_id,
        nota_adicional: nota,
      };
      await axiosInstance.post("/api/solicitudes", payload, { headers });
      alert("✅ Solicitud enviada con éxito.");
    } catch (err) {
      console.error("Error al enviar solicitud", err);
      alert("❌ Hubo un error al enviar la solicitud.");
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
