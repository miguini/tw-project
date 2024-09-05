const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Obtener el token desde el header Authorization
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    try {
        // Verificar el token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // El token es válido, almacenamos los datos del usuario
        next();  // Pasamos al siguiente middleware o controlador
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

module.exports = authenticateToken;
