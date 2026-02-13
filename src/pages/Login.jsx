import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import requests from "../services/requests";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserId } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await requests.login(email, password);
      setUserId(res.data.userId);
      if (res.data.userId && res.data.requiresPasswordReset) {
        navigate("/reset-password", { state: { userId: res.data.userId, email: email } });
        return;
      }

      if (res.data.requires2FASetup) {
        navigate("/setup-2fa", { state: { userId: res.data.userId } });
        return;
      }
      else if (res.data.requires2FA) {
        navigate("/verificar", { state: { userId: res.data.userId } });
        return;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-brand">
        <h1>Fiscal Suite</h1>
        <p>La plataforma inteligente para el control y gestión fiscal-contable.</p>
      </div>

      <div className="auth-form-wrapper">
        <form className="auth-form">
          <h2>Iniciar sesión</h2>

          <input
            type="email"
            className="auth-input"
            placeholder="correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="button" className="auth-btn" onClick={handleLogin} value="Acceder" />
        </form>
        {error && <p className="status-message">{error}</p>}
      </div>





    </div>
  );
}