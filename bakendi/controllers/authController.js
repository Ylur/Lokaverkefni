// bakendi/controllers/authController.js
//validationResult(req) sér um að logga villur
//klárt fyrir serverless




const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendResetEmail } = require('../utils/email');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // For password hashing

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined.');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

/**
 * leitat eftir JWT og flaggar ef það er ekki tilstaðar.
 */
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 *Nýskráning
  ath hvort user/email sé til nú þegar.
    hashar psw með bcrypt + býr til jwt token við skráningu
 */
const register = async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return the first validation error
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log('Attempt to register with existing email:', email);
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
        console.log('JWT Token generated for user:', email);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, error: 'Internal server error during registration.' });
    }
};

/**
 * Athuga hvort notandi sé til nú þegar og ber psw saman með bcrypt.compare
 * skilar svo jwt token
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password attempt for email:', email);
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = generateToken({ id: user._id, email: user.email });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal server error during login.' });
    }
};

/**
 * Request Password Reset.
 * Býr til random token og vistar það í doc.
 * Skutlar email á notanda með sendResetEmail (60% of the time it works...everytime)
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

        // Generate reset token and hash it
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set reset token and expiration on user
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
 * Reset Password.
 * Samþykkir jwt tokenið og skiptir út lykilorði
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
        // Hash the incoming token to compare with stored hashed token
        const hashedResetToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user by hashed reset token and ensure token hasn't expired
        const user = await User.findOne({
            resetPasswordToken: hashedResetToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired password reset token.' });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update password and remove reset token fields
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
