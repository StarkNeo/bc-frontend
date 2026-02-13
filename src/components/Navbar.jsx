import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logout from "../pages/Logout";



export default function Navbar({ token, setToken, setUserId }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="nav">
      <h2 className="logo">Fiscal Suite</h2>

      {/* Ícono hamburguesa */}
      {token && (
        <div className="burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {/* Links desktop */}
      {token && (
        <ul className="nav-links desktop">
          <li><NavLink to="/inicio">Inicio</NavLink></li>
          <li><NavLink to="/carga">Carga</NavLink></li>
          <li><Logout token={token} setToken={setToken} setUserId={setUserId} /></li>
        </ul>
      )}

      {/* Menú móvil */}
      {token && (
        <ul className={`nav-links mobile ${isOpen ? "open" : ""}`}>
          <li><NavLink to="/inicio" onClick={toggleMenu}>Inicio</NavLink></li>
          <li><NavLink to="/carga" onClick={toggleMenu}>Carga</NavLink></li>
          <li><Logout token={token} setToken={setToken} setUserId={setUserId} /></li>
        </ul>
      )}
    </nav>

  );
}