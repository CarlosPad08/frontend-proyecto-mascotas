import React from 'react';
import Navbar from '../components/Navbar';
import CardMascota from '../components/CardMascota';
import '../styles/animalesAdopcion.css';

function AnimalesAdopcion() {
  // Sample data for demonstration
  const mascotas = [
    {
      id: 1,
      nombre: "Luna",
      edad: "2 años",
      tipo: "Perro",
      raza: "Labrador",
      descripcion: "Una compañera juguetona y cariñosa que adora los paseos y los abrazos.",
      imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 2,
      nombre: "Simba",
      edad: "1 año",
      tipo: "Gato",
      raza: "Siames",
      descripcion: "Un gato elegante y juguetón que le encanta acurrucarse y ronronear en tu regazo.",
      imagen: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80"
    },
    {
      id: 3,
      nombre: "Rocky",
      edad: "3 años",
      tipo: "Perro",
      raza: "Bulldog",
      descripcion: "Un perro leal y tranquilo que adora los mimos y pasar tiempo con su familia.",
      imagen: "https://images.unsplash.com/photo-1583511655826-05700442982d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
    },
    {
      id: 4,
      nombre: "Mia",
      edad: "6 meses",
      tipo: "Gato",
      raza: "Maine Coon",
      descripcion: "Una gatita dulce y curiosa que adora explorar y jugar con juguetes interactivos.",
      imagen: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 5,
      nombre: "Max",
      edad: "4 años",
      tipo: "Perro",
      raza: "Golden Retriever",
      descripcion: "Un perro amigable y energético que adora nadar y jugar a buscar la pelota.",
      imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1424&q=80"
    },
    {
      id: 6,
      nombre: "Coco",
      edad: "2 años",
      tipo: "Conejo",
      raza: "Enano",
      descripcion: "Un conejo adorable y dócil que disfruta de las caricias y comer zanahorias frescas.",
      imagen: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ];

  return (
    <div className="animales-adopcion-page">
      <Navbar />
      <div className="container_animales_adopcion">
        <div className="banner">
          <img src="../public/publicidad.png" alt="Banner" />
        </div>

        <div className="header-section">
          <h1>Animales para Adopción</h1>
          <p>Encuentra a tu compañero perfecto entre nuestros adorables amigos que buscan un hogar lleno de amor.</p>

          <div className="filtros-section">
            <button className="filtro-btn active">Todos</button>
            <button className="filtro-btn">Perros</button>
            <button className="filtro-btn">Gatos</button>
            <button className="filtro-btn">Otros</button>
          </div>
        </div>
        
        
        <div className="mascotas-grid">
          {mascotas.map(mascota => (
            <CardMascota key={mascota.id} mascota={mascota} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default AnimalesAdopcion;