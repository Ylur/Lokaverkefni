// bakendi/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/email');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

/**
 * Register a new user
 */
const register = async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Login Validation Errors:', errors.array());
        // Return the first validation error
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log('No user found with email:', email);
            return res.status(409).json({ success: false, error: 'Username or email already exists.' });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        console.log('JWT Token generated for user:', email);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, error: 'Internal server error during registration.' });
    }
};

/**
 * Authenticate user and get token
 */
const login = async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return the first validation error
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Invalid password for email:', email);
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal server error during login.' });
    }
};

/**
 * Request Password Reset
 */
const resetPasswordRequest = async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return the first validation error
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'No user found with that email.' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Set reset token and expiration on user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        await sendResetEmail(user.email, resetToken);

        res.status(200).json({ success: true, message: 'Password reset email sent.' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        res.status(500).json({ success: false, error: 'Internal server error during password reset request.' });
    }
};

/**
 * Reset Password
 */
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return the first validation error
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    if (!password) {
        return res.status(400).json({ success: false, error: 'New password is required.' });
    }

    try {
        // Find user by reset token and ensure token hasn't expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired password reset token.' });
        }

        // Update password
        user.password = password; // This will trigger the pre-save hook to hash the password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ success: false, error: 'Internal server error during password reset.' });
    }
};

module.exports = {
    register,
    login,
    resetPasswordRequest,
    resetPassword,
};
