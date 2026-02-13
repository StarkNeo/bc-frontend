import React from "react";
import './statusbalanzas.css';
const StatusBalanzas = ({ balanzas }) => {
    const balanzasPendientes = balanzas.filter(b => b.pendiente);
    const balanzasProcesadas = balanzas.filter(b => !b.pendiente);

    return (
        <div id="panel-balanzas" className="balanzas-panel">

            {/* BALANZAS PENDIENTES */}
            <div className="balanza-card">
                <div className="balanza-card-header">
                    <h3>Balanzas pendientes</h3>
                    <span className="badge badge-pendiente">Pendientes</span>
                </div>

                <table className="balanza-table">
                    <thead>
                        <tr>
                            <th>RFC</th>
                            <th>Mes</th>
                            <th>Ejercicio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balanzasPendientes.map((balanza) => (
                            <tr key={balanza.id}>
                                <td>{balanza.rfc}</td>
                                <td>{balanza.nombre}</td>
                                <td>{balanza.mes}</td>
                                <td>{balanza.ejercicio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* BALANZAS PROCESADAS */}
            <div className="balanza-card">
                <div className="balanza-card-header">
                    <h3>Balanzas procesadas</h3>
                    <span className="badge badge-procesada">Procesadas</span>
                </div>

                <table className="balanza-table">
                    <thead>
                        <tr>
                            <th>RFC</th>
                            <th>Mes</th>
                            <th>Ejercicio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balanzasProcesadas.map((balanza) => (
                            <tr key={balanza.id}>
                                <td>{balanza.rfc}</td>
                                <td>{balanza.nombre}</td>
                                <td>{balanza.mes}</td>
                                <td>{balanza.ejercicio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default StatusBalanzas;