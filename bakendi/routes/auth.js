// bakendi/routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// In-memory user store
const users = [];
let nextUserId = 1;

// Constants
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Ensure to set in .env

/**
 * @route   POST /api/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ success: false, error: 'Email already registered.' });
    }

    try {
        // Hash the password
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // Create new user
        const newUser = {
            id: nextUserId++,
            email,
            passwordHash,
        };

        users.push(newUser);

        // Generate JWT
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

/**
 * @route   POST /api/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    try {
        // Compare passwords
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
});

module.exports = router;
