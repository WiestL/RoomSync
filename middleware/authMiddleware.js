const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user ID from the token to the request object
        req.user = { id: decoded.id };
        
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
};


module.exports = auth;
