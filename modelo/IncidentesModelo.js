const dbService = require('./bd/Conexion');

class IncidentesModelo {

    // Crear un nuevo incidente
    static async crearIncidente(idUsuario, titulo, descripcion, adminId, gestionRealizada, fechaGestion) {
        const query = 'INSERT INTO incidentes (idUsuario, titulo, descripcion, estado, adminId, gestionRealizada, fechaGestion, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        try {
            return await dbService.query(query, [idUsuario, titulo, descripcion, "Revisión", adminId, gestionRealizada, fechaGestion, new Date, new Date()]);
        } catch (err) {
            throw new Error(`Error al crear el Incidente: ${err.message}`);
        }
    }
}
module.exports = IncidentesModelo; // Exporta la clase para ser utilizada en otros archivos