const express = require('express');
const usuarioControlador = require('../controlador/UsuarioControlador');
const router = express.Router();

router.post('/registro', usuarioControlador.crearUsuario);

module.exports = router; // Exporta el router para ser utilizado en app.js
