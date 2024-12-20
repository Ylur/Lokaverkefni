// bakendi/middleware/authenticateToken.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Middleware to authenticate JWT tokens.
 * Attaches the user object to the request if valid.
 */
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access token missing.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Find user by ID and exclude password
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found.' });
        }
        req.userDetails = user; // Attach user details to request
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(403).json({ success: false, error: 'Invalid or expired token.' });
    }
};

module.exports = authenticateToken;
