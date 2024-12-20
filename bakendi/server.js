

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// Remove body-parser as Express has built-in parsing
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Frontend URL from .env
    credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);       // Routes for /api/auth/register and /api/auth/login
app.use('/api/orders', ordersRoutes);   // Routes for order management

// Health Check Route
app.get('/', (req, res) => {
    res.send('Restaurant Server is running.');
});

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
