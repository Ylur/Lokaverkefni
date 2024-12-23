// bakendi/api/login.js

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); // var þetta ekki Outdated?
const connectToDatabase = require('../../utils/connectToDatabase');
const { login } = require('../../controllers/authController');
const { validateLogin } = require('../../middleware/validateLogin');

const router = express.Router();

// Middleware Setup

// Set security HTTP headers
router.use(helmet());

// Configure CORS
const allowedOrigins = [
  'https://lokaverkefni-three.vercel.app',
  
];

router.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin #tekinn';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['POST'],
  credentials: true,
}));

// Rate Limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: {
    success: false,
    error: 'Too many login attempts from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/login', loginLimiter, validateLogin, async (req, res) => {
  try {
    await connectToDatabase();
    await login(req, res);
  } catch (error) {
    console.error('Login Route Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
