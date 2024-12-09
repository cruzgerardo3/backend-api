const jwt = require('jsonwebtoken');

function auth(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({error: 'No autorizado'});
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) return res.status(401).json({error: 'Token inválido'});
      if(requiredRole && user.role !== requiredRole) {
        return res.status(403).json({error: 'No tiene permisos'});
      }
      req.user = user;
      next();
    });
  }
}

module.exports = auth;
