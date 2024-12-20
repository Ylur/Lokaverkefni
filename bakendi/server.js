// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

const app = express();

// Rate Limiting Middleware for Authentication Routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { success: false, error: 'Too many requests, please try again later.' },
});

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Frontend URL from .env
    credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());

// Apply rate limiting to authentication routes
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);       // Routes for /api/auth/register and /api/auth/login
app.use('/api/orders', ordersRoutes);   // Routes for order management

// Health Check Route
app.get('/', (req, res) => {
    res.send('Restaurant Server is running.');
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3001;

// Updated mongoose.connect without deprecated options
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
