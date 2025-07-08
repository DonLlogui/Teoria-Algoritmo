const express = require('express');
const router = express.Router();

const usuarioControlador = require('../../controlador/administrador/UsuarioControlador');
const verificarToken = require('../../middleware/autenticacionMiddleware'); // Middleware JWT

// Crear nuevo usuario administrador
router.post('/crear', usuarioControlador.crearUsuario);

// Iniciar sesión
router.post('/login', usuarioControlador.iniciarSesion);

// Cerrar sesión
router.post('/cerrar-sesion', usuarioControlador.cerrarSesion);

// Inactivar cuenta (requiere email y contraseña)
router.post('/inactivar', usuarioControlador.inactivarCuenta);

// Reactivar cuenta (requiere email y contraseña)
router.post('/reactivar', usuarioControlador.reactivarCuenta);

// Recuperar contraseña con pregunta de seguridad
router.post('/recuperar-contrasena', usuarioControlador.recuperarContrasena);

// Editar perfil del usuario autenticado (token obligatorio)
router.put('/editar-perfil', verificarToken, usuarioControlador.editarPerfil);

module.exports = router;
