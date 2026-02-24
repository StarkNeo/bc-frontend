import {React, useState, useEffect } from "react";
import './dashboardbalanzas.css';
import CargaBalanza from "./CargaBalanza";

const DashboardBalanzas = ({ balanzas }) => {
    const [balanzasState, setBalanzasState] = useState([]);
    const [statusFilter, setStatusFilter] = useState("pendientes");

    useEffect(() => {        
        setBalanzasState(balanzas.filter(b=>b.pendiente));
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
        <div id="panel-balanzas" className="balanzas-panel">           
            {/* BALANZAS PENDIENTES */}
            <div className="balanza-card">
                <div className="balanza-card-header">
                    <h3>Balanzas</h3>
                    <label className="badge badge-pendiente">Filtrar</label>
                    <select className="status-select" name="status" id="status" onChange={handleStatusFilter}>
                        
                        <option value="pendientes">Pendientes</option>
                        <option value="procesadas">Procesadas</option>
                        <option value="todas">Todas</option>
                    </select>
                </div>

                <table className="balanza-table">
                    <thead>
                        {statusFilter === "pendientes" || statusFilter === "todas"?(
                            <tr>
                                <th>Status</th>
                                <th>RFC</th>
                                <th>Nombre</th>
                                <th>Mes</th>
                                <th>Ejercicio</th>
                                <th>Cargar Documento</th>
                                <th></th>
                            </tr>
                        ) : (
                            <tr>
                            <th>Status</th>
                            <th>RFC</th>
                            <th>Nombre</th>
                            <th>Mes</th>
                            <th>Ejercicio</th>
                           
                        </tr>
                        )}
                        
                    </thead>
                    <tbody>
                        {balanzasState.map((balanza) => (                                
                                    <CargaBalanza
                                        key={balanza.id}
                                        rfc={balanza.rfc}
                                        nombre={balanza.nombre}
                                        mes={balanza.mes}
                                        ejercicio={balanza.ejercicio}
                                        id={balanza.id}
                                        pendiente={balanza.pendiente}
                                    />
                        ))}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default DashboardBalanzas;