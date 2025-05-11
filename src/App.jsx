import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import AnimalesAdopcion from './pages/AnimalesAdopcion.jsx';
import Inicio from './pages/Inicio.jsx';
import SignUpRefugio from './pages/SignUpRefugio.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/animales-adopcion" element={<AnimalesAdopcion />} />
        <Route path="/signup-refugio" element={<SignUpRefugio />} />
      </Routes>
    </Router>
  );
}

export default App;
