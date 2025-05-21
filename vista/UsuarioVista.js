const express = require('express');
const usuarioControlador = require('../controlador/UsuarioControlador');
const router = express.Router();

router.post('/crear', usuarioControlador.crearUsuario);

router.post('/login', usuarioControlador.iniciarSesion);

module.exports = router; // Exporta el router para ser utilizado en app.js
