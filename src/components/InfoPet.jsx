import '../styles/infopet.css';

function InfoPet({onCerrar}) {
  return (
    <div className="info-pet-container">
      <div className="header-global">
        <h1 className="logo">MiMascota</h1>
        <h2 className="page-title">¿Quién soy?</h2>
        <button className="close-btn" onClick={onCerrar}>✕</button>
      </div>

      <div className="body-content">
        <div className="sidebar">
          <div className="pet-info">
            <p><strong>Nombre:</strong></p>
            <p><strong>Especie:</strong></p>
            <p><strong>Raza:</strong></p>
            <p><strong>Edad:</strong></p>
            <p><strong>Sexo:</strong></p>
            <p><strong>Color:</strong></p>
            <p><strong>Peso:</strong></p>
            <p><strong>Tamaño:</strong></p>
            <p><strong>Esterilizado:</strong></p>
            <p><strong>Vacunas al día:</strong></p>
          </div>
        </div>

        <div className="main-content">
          <h1 className="section-title">PROCEDIMIENTOS REALIZADOS</h1>

          <div className="procedure-info">
            <p><strong>Fecha:</strong></p>
            <p><strong>Procedimiento:</strong></p>
            <p><strong>Veterinaria:</strong></p>
            <p><strong>Veterinario responsable:</strong></p>
            <p><strong>Observaciones:</strong></p>
          </div>

          <div className="carousel">
            <button className="arrow">←</button>
            <button className="arrow">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPet;
