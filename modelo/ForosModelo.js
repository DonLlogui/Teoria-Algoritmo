const dbService = require('./bd/Conexion');

class ForosModelo {

    // Crear un nuevo foro
    static async crearForo(idUsuario, titulo, contenido) {
        const query = 'INSERT INTO foros (idUsuario, titulo, contenido, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)';

        try {
            return await dbService.query(query, [idUsuario, titulo, contenido, new Date(), new Date()]);
        } catch (err) {
            throw new Error(`Error al crear el foro: ${err.message}`);
        }
    }
}
module.exports = ForosModelo; // Exporta la clase para ser utilizada en otros archivos