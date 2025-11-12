const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Leer el token del header
  const token = req.header('Authorization');

  // Verificar si existe
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar el token (quita el prefijo 'Bearer ' si existe)
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Guardar el usuario decodificado en el request
    req.user = decoded;

    next(); // Continuar
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};
