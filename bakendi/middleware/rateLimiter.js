// bakendi/middleware/rateLimiter.js

const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests from this IP, hvað í andskotanum ertu að reyna",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = generalLimiter;
