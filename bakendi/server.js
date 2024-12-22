// server.js

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const loginRoute = require('./api/login');
const verifyTokenRoute = require('./api/verifyToken');
const logoutRoute = require('./api/logout');
const errorHandler = require('./middleware/errorHandler');
const generalLimiter = require('./middleware/rateLimiter');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const csurf = require('csurf');

const app = express();

// Initialize CSRF protection
const csrfProtection = csurf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
});

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
app.use(generalLimiter);

// Apply rate limiting to authentication routes
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', csrfProtection);      // Routes for /api/auth/register og /api/auth/login
app.use('/api/orders', csrfProtection);   // Routes for order management
app.use(generalLimiter);

// Health Check Route
app.get('/', (req, res) => {
    res.send('Restaurant Server is running.');
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
