const modelo = require('../modelo/UsuarioModelo');
const bcrypt = require('bcrypt');

class UsuariosControlador {
    // Crear un nuevo usuario
    static async crearUsuario(req, res) {
        try {
            const { documento, nombre, telefono, email, contrasena, terminos } = req.body;

            // Validar que todos los campos requeridos estén presentes
            if (!documento || !nombre || !telefono || !email || !contrasena) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }

            // Validar aceptación de términos y condiciones
            if (!terminos || terminos !== 'true') {
                return res.status(400).json({ error: 'Debe aceptar los términos y condiciones para registrarse' });
            }

            // Validar número de documento (8-10 dígitos numéricos)
            if (!/^\d{8,10}$/.test(documento)) {
                return res.status(400).json({ error: 'El número de documento debe contener entre 8 y 10 dígitos numéricos' });
            }

            // Validar nombre (solo letras, entre 3 y 100 caracteres)
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/.test(nombre)) {
                return res.status(400).json({ error: 'El nombre debe contener solo letras y tener entre 3 y 100 caracteres' });
            }

            // Validar email (formato válido, entre 8 y 200 caracteres)
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email) || email.length < 8 || email.length > 200) {
                return res.status(400).json({ error: 'El correo electrónico debe tener un formato válido y entre 8 y 200 caracteres' });
            }

            // Validar teléfono (exactamente 10 dígitos)
            if (!/^\d{10}$/.test(telefono)) {
                return res.status(400).json({ error: 'El número de teléfono debe contener exactamente 10 dígitos' });
            }

            // Validar contraseña (mín. 8 caracteres, mayúscula, minúscula, número y carácter especial)
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-#])[A-Za-z\d@$!%*?&_\-#]{8,}$/;
            if (!passwordRegex.test(contrasena)) {
                return res.status(400).json({
                    error: 'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales'
                });
            }

            // Verificar si el documento, email o teléfono ya existen en la base de datos
            const usuarioExistente = await modelo.verificarDuplicados(documento, telefono, email);

            if (usuarioExistente.documento) {
                return res.status(400).json({ error: 'El número de documento ya está registrado, intente recuperar su cuenta si la olvidó.' });
            }

            if (usuarioExistente.email) {
                return res.status(400).json({ error: 'El correo electrónico ya está registrado, intente recuperar su cuenta si la olvidó.' });
            }

            if (usuarioExistente.telefono) {
                return res.status(400).json({ error: 'El número de teléfono ya está registrado, intente recuperar su cuenta si la olvidó.' });
            }

            // Si pasa todas las validaciones, crear el usuario
            const result = await modelo.crearUsuarios(documento, nombre, telefono, email, contrasena, terminos);

            res.status(201).json({
                mensaje: 'Usuario administrador creado con éxito',
                id: result.insertId
            });

        } catch (err) {
            console.error('Error en el controlador:', err);
            res.status(500).json({ error: 'Hubo un error al crear el usuario. Por favor, inténtelo de nuevo.' });
        }
    }

    static async iniciarSesion(req, res) {
        try {
            const { email, contrasena } = req.body;

            // Validar campos
            if (!email || !contrasena) {
                return res.status(400).json({ error: 'El correo y la contraseña son obligatorios' });
            }

            // Buscar usuario por correo
            const usuario = await modelo.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            }

            // Verificar la contraseña
            const contraseñaValida = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!contraseñaValida) {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            }

            // Opcional: Verificar estado del usuario
            if (usuario.estado !== 'Activo') {
                return res.status(403).json({ error: 'El usuario no está activo' });
            }

            // Éxito
            res.status(200).json({
                mensaje: 'Inicio de sesión exitoso',
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombres,
                    email: usuario.correo,
                    rol: usuario.rol
                }
            });

        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}

module.exports = UsuariosControlador; // Exporta la clase para ser utilizada en otros archivos
