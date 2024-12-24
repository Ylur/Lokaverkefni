// bakendi/controllers/authController.js
//validationResult(req) sér um að logga villur
//klárt fyrir serverless

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/email');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined.');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

/**
 * Helper function to generate JWT
 */
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Register a new user
 * 1. Validate inputs
 * 2. Check if user or email already exists
 * 3. Hash password
 * 4. Create new user
 * 5. Generate JWT
 * 6. Set cookie and send success response
 */
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ success: false, error: 'Username or email already exists.' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT
        const token = generateToken({ id: newUser._id, email: newUser.email });

        // *** Set the JWT as an HTTP-only cookie ***
        // Important: "sameSite: 'none'" + "secure: true" if cross-site in production
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "none", // or "strict"/"lax" depending on your needs
            maxAge: 1000 * 60 * 60, // 1 hour in ms (same as your JWT expiry)
        });

        // Optionally, you don’t need to return the token in JSON if you’re using cookies
        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, error: 'Internal server error during registration.' });
    }
};

/**
 * Log in an existing user
 * 1. Validate inputs
 * 2. Check if user exists
 * 3. Compare passwords
 * 4. Generate JWT
 * 5. Set cookie and send success response
 */
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = generateToken({ id: user._id, email: user.email });

        // *** Set the JWT as an HTTP-only cookie ***
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "none", 
            maxAge: 1000 * 60 * 60, // 1 hour
        });

        // Optionally, remove the token from JSON response
        return res.status(200).json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal server error during login.' });
    }
};

/**
 * Request Password Reset
 */
const resetPasswordRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'No user found with that email.' });
        }

        // Generate reset token and hash it
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedResetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email with the plain resetToken
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    if (!password) {
        return res.status(400).json({ success: false, error: 'New password is required.' });
    }

    try {
        const hashedResetToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedResetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired password reset token.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
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
