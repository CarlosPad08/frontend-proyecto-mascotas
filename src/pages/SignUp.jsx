import React, { useState } from 'react';
import '../styles/signup.css';

function SignUp() {
  // Estados para los valores de los inputs
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validaciones básicas
    if (!formData.firstname.trim()) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    if (!formData.lastname.trim()) {
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
    if (!formData.password.trim()) {
      alert("Por favor, ingresa una contraseña.");
      return;
    }
    if (formData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
  
    // Si pasa todas las validaciones
    console.log("Datos de registro:", formData);
    alert("Registro exitoso");
    // Aquí podrías enviar los datos al backend
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
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="firstname">Nombre</label>
                </div>

                <div className="signup-input-group">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='lastname'>Apellido</label>
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
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor='password'>Contraseña</label>
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