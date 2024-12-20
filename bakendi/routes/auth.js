// bakendi/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

// Registration Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// Password Reset Request Route
router.post('/reset-password', authController.resetPasswordRequest);

// Password Reset Route
router.post('/reset-password/:token', authController.resetPassword);

// Protected Route Example: Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = req.userDetails; // Attached by authenticateToken middleware
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error while fetching profile.' });
    }
});

module.exports = router;
