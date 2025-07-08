const modelo = require('../../modelo/UsuarioModelo');
const { enviarCorreoBienvenida } = require('../../services/mailer');
const { enviarCorreoEdicionPerfil } = require('../../services/mailer');
const { enviarCorreoInactivarCuenta } = require('../../services/mailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UsuariosControlador {
    // Crear un nuevo usuario
    static async crearUsuario(req, res) {
        try {
            const { documento, nombre, telefono, email, contrasena, terminos } = req.body;

            if (!documento || !nombre || !telefono || !email || !contrasena) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }

            if (!terminos || terminos !== 'true') {
                return res.status(400).json({ error: 'Debe aceptar los términos y condiciones para registrarse' });
            }

            if (!/^\d{8,10}$/.test(documento)) {
                return res.status(400).json({ error: 'El número de documento debe contener entre 8 y 10 dígitos numéricos' });
            }

            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/.test(nombre)) {
                return res.status(400).json({ error: 'El nombre debe contener solo letras y tener entre 3 y 100 caracteres' });
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email) || email.length < 8 || email.length > 200) {
                return res.status(400).json({ error: 'El correo electrónico debe tener un formato válido y entre 8 y 200 caracteres' });
            }

            if (!/^\d{10}$/.test(telefono)) {
                return res.status(400).json({ error: 'El número de teléfono debe contener exactamente 10 dígitos' });
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-#])[A-Za-z\d@$!%*?&_\-#]{8,}$/;
            if (!passwordRegex.test(contrasena)) {
                return res.status(400).json({
                    error: 'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales'
                });
            }

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

            const result = await modelo.crearUsuarios(documento, nombre, telefono, email, contrasena, terminos);

            await enviarCorreoBienvenida(email, nombre);

            res.status(201).json({
                mensaje: 'Usuario administrador creado con éxito',
                id: result.insertId
            });

        } catch (err) {
            console.error('Error en el controlador:', err);
            res.status(500).json({ error: 'Hubo un error al crear el usuario. Por favor, inténtelo de nuevo.' });
        }
    }

    // Iniciar sesión
    static async iniciarSesion(req, res) {
        try {
            const { email, contrasena } = req.body;

            if (!email || !contrasena) {
                return res.status(400).json({ error: 'El correo y la contraseña son obligatorios' });
            }

            const resultado = await modelo.verificarLogin(email, contrasena);

            if (!resultado.exito) {
                return res.status(401).json({ error: resultado.mensaje });
            }

            const usuario = resultado.usuario;

            if (usuario.estado !== 'Activo') {
                return res.status(403).json({ error: 'El usuario no está activo' });
            }

            if (usuario.rol !== 'Administrador') {
                return res.status(401).json({ error: 'El usuario no cuenta con los permisos para iniciar sesión.' });
            }

            const llave = jwt.sign(
                {
                    idUsuario: usuario.idUsuario,
                    nombres: usuario.nombres,
                    rol: usuario.rol,
                    correo: usuario.correo
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            await modelo.guardarToken({
                idUsuario: usuario.idUsuario,
                nombres: usuario.nombres,
                rol: usuario.rol,
                correo: usuario.correo,
                llave
            });

            res.status(200).json({
                mensaje: 'Inicio de sesión exitoso',
                token: llave,
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

    static async cerrarSesion(req, res) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Token no proporcionado o inválido' });
            }

            const token = authHeader.split(' ')[1];

            await modelo.eliminarToken(token);

            res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).json({ error: 'Error al cerrar sesión' });
        }
    }

    static async inactivarCuenta(req, res) {
        try {
            const { email, contrasena } = req.body;

            if (!email || !contrasena) {
                return res.status(400).json({ error: 'El correo y la contraseña son obligatorios' });
            }

            const resultado = await modelo.verificarLogin(email, contrasena);

            if (!resultado.exito) {
                return res.status(401).json({ error: resultado.mensaje });
            }

            const usuario = resultado.usuario;

            if (usuario.estado === 'Inactivo') {
                return res.status(400).json({ error: 'El usuario ya está inactivo' });
            }

            await modelo.inactivarUsuario(email);

            await enviarCorreoInactivarCuenta(usuario.correo, usuario.nombres);

            res.status(200).json({ mensaje: 'Cuenta desactivada correctamente' });
        } catch (err) {
            console.error('Error al desactivar la cuenta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async reactivarCuenta(req, res) {
        try {
            const { email, contrasena } = req.body;

            if (!email || !contrasena) {
                return res.status(400).json({ error: 'El correo y la contraseña son obligatorios' });
            }

            const resultado = await modelo.verificarLogin(email, contrasena);

            if (!resultado.exito) {
                return res.status(401).json({ error: resultado.mensaje });
            }

            const usuario = resultado.usuario;

            if (usuario.estado === 'Activo') {
                return res.status(400).json({ error: 'El usuario ya está activo' });
            }

            await modelo.reactivarUsuario(email);

            res.status(200).json({ mensaje: 'Cuenta reactivada correctamente' });
        } catch (err) {
            console.error('Error al reactivar la cuenta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // ✅ Editar perfil usando el ID desde el token
    static async editarPerfil(req, res) {
        try {
            const { idUsuario } = req.usuario; // viene del token decodificado
            const datos = req.body;

            if (!idUsuario || Object.keys(datos).length === 0) {
                return res.status(400).json({ error: 'Datos incompletos para actualizar el perfil' });
            }

            const resultado = await modelo.editarPerfil(idUsuario, datos);

            await enviarCorreoEdicionPerfil(datos.correo, datos.nombre);

            res.status(200).json({ mensaje: resultado.mensaje });
        } catch (error) {
            console.error('Error al editar el perfil:', error);
            res.status(500).json({ error: 'No se pudo actualizar el perfil' });
        }
    }

    static async recuperarContrasena(req, res) {
        try {
            const { correo, idPregunta, respuesta, nuevaContrasena } = req.body;

            if (!correo || !idPregunta || !respuesta || !nuevaContrasena) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios: correo, idPregunta, respuesta y nueva contraseña.' });
            }

            // Buscar usuario por correo
            const usuarioResult = await modelo.obtenerUsuarioPorCorreo(correo);

            if (!usuarioResult) {
                return res.status(404).json({ error: 'Correo no registrado' });
            }

            const idUsuario = usuarioResult.idUsuario;

            // Validar la respuesta a la pregunta específica
            const pregunta = await modelo.obtenerPreguntaUsuario(idUsuario, idPregunta);

            if (!pregunta) {
                return res.status(404).json({ error: 'No se encontró la pregunta de seguridad asociada a este usuario' });
            }

            if (pregunta.respuesta.trim().toLowerCase() !== respuesta.trim().toLowerCase()) {
                return res.status(401).json({ error: 'La respuesta a la pregunta de seguridad es incorrecta' });
            }

            // Validar nueva contraseña
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-#])[A-Za-z\d@$!%*?&_\-#]{8,}$/;
            if (!passwordRegex.test(nuevaContrasena)) {
                return res.status(400).json({
                    error: 'La nueva contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales'
                });
            }

            // Hashear y actualizar la contraseña
            const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
            await modelo.actualizarContrasena(idUsuario, hashedPassword);

            res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });

        } catch (err) {
            console.error('Error al recuperar la contraseña:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = UsuariosControlador;
