import { useState } from "react";
import requests from "../services/requests";
import "./cargaDeclaraciones.css";

const CargaDeclaraciones = ({ token }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const addFilesToState = (e) => {
        // add file to selectedFiles state
        setSelectedFiles([...selectedFiles, ...e.target.files]);
    }

    const removeFileFromState = (file) => {
        setSelectedFiles(selectedFiles.filter(f => f !== file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append("file", file);
            });

            const response = await requests.uploadCumplimientoFile(formData, token)
            alert("File upload response: " + response.data.message);
            setSelectedFiles([]); // Clear selected files after upload
            setTimeout(() => {
                window.location.reload(); // Refresh the page to show updated data after upload
            }, 2000);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file: " + (error.response?.data?.error || error.message));
        }


    }

    return (
        <div className="upload-container">
            <h3>Actualizar cumplimiento</h3>
                
            <form onSubmit={handleSubmit} className="upload-form">
                <label className="file-input-label">
                    Seleccionar archivos PDF
                    <input
                        type="file"
                        multiple
                        onChange={addFilesToState}
                        accept=".pdf"
                        className="file-input"
                    />
                </label>

                <button type="submit" className="upload-btn">
                    Subir
                </button>
            </form>

            <div className="selected-files">
                <h3>Archivos seleccionados</h3>
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li key={index} className="file-item">
                            <span>{file.name}</span>
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => removeFileFromState(file)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
export default CargaDeclaraciones;