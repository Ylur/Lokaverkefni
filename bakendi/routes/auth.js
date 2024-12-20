// bakendi/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const { body } = require('express-validator');

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

module.exports = router;
