// src/pages/RespuestaSolicitud.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/respuestaSolicitud.css";
import axiosInstance from "../api/axios";

function RespuestaSolicitud() {
  const navigate = useNavigate();
  const location = useLocation();
  const { solicitudId } = location.state || {}; // viene desde redirección

  const [estado, setEstado] = useState(null);
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !solicitudId) {
      alert("Acceso inválido");
      navigate("/inicio");
      return;
    }

    axiosInstance
      .get(`/api/solicitudes/${solicitudId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEstado(res.data.estado); // "aceptada", "rechazada", "pendiente"
        setMascota(res.data.mascota); // nombre, especie, etc.
      })
      .catch((err) => {
        console.error("Error obteniendo solicitud", err);
        alert("No se pudo cargar la solicitud");
        navigate("/inicio");
      });
  }, [solicitudId, navigate]);

  const renderEstado = () => {
    switch (estado) {
      case "aceptada":
        return <span className="estado aceptada">¡Solicitud aceptada! 🎉</span>;
      case "rechazada":
        return <span className="estado rechazada">Solicitud rechazada 😢</span>;
      default:
        return <span className="estado pendiente">Solicitud en proceso...</span>;
    }
  };

  return (
    <div className="respuesta-container">
      <h2>Estado de tu solicitud</h2>
      {renderEstado()}
      {mascota && (
        <div className="mascota-info">
          <p><strong>Nombre:</strong> {mascota.nombre}</p>
          <p><strong>Especie:</strong> {mascota.especie}</p>
          <p><strong>Raza:</strong> {mascota.raza}</p>
        </div>
      )}
      <button className="volver-btn" onClick={() => navigate("/animales-adopcion")}>
        Volver a mascotas disponibles
      </button>
    </div>
  );
}

export default RespuestaSolicitud;
