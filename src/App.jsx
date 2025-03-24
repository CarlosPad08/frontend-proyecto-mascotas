import React, { useState } from "react";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/register.css";
import "./styles/login.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app-container">
      <div className={showLogin || showRegister ? "blur-background" : ""}>
        <Principal onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
      </div>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default App;
