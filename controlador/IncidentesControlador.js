const incidentesModelo = require('../modelo/IncidentesModelo');

class IncidentesControlador {

    // Crear un nuevo incidente
    static async crearIncidente(req, res) {
        const { documento: idUsuario, titulo: titulo, descripcion: descripcion, gestionadoPor: adminId, gestionRealizada: gestionRealizada, fechaGestion: fechaGestion } = req.body;
        try {
            const result = await incidentesModelo.crearIncidente(idUsuario, titulo, descripcion, adminId, gestionRealizada, fechaGestion);
            res.status(201).json({ mensaje: 'Incidente creado correctamente.', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Hubo un error al crear el Incidente.' });
        }
    }
}
module.exports = IncidentesControlador; // Exporta la clase para ser utilizada en otros archivos  
