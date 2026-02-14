const sanitizedValue = (input) => {
        // Eliminar caracteres no deseados (solo permitir letras, números y espacios)
        let sanitized = input.replace(/[^a-zA-Z0-9\s@._-]/g, '');
        // Eliminar espacios al inicio y al final
        sanitized = sanitized.trim();
        //Eliminar espacios duplicados
        sanitized = sanitized.replace(/\s+/g, ' ');
        //Evita tags HTML
        sanitized = sanitized.replace(/<[^>]*>?/gm, '');

        return sanitized;
};

export default sanitizedValue;
