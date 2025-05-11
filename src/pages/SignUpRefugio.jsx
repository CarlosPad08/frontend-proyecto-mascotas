import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import '../styles/signupRefugio.css';

function SignUpRefugio() {
  // Estados para los valores de los inputs
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    descripcion: "",
    email: "",
    contrasena: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validaciones básicas
    if (!formData.nombre.trim()) {
      alert("Por favor, ingresa el nombre del refugio.");
      return;
    }
    if (!formData.email.trim()) {
      alert("Por favor, ingresa un correo electrónico.");
      return;
    }
    // Validación básica de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }
    if (!formData.contrasena.trim()) {
      alert("Por favor, ingresa una contraseña.");
      return;
    }
    if (formData.contrasena.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (!formData.direccion.trim()) {
      alert("Por favor, ingresa la dirección del refugio.");
      return;
    }
    if (!formData.telefono.trim()) {
      alert("Por favor, ingresa un número de teléfono.");
      return;
    }
    if (!formData.descripcion.trim()) {
      alert("Por favor, ingresa una descripción de tu refugio.");
      return;
    }
  
    // Si pasa todas las validaciones
    console.log("Datos de registro del refugio:", formData);
    
    // Envío de datos al backend con Axios
    axiosInstance.post('/api/refugios/registro-refugio', formData)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        alert('Registro exitoso');
        // Redirigir al usuario a otra página si es necesario
        window.location.href = '/signin';
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un problema con el registro. Inténtalo de nuevo.');
      });
  };
  
  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="signup-refugio-container">
      <div className="signup-refugio-left-section">
        <div className="signup-refugio-left-section-title">
          <h1>¡Registra tu refugio de animales!</h1>
          <p>Ayúdanos a conectar mascotas con familias que las aman.</p>
        </div>
        <div className="signup-refugio-illustration">
          <img src="../public/ilustracion.webp" alt="Illustration" />
        </div>
      </div>
      <div className="signup-refugio-right-section">
        <div className="signup-refugio-box" style={{ height: '600px' }}>
          <div className="signup-refugio-info">
            <h2>Registro de Refugio</h2>
          </div>
          <div className="signup-refugio-info-form">
            <div className="signup-refugio-form-container">
              <form onSubmit={handleSubmit} style={{ height: '450px', overflowY: 'hidden', padding: '0 10px', position: 'relative' }}>
                <div className="signup-refugio-input-group">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="nombre">Nombre del Refugio</label>
                </div>

                <div className="signup-refugio-input-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='email'>Correo electrónico</label>
                </div>

                <div className="signup-refugio-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="contrasena"
                    id="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='contrasena'>Contraseña</label>
                  <span className="signup-refugio-show-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "ocultar" : "mostrar"}
                  </span>
                </div>

                <div className="signup-refugio-input-group">
                  <input
                    type="text"
                    name="direccion"
                    id="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='direccion'>Dirección</label>
                </div>

                <div className="signup-refugio-input-group">
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='telefono'>Teléfono</label>
                </div>

                <div className="signup-refugio-input-group">
                  <input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='descripcion'>Descripción del refugio</label>
                </div>

                <div className="signup-refugio-button">
                  <button type="submit">Registrar Refugio</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpRefugio;