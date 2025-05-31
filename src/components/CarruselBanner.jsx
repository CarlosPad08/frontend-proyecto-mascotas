import React, { useEffect, useState } from 'react';
import '../../public/carrusel1.png';
import '../../public/carrusel2.png';
import '../../public/carrusel3.png';
import '../../public/carrusel4.png';
import '../styles/carruselBanner.css';


const imagenes = ['carrusel3.png', 'carrusel2.png', 'carrusel1.png', 'carrusel4.png'];

const CarruselBanner = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="carrusel-banner">
      <div
        className="carrusel-inner"
        style={{ transform: `translateX(-${indiceActual * 100}%)` }}
      >
        {imagenes.map((img, index) => (
          <img key={index} src={`../public/${img}`} alt={`Publicidad ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default CarruselBanner;