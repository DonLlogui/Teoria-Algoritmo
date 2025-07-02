const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica que se haya enviado el encabezado Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Extrae el token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica
    req.usuario = decoded; // Guarda los datos del usuario en la request
    next(); // Continúa al siguiente middleware o controlador
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
