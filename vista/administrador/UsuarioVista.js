const express = require('express');
const usuarioControlador = require('../../controlador/administrador/UsuarioControlador');
const verificarToken = require('../../middleware/autenticacionMiddleware'); // Nombre correcto del archivo
const router = express.Router();

// Crear nuevo usuario
router.post('/crear', usuarioControlador.crearUsuario);

// Iniciar sesión
router.post('/login', usuarioControlador.iniciarSesion);

// Cerrar sesión
router.post('/cerrar-sesion', usuarioControlador.cerrarSesion);

// Inactivar cuenta
router.post('/inactivar', usuarioControlador.inactivarCuenta);

// Reactivar cuenta
router.post('/reactivar', usuarioControlador.reactivarCuenta);

// ✳️ Editar perfil autenticado sin pasar ID en la URL
router.put('/editar-perfil', verificarToken, usuarioControlador.editarPerfil);

module.exports = router;
