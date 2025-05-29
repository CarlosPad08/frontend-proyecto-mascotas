import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import AnimalesAdopcion from './pages/AnimalesAdopcion.jsx';
import Inicio from './pages/Inicio.jsx';
import SignUpRefugio from './pages/SignUpRefugio.jsx';
import DashboardRefugio from './pages/DashboardRefugio.jsx';
import NotFound from './pages/NotFound.jsx';
import SobreNosotros from './pages/SobreNosotros.jsx';
import Profile from './pages/Profile.jsx'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/animales-adopcion" element={<AnimalesAdopcion />} />
        <Route path="/signup-refugio" element={<SignUpRefugio />} />
        <Route path="/dashboard-refugio" element={<DashboardRefugio />} />
        <Route path="/error-404" element={<NotFound/>} />
        <Route path="/sobre-nosotros" element={<SobreNosotros/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
