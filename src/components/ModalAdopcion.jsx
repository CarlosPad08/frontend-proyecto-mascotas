import React, { useState } from 'react';
import "../styles/ModalAdopcion.css";

function ModalAdopcion({ visible, onClose, onConfirm }) {
  const [nota, setNota] = useState("");

  if (!visible) return null;

  return (
    <div className="modal-adopcion-overlay">
      <div className="modal-adopcion">
        <h3>¿Deseas enviar una solicitud de adopción?</h3>
        <textarea
          placeholder="Nota adicional (opcional)"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => onConfirm(nota)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAdopcion;
