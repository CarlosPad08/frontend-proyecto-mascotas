import React, { useState } from 'react';
import "../styles/signin.css";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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
    // Aquí iría la lógica para autenticar al usuario
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
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
          
          <div className="input-group">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder=" " 
              required 
            />
            <label htmlFor="password">Contraseña</label>
            <span className="show-password" onClick={toggleShowPassword}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </span>
          </div>
          
          <div className="forgot-password">
            <span>¿Olvidaste tu contraseña?</span>
          </div>
          
          <button type="submit" className="signin-button">Iniciar Sesión</button>
        </form>
        
        <div className="signin-divider">
          <span>x</span>
        </div>
        
        <div className="signin-options">
          
          <div className="signup-link">
            ¿No tienes una cuenta? <span onClick={() => window.location.href = '/signup'}>Regístrate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
