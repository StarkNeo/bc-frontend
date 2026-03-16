import { React, useState, useEffect } from "react";
import './dashboardbalanzas.css';
import CargaBalanza from "./CargaBalanza";

const DashboardBalanzas = ({ balanzas }) => {
    const [balanzasState, setBalanzasState] = useState([]);
    const [statusFilter, setStatusFilter] = useState("pendientes");
    const [razonFilter, setRazonFilter] = useState("");
    const [mesFilter, setMesFilter] = useState("");
    const [ejercicioFilter, setEjercicioFilter] = useState("");


    
    
    useEffect(() => {
        setBalanzasState(balanzas.filter(b => b.pendiente));
        setStatusFilter("pendientes");

    }, [balanzas]);

    const handleFilter=()=>{
        setBalanzasState(balanzas.filter(b => {
            // Aplicar filtros combinados
            return ((statusFilter === "todas" || (statusFilter === "pendientes" && b.pendiente) || (statusFilter === "procesadas" && !b.pendiente)) &&
                (razonFilter === "" || b.nombre === razonFilter) &&
                (mesFilter === "" || b.mes.toString() === mesFilter) &&
                (ejercicioFilter === "" || b.ejercicio.toString() === ejercicioFilter)
            );
            
              
        }));
    }

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
        
    };

    const handleRazonFilter = (e) => {
        setRazonFilter(e.target.value);
        
    };

    const handleMesFilter = (e) => {
        setMesFilter(e.target.value);
        
    };

    const handleEjercicioFilter = (e) => {
        setEjercicioFilter(e.target.value);
        
    };


    // Extract unique values for dropdowns
    const uniqueMeses = [...new Set(balanzasState.map(item => item.mes))].sort((a, b) => a-b);
    const uniqueEjercicios = [...new Set(balanzasState.map(item => item.ejercicio))].sort((a, b) => b-a);
    const uniqueRazones = [...new Set(balanzasState.map(item => item.nombre))].sort();


    return (
        <div id="panel-balanzas" className="balanzas-panel">
            {/* BALANZAS PENDIENTES */}
            <div className="balanza-card">
                  <h3>Carga de Balanzas de Comprobacion</h3>
                <div className="balanza-card-header">
                  
                    <label className="badge badge-pendiente" onClick={handleFilter}>Filtrar</label>
                    <select className="status-select" name="status" id="status" onChange={handleStatusFilter}>
                        <option value="pendientes">Pendientes</option>
                        <option value="procesadas">Procesadas</option>
                        <option value="todas">Todas</option>
                    </select>

                    <select className="status-select" value={razonFilter} onChange={handleRazonFilter}>
                        <option value="">Razón Social</option>

                        {uniqueRazones.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>

                    <select className="status-select" value={mesFilter} onChange={handleMesFilter}>
                        <option value="">Mes</option>
                        {uniqueMeses.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>

                    <select className="status-select"
                        value={ejercicioFilter}
                        onChange={handleEjercicioFilter}
                    >
                        <option value="">Ejercicio</option>
                        {uniqueEjercicios.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>

                <table className="balanza-table">
                    <thead>
                        {statusFilter === "pendientes" || statusFilter === "todas" ? (
                            <tr>
                                <th>Status</th>
                                <th>RFC</th>
                                <th>Nombre</th>
                                <th>Mes</th>
                                <th>Ejercicio</th>
                                <th colSpan={2}>Desactive la casilla si no existe balanza</th>
                                <th> </th>
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