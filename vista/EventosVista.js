const express = require('express');
const eventosControlador = require('../controlador/EventosControlador');
const router = express.Router();

router.post('/crear', eventosControlador.crearEvento);

module.exports = router; // Exporta el router para ser utilizado en app.js
