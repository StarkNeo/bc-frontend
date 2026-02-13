import { useState, useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import requests from "../services/requests";
import './verify2fa.css';

export default function Verify2FA() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const {setToken} = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  
  useEffect(() => {
      if(!userId){
          navigate("/login");
          return;
      }
  }, [userId, navigate]);


  
  const handleVerify = async () => {
    try {
      const res = await requests.verify2FA(userId, code);
       
      localStorage.setItem("token", res.token);
      setToken(res.token);

      navigate("/inicio");
    } catch (err) {
      setError(err.response?.data?.message || "Código incorrecto");
    }
  };

  return (
    <div className="mfa-container">
      <h1 className="mfa-title">Verificación MFA</h1>
      <div className="mfa-form">
      <label>Código de autenticación</label>
      <input
        type="text"
        onChange={e => setCode(e.target.value)}
        placeholder="123456"
        className="mfa-input"

      />
      </div>
      

      <button className="mfa-btn" onClick={handleVerify}>
        Verificar
      </button>

      {error && <p className="mfa-error">{error}</p>}
    </div>
  );
}