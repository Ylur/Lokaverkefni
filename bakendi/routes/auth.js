// bakendi/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const { body } = require('express-validator');
const User = require('../models/User'); // Import the User model

// Registration Route with Validation
router.post('/register', [
    body('username')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.')
        .trim().escape(),
    body('email')
        .isEmail().withMessage('Valid email is required.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], authController.register);

// Login Route with Validation
router.post('/login', [
    body('email')
        .isEmail().withMessage('Valid email is required.')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required.')
], authController.login);

// Password Reset Request Route with Validation
router.post('/reset-password', [
    body('email')
        .isEmail().withMessage('Valid email is required.')
        .normalizeEmail(),
], authController.resetPasswordRequest);

// Password Reset Route with Validation
router.post('/reset-password/:token', [
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], authController.resetPassword);

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


// GET /api/auth/users - For Development Only / fjarlægja eftir það, aldrei nota í prod
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // ekki passwords
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, error: 'Internal server error while fetching users.' });
    }
});

module.exports = router;
