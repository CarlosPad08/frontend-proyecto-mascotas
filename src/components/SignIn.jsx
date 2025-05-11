import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios.js';
import "../styles/signin.css";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', formData);

    // Verificar si es un usario, refugio, veterinaria o guardería
    const emailDiferenciador = formData.email.split('@')[1]?.split('.')[0];

    let path = '/api/auth/login';
    let redirectPath = '/inicio';

    if (emailDiferenciador.includes('refugio')) {
      // Redirigir a refugio
      path = '/api/refugios/login-refugio';
      redirectPath = '/refugio/dashboard';
    } else if (emailDiferenciador.includes('veterinaria')) {
      // Redirigir a veterinaria
      path = '/api/veterinarias/login-veterinaria';
    } else if (emailDiferenciador.includes('guarderia')) {
      // Redirigir a guardería
      path = '/api/guarderias/login-guarderia';
    }

    console.log('Ruta de inicio de sesión:', path);

    // Envío de datos al backend con Axios

    axiosInstance.post(path,
      formData,
      { withCredentials: true }
      )
      .then((response) => {
        // Redirigir al usuario a la página de perfil
        alert('Inicio de sesión exitoso');
        navigate(redirectPath);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      });  
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="signin-input-group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder=" " 
              required 
            />
            <label htmlFor="email">Correo electrónico</label>
          </div>
          
          <div className="signin-input-group">
            <input 
              type={showPassword ? "text" : "password"} 
              id="contrasena" 
              name="contrasena" 
              value={formData.contrasena} 
              onChange={handleChange} 
              placeholder=" " 
              required 
            />
            <label htmlFor="contrasena">Contraseña</label>
            <span className="signin-show-password" onClick={toggleShowPassword}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </span>
          </div>
          
          <div className="signin-forgot-password">
            <span>¿Olvidaste tu contraseña?</span>
          </div>
          
          <button type="submit" className="signin-button">Iniciar Sesión</button>
        </form>
        
        <div className="signin-divider">
          <span>x</span>
        </div>
        
        <div className="signin-options">
          <div className="signin-signup-link">
            ¿No tienes una cuenta? <span onClick={() => window.location.href = '/signup'}>Regístrate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
