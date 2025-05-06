import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import AnimalesAdopcion from './pages/AnimalesAdopcion.jsx';
import Profile from './pages/Profile.jsx';
import RegisterPet from './components/RegisterPet.jsx';
import Inicio from './pages/Inicio.jsx';
import RespuestaSolicitud from './pages/RespuestaSolicitud.jsx'; // ✅ nueva página
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/animales-adopcion" element={<AnimalesAdopcion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register-pet" element={<RegisterPet />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/respuesta-solicitud" element={<RespuestaSolicitud />} /> {/* ✅ nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
