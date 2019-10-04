const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No se ha encontrado un token'
        });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;