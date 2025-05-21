const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class UsuarioModelo {

    // Verificar si ya existen usuarios con el mismo documento, teléfono o email
    static async verificarDuplicados(documento, telefono, email) {
        const resultado = {
            documento: false,
            telefono: false,
            email: false
        };

        try {
            // Verificar documento duplicado
            const docQuery = 'SELECT COUNT(*) as count FROM usuarios WHERE documento = ?';
            const docResult = await dbService.query(docQuery, [documento]);
            if (docResult[0].count > 0) {
                resultado.documento = true;
            }

            // Verificar email duplicado
            const emailQuery = 'SELECT COUNT(*) as count FROM usuarios WHERE correo = ?';
            const emailResult = await dbService.query(emailQuery, [email]);
            if (emailResult[0].count > 0) {
                resultado.email = true;
            }

            // Verificar teléfono duplicado
            const telQuery = 'SELECT COUNT(*) as count FROM usuarios WHERE telefono = ?';
            const telResult = await dbService.query(telQuery, [telefono]);
            if (telResult[0].count > 0) {
                resultado.telefono = true;
            }

            return resultado;
        } catch (err) {
            throw new Error(`Error al verificar duplicados: ${err.message}`);
        }
    }

    // Crear un nuevo usuario
    static async crearUsuarios(documento, nombre, telefono, email, contrasena, terminos) {
        const query = 'INSERT INTO usuarios (documento, nombres, telefono, correo, contrasena, rol, estado, terminos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        try {
            // Generar el hash de la contraseña con bcrypt
            const salto = 10; // Nivel de seguridad de encriptación
            const contraHash = await bcrypt.hash(contrasena, salto);

            return await dbService.query(query, [
                documento,
                nombre,
                telefono,
                email,
                contraHash,
                "Administrador",
                "Activo",
                terminos
            ]);
        } catch (err) {
            throw new Error(`Error al crear el usuario: ${err.message}`);
        }
    }

    // Buscar usuario por email
    static async buscarPorEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE correo = ?';

        try {
            const resultado = await dbService.query(query, [email]);
            return resultado.length > 0 ? resultado[0] : null;
        } catch (err) {
            throw new Error(`Error al buscar el usuario por correo: ${err.message}`);
        }
    }
}

module.exports = UsuarioModelo; // Exporta la clase para ser utilizada en otros archivos
