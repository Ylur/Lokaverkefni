// bakendi/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // framenda URL
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', authRoutes);       // Routes for /api/register and /api/login
app.use('/api/orders', ordersRoutes); // Routes for order management

// Health Check Route
app.get('/', (req, res) => {
    res.send('Restaurant Server is running.');
});

// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
