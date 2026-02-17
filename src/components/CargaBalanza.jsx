import React from "react";
import { useState, useEffect } from "react";
import requests from "../services/requests";
import './cargaBalanza.css';
import { sanitizedValue } from "../services/sanitizeInput";
import { useOutletContext, useNavigate } from "react-router-dom";

const CargaBalanza = ({ rfc, nombre, mes, ejercicio }) => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [rowsInserted, setRowsInserted] = useState(null);
    const { token } = useOutletContext();
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setStatus('');
        setRowsInserted(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Selecciona un archivo primero');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('ejercicio', ejercicio);
        formData.append('mes', mes);
        formData.append('rfc', rfc);

        try {
            setStatus('Subiendo y procesando...');
            const res = await requests.uploadExcel(formData, token);
            setStatus(res.message);
            setRowsInserted(res.rows);
            alert(`Archivo procesado. ${res.rows} filas insertadas.`);
            navigate("/inicio");
        } catch (error) {
            setStatus(error);
            setStatus(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Error subiendo el archivo');
        }
    };

    return (

        <div className="upload-container">
            <div className="upload-form">
                <tr>
                    <td>{rfc}</td>
                    <td>{nombre}</td>
                    <td>{mes}</td>
                    <td>{ejercicio}</td>
                    <td>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 15a4 4 0 0 1 4-4h1a5 5 0 0 1 10 1h1a3 3 0 0 1 0 6H7" />
                            <path d="M12 11v8" />
                            <path d="M9 14l3-3 3 3" />
                        </svg>
                    </td>
                </tr>
                <div className="form-group">
                    <label htmlFor="file">Archivo Excel</label>
                    <input
                        type="file"
                        id="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                    />
                </div>


                <button className="upload-btn" onClick={handleUpload}>
                    Subir y procesar
                </button>
                {status && (
                    <p className="status-message">
                        {status} {rowsInserted != null && ` | Filas insertadas: ${rowsInserted}`}
                    </p>
                )}

            </div>
        </div>

    );
}

export default CargaBalanza;