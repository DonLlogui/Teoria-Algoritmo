const express = require('express');
const reportesControlador = require('../controlador/ReportesControlador');
const router = express.Router();

router.post('/crear', reportesControlador.crearReporte);

module.exports = router; // Exporta el router para ser utilizado en app.js
