import '../styles/sobreNosotros.css';
import { useNavigate } from 'react-router-dom';

function SobreNosotros() {
    const navigate = useNavigate();
      const handleBack = () => {
        navigate (-1);
    }
    return (
        <div>
            <div className='sb-container'>
                <button className="sb-back-button" onClick={handleBack}>Regresar</button>
                <div className='sb-info-container'>
                    <h1>Sobre Nosotros</h1>
                    <p>
                        En <strong>MiMascota</strong>, creemos que cada animal merece un hogar lleno de amor. 
                        Nacimos con una misión clara: <em>acercar a las personas con mascotas que buscan una segunda oportunidad</em>, 
                        facilitando el proceso de adopción de manera sencilla, segura y humana.
                    </p>
                    <p>
                        Somos más que una software, somos una comunidad unida por el amor hacia los animales. 
                        Detrás de esta plataforma hay un equipo de estudiantes apasionados por la tecnología y comprometidos con el bienestar animal. 
                        Creamos MiMascota para que adoptar deje de ser complicado y se convierta en una experiencia hermosa e inolvidable.
                    </p>

                    <h2>Nuestra Misión</h2>
                    <p>
                        <strong>Fomentar la adopción responsable de mascotas</strong> a través de una herramienta digital que conecte hogares dispuestos a dar amor con animales que lo necesitan. 
                        Queremos ser el puente entre una vida mejor para ellos… y una vida más feliz para ti.
                    </p>

                    <h2>Nuestra Visión</h2>
                    <p>
                        Ser la plataforma de adopción de mascotas más confiable, empática y accesible, construyendo un futuro donde 
                        <strong> cada mascota tenga un hogar y cada persona encuentre a su compañero ideal</strong>.
                    </p>

                    <h2>¿Por qué elegir MiMascota?</h2>
                    <ul>
                        <li>Fácil de usar, desde cualquier dispositivo.</li>
                        <li>Información clara y actualizada sobre cada mascota.</li>
                        <li>Diseñado con cariño, para ti… y para ellos.</li>
                        <li>Porque adoptar cambia vidas, empezando por la tuya.</li>
                    </ul>

                    <p><strong>Gracias por estar aquí. Gracias por elegir adoptar. En MiMascota, estás haciendo la diferencia.</strong></p>
                </div>
            </div>
        </div>
    );
}

export default SobreNosotros;
