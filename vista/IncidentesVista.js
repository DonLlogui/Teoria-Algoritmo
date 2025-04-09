const express = require('express');
const incidentesControlador = require('../controlador/IncidentesControlador');
const router = express.Router();

router.post('/crear', incidentesControlador.crearIncidente);

module.exports = router; // Exporta el router para ser utilizado en app.js
