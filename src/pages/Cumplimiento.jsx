import React, { useEffect } from 'react'
import { useState } from 'react'
import { useOutletContext } from 'react-router'
import requests from '../services/requests'
import CargaDeclaraciones from '../components/CargaDeclaraciones'
import './cumplimiento.css'

const Cumplimiento = () => {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [razonFilter, setRazonFilter] = useState("");
    const [mesFilter, setMesFilter] = useState("");
    const [ejercicioFilter, setEjercicioFilter] = useState("");
    const token = useOutletContext();
    
    
    useEffect(() => {
        requests.getCumplimientoData()
            .then(json => {
                setData(json);
                setFiltered(json);
            });
            
    }, []);
    // Apply filters
    useEffect(() => {
        let result = data;

        if (razonFilter) {
            result = result.filter(item =>
                item.razon_social.toLowerCase().includes(razonFilter.toLowerCase())
            );
        }

        if (mesFilter) {
            result = result.filter(item => item.mes === mesFilter);
        }

        if (ejercicioFilter) {
            result = result.filter(item => item.ejercicio === Number(ejercicioFilter));
        }

        setFiltered(result);
    }, [razonFilter, mesFilter, ejercicioFilter, data]);

    // Extract unique values for dropdowns
    const uniqueMeses = [...new Set(data.map(item => item.mes))];
    const uniqueEjercicios = [...new Set(data.map(item => item.ejercicio))];
    const uniqueRazones = [...new Set(data.map(item => item.razon_social))];

    return (
        <div style={{ padding: "2rem" }}>
            <CargaDeclaraciones token={token} />
            <h2>Control de cumplimiento</h2>

            {/* Filters */}
            <div className="filters">
                
                <select value={razonFilter} onChange={e => setRazonFilter(e.target.value)}>
                    <option value="">Razón Social</option>
                    {uniqueRazones.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <select value={mesFilter} onChange={e => setMesFilter(e.target.value)}>
                    <option value="">Mes</option>
                    {uniqueMeses.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <select
                    value={ejercicioFilter}
                    onChange={e => setEjercicioFilter(e.target.value)}
                >
                    <option value="">Ejercicio</option>
                    {uniqueEjercicios.map(e => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="fs-table">
                    <thead>
                        <tr>
                            <th>Razon Social</th>
                            <th>Tipo</th>
                            <th>Mes</th>
                            <th>Ejercicio</th>
                            <th>Impuesto</th>
                            <th>Fecha Presentacion</th>
                            <th>A Favor</th>
                            <th>A Cargo</th>
                            <th>Actualizacion</th>
                            <th>Recargos</th>
                            <th>Subsidio al empleo</th>
                            <th>Compensaciones</th>
                            <th>Cantidad a Pagar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.razon_social}</td>
                                <td>{item.tipo_declaracion}</td>
                                <td>{item.mes}</td>
                                <td>{item.ejercicio}</td>
                                <td>{item.nombre}</td>
                                <td>{item.to_char}</td>
                                <td>{item.a_favor}</td>
                                <td>{item.a_cargo}</td>
                                <td>{item.actualizacion}</td>
                                <td>{item.recargos}</td>
                                <td>{item.subsidio_al_empleo}</td>
                                <td>{item.compensaciones}</td>
                                <td>{item.cantidad_a_pagar? item.cantidad_a_pagar:0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Cumplimiento
