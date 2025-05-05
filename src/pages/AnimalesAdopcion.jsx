import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios.js';
import Navbar from '../components/Navbar';
import InfoPet from '../components/InfoPet.jsx';
import CardMascota from '../components/CardMascota';
import '../styles/animalesAdopcion.css';

function AnimalesAdopcion() {
  const [animales, setAnimales] = useState([]);
  const [todosAnimales, setTodosAnimales] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  useEffect(() => {
    axiosInstance.get('/api/animal-adopcion/')
      .then(response => {
        setAnimales(response.data);
        setTodosAnimales(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Función para filtrar animales por especie
  const filtrarPorEspecie = (especie) => {
    setFiltroActivo(especie);
    
    if (especie === 'Todos') {
      setAnimales(todosAnimales);
    } else if (especie === 'Perro' || especie === 'Gato') {
      const animalesFiltrados = todosAnimales.filter(
        animal => animal.especie.toLowerCase() === especie.toLowerCase()
      );
      setAnimales(animalesFiltrados);
    } else {
      const animalesFiltrados = todosAnimales.filter(
        animal => animal.especie.toLowerCase() !== 'perro' && animal.especie.toLowerCase() !== 'gato'
      );
      setAnimales(animalesFiltrados);
    }
  };
  
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
            <button 
              className={`animales-adopcion-filtro-btn ${filtroActivo === 'Todos' ? 'active' : ''}`} 
              onClick={() => filtrarPorEspecie('Todos')}
            >
              Todos
            </button>
            <button 
              className={`animales-adopcion-filtro-btn ${filtroActivo === 'Perro' ? 'active' : ''}`} 
              onClick={() => filtrarPorEspecie('Perro')}
            >
              Perros
            </button>
            <button 
              className={`animales-adopcion-filtro-btn ${filtroActivo === 'Gato' ? 'active' : ''}`} 
              onClick={() => filtrarPorEspecie('Gato')}
            >
              Gatos
            </button>
            <button 
              className={`animales-adopcion-filtro-btn ${filtroActivo === 'Otro' ? 'active' : ''}`} 
              onClick={() => filtrarPorEspecie('Otro')}
            >
              Otros
            </button>
          </div>
        </div>
        
        <div className="animales-adopcion-mascotas-grid">
          {animales.length > 0 ? (
            animales.map(animal => (
              <CardMascota key={animal.id} mascota={animal} />
            ))
          ) : (
            <p className="no-resultados">No hay animales disponibles con este filtro.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimalesAdopcion;