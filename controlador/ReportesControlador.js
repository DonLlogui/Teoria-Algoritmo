const reportesModelo = require('../modelo/ReportesModelo');

class ReportesControlador {

    // Crear un nuevo reporte
    static async crearReporte(req, res) {
        const { documento: idUsuario, titulo: titulo, contenido: contenido } = req.body;
        try {
            const result = await reportesModelo.crearReporte(idUsuario, titulo, contenido);
            res.status(201).json({ mensaje: 'Reporte creado correctamente.', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Hubo un error al crear el Reporte.' });
        }
    }
}
module.exports = ReportesControlador; // Exporta la clase para ser utilizada en otros archivos  
