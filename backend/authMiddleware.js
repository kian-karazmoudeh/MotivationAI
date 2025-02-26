const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const verifyToken = (req, res, next) => {
    // Extract token from cookies
    const token = req.cookies?._auth;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;