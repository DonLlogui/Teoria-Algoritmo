const eventosModelo = require('../modelo/EventosModelo');

class EventosControlador {

    // Crear un nuevo evento
    static async crearEvento(req, res) {
        const { documento: idUsuario, nombre: nombre, descripcion: descripcion, fecha: fechaEvento } = req.body;
        try {
            const result = await eventosModelo.crearEvento(idUsuario, nombre, descripcion, fechaEvento);
            res.status(201).json({ mensaje: 'Evento creado correctamente.', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Hubo un error al crear el Evento.' });
        }
    }
}
module.exports = EventosControlador; // Exporta la clase para ser utilizada en otros archivos  
