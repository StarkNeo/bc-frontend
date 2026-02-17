import React from "react";
import { useState, useEffect } from "react";
import requests from "../services/requests";
import './cargaBalanza.css';
import { useOutletContext, useNavigate } from "react-router-dom";

const CargaBalanza = ({ rfc, nombre, mes, ejercicio, pendiente }) => {
    const [file, setFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    const { token } = useOutletContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(pendiente){
            setStatusMessage("Pendiente");

        }
        else{
            setStatusMessage("Procesada");
        }
    }, [pendiente]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setRowsInserted(null);
    };


    const handleUpload = async () => {
        if (!file) {
            setStatusMessage('Sin documento');
            setTimeout(() => {
                setStatusMessage("Fallo al subir");
            }, 2000);
            setTimeout(() => {
                setStatusMessage("Pendiente");
            }, 6000);
            return;

        }
        

        const formData = new FormData();
        formData.append('file', file);
        formData.append('ejercicio', ejercicio);
        formData.append('mes', mes);
        formData.append('rfc', rfc);

        try {
            setStatusMessage('Procesando...');
            const res = await requests.uploadExcel(formData, token);
            setStatusMessage(res.message);
            alert(`Archivo procesado. ${res.rows} filas insertadas.`);
            setTimeout(() => {
                setStatusMessage("Procesada");
            }, 2000);
            setFile(null);
            window.location.reload();
            navigate("/inicio");
        } catch (error) {
            console.log(error);
            setStatusMessage(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Error subiendo el archivo');
            setTimeout(() => {
                setStatusMessage("Pendiente");
            }, 3000);
        }

    };

    return (

        <tr>
            <td>
                <span className={`badge badge-${statusMessage === "Pendiente" ? "pendiente" : "procesada"}`}>{statusMessage}</span>
            </td>
            <td>{rfc}</td>
            <td>{nombre}</td>
            <td>{mes}</td>
            <td>{ejercicio}</td>
            {pendiente && (
                <>
                    <td>
                        <input
                            type="file"
                            id="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            
                        />
                    </td>
                    <td>
                        <svg onClick={handleUpload} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 15a4 4 0 0 1 4-4h1a5 5 0 0 1 10 1h1a3 3 0 0 1 0 6H7" />
                            <path d="M12 11v8" />
                            <path d="M9 14l3-3 3 3" />
                        </svg>
                    </td>
                </>
            )}
            


            {/* status && (
                    <p className="status-message">
                    {status} {rowsInserted != null && ` | Filas insertadas: ${rowsInserted}`}
                </p>*/}




        </tr>

    )


}

export default CargaBalanza;