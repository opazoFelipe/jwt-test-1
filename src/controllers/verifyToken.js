const config = require('../config');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    } else {
        try {
            const decoded = jwt.verify(token, config.secret);
            req.userId = decoded.id;
            next();
        } catch (error) {
            return res.status(401).json({
                auth: false,
                message: 'Invalid Token'
            }); 
        }
    }
};

module.exports = verifyToken;