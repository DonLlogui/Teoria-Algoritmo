const express = require('express');
const cors = require('cors');
const usuarioVista = require('./vista/administrador/UsuarioVista');
/*const reportesVista = require('./vista/administrador/ReportesVista');
const eventosVista = require('./vista/administrador/EventosVista');
const forosVista = require('./vista/administrador/ForosVista');
const incidentesVista = require('./vista/administrador/IncidentesVista');*/

//const path = require('path');
const app = express();
const PORT = process.env.PORT || 4545;

// Middleware
app.use(cors({
  origin: '*', // Cambiar ['http://tu.com', 'http://yo.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true // Habilita el envío de credenciales si es necesario
}));

// Middleware para parseo de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/usuarios', usuarioVista);
// app.use('/reportes', reportesVista);
// app.use('/eventos', eventosVista);
// app.use('/foros', forosVista);
// app.use('/incidentes', incidentesVista);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
