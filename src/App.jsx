import React, { useState } from "react";
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import "./styles/login.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app-container">
      <div className={showLogin ? "blur-background" : ""}>
        <Principal onLoginClick={() => setShowLogin(true)} />
      </div>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;
