import Navbar from "../components/Navbar";
import "../styles/inicio.css";

function inicio () {
  const navigate = (path) => {
    window.location.href = path;
  }
  
  return (
    <div className="inicio-inicio-container">
      <Navbar customClass="inicio-navbar" />
      <div className="inicio-App">

      <section className="inicio-hero">
        <div className="inicio-container inicio-hero-inner">
          <div className="inicio-hero-copy">
            <h1>El lugar seguro<br />para tus mascotas</h1>
            <p>Gestiona a tus mascotas, encuentra centros veterinarios, guarderías y ¿por que no? adopta un nuevo amigo para tu familia.</p>
            <div className="inicio-hero-cta">
              <a className="inicio-btn inicio-btn-primary" href="#">Mis mascotas</a>
              <a className="inicio-btn inicio-btn-secondary" href="#">Ver ofertas</a>
            </div>
          </div>
          <div className="inicio-hero-illustration">
            <img src="illustration-green.webp" alt="Illustration" />
          </div>
        </div>
      </section>

      <section className="inicio-features">
        <div className="inicio-container">
          <div className="inicio-feature" onClick={() => navigate('/animales-adopcion')}>
            <div className="inicio-icon">🐶</div>
            <h3>Animalitos en adopcion</h3>
            <p>Encuentra a tu nuevo mejor amigo entre los animalitos que buscan un hogar.</p>
          </div>
          <div className="inicio-feature" onClick={() => navigate('/veterinarias')}>
            <div className="inicio-icon">🏥</div>
            <h3>Centros veterinarios</h3>
            <p>Descubre los mejores centros veterinarios para el cuidado de tus mascotas.</p>
          </div>
          <div className="inicio-feature" onClick={() => navigate('/guarderias')}>
            <div className="inicio-icon">🏫</div>
            <h3>Guarderias para mascotas</h3>
            <p>Encuentra opciones seguras y confiables para el cuidado de tus mascotas.</p>
          </div>
        </div>
      </section>

      <footer className="inicio-site-footer">
        <div className="inicio-container">
          <p>© 2025 MiMascota. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default inicio;