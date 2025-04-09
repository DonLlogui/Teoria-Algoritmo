const modelo = require('../modelo/UsuarioModelo');

class UsuariosControlador {

    // Crear un nuevo usuario
    static async crearUsuario(req, res) {
        const { documento: doc, nombre: name, telefono: tel, email: email, contrasena: contra } = req.body;
        try {
            const result = await modelo.crearUsuarios(doc, name, tel, email, contra);
            res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Hubo un error al crear el usuario' });
        }
    }
}
module.exports = UsuariosControlador; // Exporta la clase para ser utilizada en otros archivos  
