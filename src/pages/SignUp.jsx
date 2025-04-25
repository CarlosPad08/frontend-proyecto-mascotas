import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import '../styles/signup.css';

function SignUp() {
  // Estados para los valores de los inputs
  const [formData, setFormData] = useState({
    usuario_id: "",
    rol_id: "1",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    telefono: "",
    direccion: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validaciones básicas
    if (!formData.nombre.trim()) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    if (!formData.apellido.trim()) {
      alert("Por favor, ingresa tu apellido.");
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
  
    // Si pasa todas las validaciones
    console.log("Datos de registro:", formData);
    
    // Envío de datos al backend con Axios
    axiosInstance.post('/api/usuarios/registrar', formData)
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
    <div className="signup-container">
      <div className="signup-left-section">
        <div className="signup-left-section-title">
          <h1>¡Un nuevo lugar para tú mascota!</h1>
          <p>Regístrate para comenzar a usar nuestra aplicación.</p>
        </div>
        <div className="signup-illustration">
          <img src="../public/ilustracion.png" alt="Illustration" />
        </div>
      </div>
      <div className="signup-right-section">
        <span className="signup-atras" onClick={() => window.history.back()}>&lt; Atras</span>
        <div className="signup-box">
          <div className="signup-info">
            <h2>Crea una cuenta</h2>
            <span className="signup-signin" onClick={() => window.location.href = '/signin'}>Inicia Sesion</span>
          </div>
          <div className="signup-info-form">
            <div className="signup-form-container">
              <form onSubmit={handleSubmit}>
                <div className="signup-input-group">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>

                <div className="signup-input-group">
                  <input
                    type="text"
                    name="apellido"
                    id="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='apellido'>Apellido</label>
                </div>

                <div className="signup-input-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='email'>Correo electronico</label>
                </div>

                <div className="signup-input-group">
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
                  <span className="signup-show-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "ocultar" : "mostrar"}
                  </span>
                </div>
                <div className="signup-button">
                  <button type="submit">Registrate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="signup-others">
          <p>¿Eres un refugio, centro veterinario o guarderia?</p>
          <button>Registrate por acá</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;