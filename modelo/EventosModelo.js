const dbService = require('./bd/Conexion');

class EventosModelo {

    // Crear un nuevo reporte
    static async crearEvento(idUsuario, nombre, descripcion, fechaEvento) {
        const query = 'INSERT INTO eventos (idUsuario, nombre, descripcion, fechaEvento, createdAt) VALUES (?, ?, ?, ?, ?)';

        try {
            return await dbService.query(query, [idUsuario, nombre, descripcion, fechaEvento, new Date()]);
        } catch (err) {
            throw new Error(`Error al crear el evento: ${err.message}`);
        }
    }
}
module.exports = EventosModelo; // Exporta la clase para ser utilizada en otros archivos