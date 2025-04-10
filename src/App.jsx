import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import AnimalesAdopcion from './pages/AnimalesAdopcion.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/animales-adopcion" element={<AnimalesAdopcion />} />
      </Routes>
    </Router>
  )
}

export default App;
