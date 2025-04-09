const express = require('express');
const forosControlador = require('../controlador/ForosControlador');
const router = express.Router();

router.post('/crear', forosControlador.crearForo);

module.exports = router; // Exporta el router para ser utilizado en app.js
