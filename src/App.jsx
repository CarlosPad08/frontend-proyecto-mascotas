import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InfoPet from './components/InfoPet.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import AnimalesAdopcion from './pages/AnimalesAdopcion.jsx'
import Profile from './pages/Profile.jsx'
import RegisterPet from './components/RegisterPet.jsx'
import Inicio from './pages/Inicio.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info-pet" element={<InfoPet />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/animales-adopcion" element={<AnimalesAdopcion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register-pet" element={<RegisterPet />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </Router>
  )
}

export default App;
