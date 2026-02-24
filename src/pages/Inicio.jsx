import { Link } from "react-router-dom";
import requests from "../services/requests";
import { useState, useEffect } from "react";
import DashboardBalanzas from "../components/DashboardBalanzas";
import DashboardBalanzasMobile from "../components/DashboardBalanzasMobile";
import { useNavigate, useLocation } from "react-router-dom";
import "./inicio.css";

export default function Inicio() {
  const location = useLocation();
  const [balanzasPending, setBalanzasPending] = useState([]);
  //const [userName, setUserName] = useState(null);
  const nombre = location.state?.nombre || localStorage.getItem("nombre") || "Usuario";
  

  useEffect(() => {
    requests.getBalanzasPending().then(data => {
      setBalanzasPending(data);
    }).catch(error => {
      console.error("Error obteniendo balanzas pendientes:", error);
    });
  }, []);


  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1>Bienvenido {nombre}</h1>
        <p className="dashboard-date">
          Hoy: {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </header>

      <section className="dashboard-section">
        <DashboardBalanzas balanzas={balanzasPending} />
      </section>

      

    </div>
  );
}