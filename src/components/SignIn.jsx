import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios.js';
import "../styles/signin.css";
import SuccessAlert from './alerts/components/SuccessAlert';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    contrasena: ''
  });
  const [showAlert, setShowAlert] = useState(false); // ✅ Estado para el Toast

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

    // Verificar si es un usuario, refugio, veterinaria o guardería
    const emailDiferenciador = formData.email.split('@')[1]?.split('.')[0];

    let path = '/api/auth/login';
    let redirectPath = '/inicio';

    if (emailDiferenciador.includes('refugio')) {
      path = '/api/refugios/login-refugio';
      redirectPath = '/dashboard-refugio';
    } else if (emailDiferenciador.includes('veterinaria')) {
      path = '/api/veterinarias/login-veterinaria';
    } else if (emailDiferenciador.includes('guarderia')) {
      path = '/api/guarderias/login-guarderia';
    }

    // Envío de datos al backend con Axios
    axiosInstance.post(path,
      formData,
      { withCredentials: true }
      )
      .then((response) => {
        // Guardar la respuesta en el localStorage
        const userData = response.data;
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Datos del usuario:', userData);

        // ✅ Mostrar la alerta visual
        setShowAlert(true);

        // 🔄 Redirigir después de 3 segundos
        setTimeout(() => {
          setShowAlert(false);
          navigate(redirectPath);
        }, 3000);
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
      {showAlert && (
        <SuccessAlert 
          message="¡Inicio de sesión exitoso!" 
          onClose={() => setShowAlert(false)} 
        />
      )}
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
