const dbService = require('./bd/Conexion');

class ReportesModelo {

    // Crear un nuevo reporte
    static async crearReporte(idUsuario, titulo, contenido) {
        const query = 'INSERT INTO reportes (idUsuario, titulo, contenido, createdAt) VALUES (?, ?, ?, ?)';

        try {
            return await dbService.query(query, [idUsuario, titulo, contenido, new Date()]);
        } catch (err) {
            throw new Error(`Error al crear el reporte: ${err.message}`);
        }
    }
}
module.exports = ReportesModelo; // Exporta la clase para ser utilizada en otros archivos