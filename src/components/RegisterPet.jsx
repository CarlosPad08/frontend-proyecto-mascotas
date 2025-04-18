import React, { useState } from 'react';
import '../styles/registerpet.css';

const RegisterPet = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="section-title">Sube una foto de la mascota:</h2>

        <label className="upload-button">
          Agregar foto
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>

        <div className="image-preview">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Mascota ${index}`} />
          ))}
        </div>

        <h1 className="form-title">Permítenos conocerte</h1>

        <form className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className="form-group">
            <label htmlFor="breed">Raza:</label>
            <input type="text" id="breed" name="breed" />
          </div>

          <div className="form-group">
            <label htmlFor="age">Edad</label>
            <select id="age" name="age">
              <option value="">Select</option>
              <option value="1">1 año</option>
              <option value="2">2 años</option>
              <option value="3">3 años</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="weight">Peso</label>
            <select id="weight" name="weight">
              <option value="">Select</option>
              <option value="1-5">1-5 kg</option>
              <option value="6-10">6-10 kg</option>
              <option value="11+">11+ kg</option>
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / span 2' }}>
            <label htmlFor="species">Especie:</label>
            <select id="species" name="species">
              <option value="">Select</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </form>

        <button className="submit-button">Registrar</button>
      </div>
    </div>
  );
};

export default RegisterPet;
