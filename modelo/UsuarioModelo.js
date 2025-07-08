const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class UsuarioModelo {
    static async verificarDuplicados(documento, telefono, email) {
        const resultado = { documento: false, telefono: false, email: false };

        try {
            const docResult = await dbService.query(
                'SELECT COUNT(*) AS count FROM usuarios WHERE documento = ?',
                [documento]
            );
            if (docResult[0].count > 0) resultado.documento = true;

            const emailResult = await dbService.query(
                'SELECT COUNT(*) AS count FROM usuarios WHERE correo = ?',
                [email]
            );
            if (emailResult[0].count > 0) resultado.email = true;

            const telResult = await dbService.query(
                'SELECT COUNT(*) AS count FROM usuarios WHERE telefono = ?',
                [telefono]
            );
            if (telResult[0].count > 0) resultado.telefono = true;

            return resultado;
        } catch (err) {
            throw new Error(`Error al verificar duplicados: ${err.message}`);
        }
    }

    static async crearUsuarios(documento, nombre, telefono, email, contrasena, terminos) {
        const query = `
            INSERT INTO usuarios (documento, nombres, telefono, correo, contrasena, rol, estado, terminos)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        try {
            const hash = await bcrypt.hash(contrasena, 10);
            return await dbService.query(query, [
                documento, nombre, telefono, email, hash, "Administrador", "Activo", terminos
            ]);
        } catch (err) {
            throw new Error(`Error al crear el usuario: ${err.message}`);
        }
    }

    static async buscarPorEmail(email) {
        try {
            const result = await dbService.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
            return result.length > 0 ? result[0] : null;
        } catch (err) {
            throw new Error(`Error al buscar el usuario por correo: ${err.message}`);
        }
    }

    static async verificarLogin(email, contrasena) {
        try {
            const result = await dbService.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
            const ahora = new Date();

            if (result.length === 0) {
                return { exito: false, mensaje: "Correo o contraseña incorrectos" };
            }

            const usuario = result[0];

            if (usuario.bloqueado_hasta && new Date(usuario.bloqueado_hasta) > ahora) {
                return {
                    exito: false,
                    mensaje: `Cuenta bloqueada hasta las ${new Date(usuario.bloqueado_hasta).toLocaleTimeString()}`
                };
            }

            const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!coincide) {
                let intentos = (usuario.intentos_fallidos || 0) + 1;
                let bloqueadoHasta = null;
                let nuevoEstado = usuario.estado;

                if (intentos >= 3) {
                    bloqueadoHasta = new Date(ahora.getTime() + 15 * 60000);
                    nuevoEstado = "Bloqueado";
                }

                if (intentos === 2) {
                    return {
                        exito: false,
                        mensaje: "Segundo intento fallido, si falla una vez más, tu cuenta será bloqueada"
                    };
                }

                await dbService.query(
                    'UPDATE usuarios SET intentos_fallidos = ?, bloqueado_hasta = ?, estado = ? WHERE correo = ?',
                    [intentos, bloqueadoHasta, nuevoEstado, email]
                );

                return {
                    exito: false,
                    mensaje: intentos >= 3
                        ? "Tu cuenta está bloqueada debido a múltiples intentos fallidos"
                        : "Correo o contraseña incorrectos"
                };
            }

            await dbService.query(
                'UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL, estado = "Activo" WHERE correo = ?',
                [email]
            );

            return { exito: true, usuario };

        } catch (err) {
            throw new Error(`Error en el inicio de sesión: ${err.message}`);
        }
    }

    static async guardarToken({ nombres, rol, correo, llave }) {
        try {
            const sql = `
                INSERT INTO token (usuario, rol, correo, llave)
                VALUES (?, ?, ?, ?)
            `;
            await dbService.query(sql, [nombres, rol, correo, llave]);
        } catch (error) {
            console.error('Error al guardar el token en la base de datos:', error.message);
            throw new Error('No se pudo guardar el token');
        }
    }

    static async eliminarToken(llave) {
        try {
            const result = await dbService.query('DELETE FROM token WHERE llave = ?', [llave]);

            if (result.affectedRows !== undefined && result.affectedRows === 0) {
                throw new Error('El token no existe en la base de datos');
            }

            return result;
        } catch (error) {
            console.error('Error al eliminar el token:', error.message);
            throw new Error('No se pudo eliminar el token');
        }
    }

    static async inactivarUsuario(email) {
        try {
            const result = await dbService.query(
                'UPDATE usuarios SET estado = "Inactivo" WHERE correo = ?',
                [email]
            );

            if (result.affectedRows === 0) {
                throw new Error('No se encontró el usuario para inactivar');
            }

            return result;
        } catch (error) {
            console.error('Error al inactivar el usuario:', error.message);
            throw new Error('No se pudo inactivar el usuario');
        }
    }

    static async reactivarUsuario(email) {
        try {
            const result = await dbService.query(
                'UPDATE usuarios SET estado = "Activo" WHERE correo = ?',
                [email]
            );

            if (result.affectedRows === 0) {
                throw new Error('No se encontró el usuario para reactivar');
            }

            return result;
        } catch (error) {
            console.error('Error al reactivar el usuario:', error.message);
            throw new Error('No se pudo reactivar el usuario');
        }
    }

    static async editarPerfil(idUsuario, datos) {
        const {
            telefono,
            correo,
            direccion,
            fechaExpedicion,
            idPregunta1,
            respuesta1,
            idPregunta2,
            respuesta2,
            idPregunta3,
            respuesta3,
            nombre
        } = datos;

        const connection = await dbService.pool.promise().getConnection();

        try {
            await connection.beginTransaction();

            await connection.query(
                `UPDATE usuarios SET nombres = ?, correo = ?, telefono = ? WHERE idUsuario = ?`,
                [nombre, correo, telefono, idUsuario]
            );

            const [rows] = await connection.query(
                'SELECT documento FROM usuarios WHERE idUsuario = ?',
                [idUsuario]
            );

            if (!rows || rows.length === 0) {
                throw new Error('No se encontró el documento del usuario');
            }

            const documento = rows[0].documento;

            await connection.query(
                `UPDATE perfil SET
                    nombres = ?,
                    telefono = ?,
                    correo = ?,
                    direccion = ?,
                    fechaexpedicion = ?,
                    idPregunta1 = ?,
                    respuesta1 = ?,
                    idPregunta2 = ?,
                    respuesta2 = ?,
                    idPregunta3 = ?,
                    respuesta3 = ?
                 WHERE documento = ?`,
                [
                    nombre,
                    telefono,
                    correo,
                    direccion,
                    fechaExpedicion,
                    idPregunta1,
                    respuesta1,
                    idPregunta2,
                    respuesta2,
                    idPregunta3,
                    respuesta3,
                    documento
                ]
            );

            await connection.commit();
            return { mensaje: 'Perfil actualizado correctamente.' };

        } catch (error) {
            await connection.rollback();
            console.error('Error al editar perfil:', error.message);
            throw new Error('Error al actualizar el perfil');
        } finally {
            connection.release();
        }
    }

    static async obtenerUsuarioPorCorreo(email) {
        const result = await dbService.query('SELECT idUsuario FROM usuarios WHERE correo = ?', [email]);
        return result.length > 0 ? result[0] : null;
    }

    static async obtenerPreguntaUsuario(idUsuario, idPregunta) {
        const query = `
            SELECT
                CASE
                    WHEN idPregunta1 = ? THEN respuesta1
                    WHEN idPregunta2 = ? THEN respuesta2
                    WHEN idPregunta3 = ? THEN respuesta3
                    ELSE NULL
                END AS respuesta
            FROM perfil
            WHERE idUsuario = ?
        `;
        const result = await dbService.query(query, [idPregunta, idPregunta, idPregunta, idUsuario]);
        return result.length > 0 ? { respuesta: result[0].respuesta } : null;
    }

    static async actualizarContrasena(idUsuario, hashedPassword) {
        await dbService.query(
            'UPDATE usuarios SET contrasena = ? WHERE idUsuario = ?',
            [hashedPassword, idUsuario]
        );
    }
}

module.exports = UsuarioModelo;
