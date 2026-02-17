import { Link } from "react-router-dom";
import requests from "../services/requests";
import { useState, useEffect, use } from "react";
import StatusBalanzas from "../components/StatusBalanzas";
import "./inicio.css";

export default function Inicio() {
  const [balanzasPending, setBalanzasPending] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      requests.getUserStatus(token).then(data => {
        setUserName(data.user);
      }).catch(error => {
        console.error("Error obteniendo estado de autenticación:", error);
      });
    } else {
      console.warn("No se encontró token en localStorage");
    } 
  }, []);

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
        <h1>Bienvenido {userName}</h1>
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
        <StatusBalanzas balanzas={balanzasPending} />
      </section>

      <section className="dashboard-section">
        <Link to="/carga" className="menu-card">
          <h3>Cargar Balanzas</h3>
          <p>Sube archivos Excel y procesa información contable</p>
        </Link>
      </section>

    </div>
  );
}