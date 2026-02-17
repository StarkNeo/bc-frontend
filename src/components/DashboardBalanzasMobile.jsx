import { React, useState, useEffect } from "react";
import './dashboardbalanzas.css';
import CargaBalanza from "./CargaBalanza";

const DashboardBalanzasMobile = ({ balanzas }) => {
    const [balanzasState, setBalanzasState] = useState([]);
    const [statusFilter, setStatusFilter] = useState("pendientes");

    useEffect(() => {
        setBalanzasState(balanzas.filter(b => b.pendiente));
        setStatusFilter("pendientes");
    }, [balanzas]);

    const handleStatusFilter = (e) => {
        const filter = e.target.value;
        if (filter === "pendientes") {
            setBalanzasState(balanzas.filter(b => b.pendiente));
            setStatusFilter("pendientes");
        } else if (filter === "procesadas") {
            setBalanzasState(balanzas.filter(b => !b.pendiente));
            setStatusFilter("procesadas");
        } else {
            setBalanzasState(balanzas);
            setStatusFilter("todas");
        }
    };


    return (
       
            <div>
                
                    {balanzasState.map((balanza) => (
                        <p className="balanza-card">
                            <span></span>

                            <span className={`badge ${balanza.pendiente ? "pendiente" : "procesada"}`}>
                                {balanza.pendiente ? "Pendiente" : "Procesada"}
                            </span>

                            <span>{balanza.rfc}</span>
                            <span>{balanza.nombre}</span>
                            <span>{balanza.mes}</span>
                            <span>{balanza.ejercicio}</span>

                            <span>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange="handleFileChange"
                                />
                            </span>

                            <span className="upload-icon" onClick="handleUpload">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2">
                                    <path d="M3 15a4 4 0 0 1 4-4h1a5 5 0 0 1 10 1h1a3 3 0 0 1 0 6H7" />
                                    <path d="M12 11v8" />
                                    <path d="M9 14l3-3 3 3" />
                                </svg>
                            </span>
                        </p>))}

                </div>
                
            


      
    );
}

export default DashboardBalanzasMobile;