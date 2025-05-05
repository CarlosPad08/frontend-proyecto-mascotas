import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios.js';
import Navbar from '../components/Navbar';
import CardMascota from '../components/CardMascota';
import '../styles/animalesAdopcion.css';

function AnimalesAdopcion() {

  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/animal-adopcion/')
      .then(response => {
        setAnimales(response.data);
        console.log(response.data);
        console.log('Animales:', animales);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div className="animales-adopcion-page">
      <Navbar />
      <div className="animales-adopcion-container_animales_adopcion">
        <div className="animales-adopcion-banner">
          <img src="../public/publicidad.webp" alt="Banner" />
        </div>

        <div className="animales-adopcion-header-section">
          <div className="animales-adopcion-header-text">
            <h1>Animales para Adopción</h1>
            <p>Encuentra a tu compañero perfecto entre nuestros adorables amigos que buscan un hogar lleno de amor.</p>
          </div>

          <div className="animales-adopcion-filtros-section">
            <button className="animales-adopcion-filtro-btn active">Todos</button>
            <button className="animales-adopcion-filtro-btn">Perros</button>
            <button className="animales-adopcion-filtro-btn">Gatos</button>
            <button className="animales-adopcion-filtro-btn">Otros</button>
          </div>
        </div>
        
        
        <div className="animales-adopcion-mascotas-grid">
          {animales.map(animales => (
            <CardMascota key={animales.id} mascota={animales} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default AnimalesAdopcion;