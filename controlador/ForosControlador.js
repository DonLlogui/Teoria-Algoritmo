const forosModelo = require('../modelo/ForosModelo');

class ForosControlador {

    // Crear un nuevo foro
    static async crearForo(req, res) {
        const { documento: idUsuario, titulo: titulo, contenido: contenido } = req.body;
        try {
            const result = await forosModelo.crearForo(idUsuario, titulo, contenido);
            res.status(201).json({ mensaje: 'Foro creado correctamente.', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Hubo un error al crear el Foro.' });
        }
    }
}
module.exports = ForosControlador; // Exporta la clase para ser utilizada en otros archivos  
