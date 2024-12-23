// server.js
// fyrir local dev eingöngu.

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const csrf = require('csurf');


// Import Routes
const authRoutes = require("./api/auth"); // Handles /api/auth/register and /api/auth/login
const ordersRoutes = require("./api/orders"); // Handles /api/orders
const verifyTokenRoute = require("./api/verifyToken"); // Handles /api/verifyToken
const logoutRoute = require("./api/logout"); // Handles /api/logout
const csrfRoutes = require("./api/csrf"); // CSRF token route

// Import Middleware
const errorHandler = require("./middleware/errorHandler");
const generalLimiter = require("./middleware/rateLimiter");

// Import Logger
const logger = require("./utils/logger"); // winston logger

const app = express();

// Initialize CSRF protection (only for specific routes if needed)
const csrfProtection = csrf({ cookie: true });

// Rate Limiting Middleware for Authentication Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});

// Declare PORT
const PORT = process.env.PORT || 3001;

// Apply Global Middleware
app.use(helmet()); // Set security-related HTTP headers
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Frontend URL from .env
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
//Body Parsing Middleware
app.use(express.json());
// Cookie Parsing Middleware
app.use(cookieParser());
// Rate Limiting Middleware
app.use(generalLimiter); 

// 6. HTTP Request Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));


// Apply Rate Limiting to Authentication Routes
app.use("/api/auth", authLimiter);

// Mount CSRF Routes
app.use("/api", csrfRoutes); // Now, GET /api/csrf-token is accessible

// Define Routes Without CSRF Protection
app.use("/api/auth", authRoutes); // Routes for /api/auth/register and /api/auth/login
app.use("/api/orders", ordersRoutes); // Routes for order management
app.use("/api/verifyToken", verifyTokenRoute);
app.use("/api/logout", logoutRoute); //logout route

// Health Check Route
app.get("/", (req, res) => {
  res.send("Restaurant Server is running.");
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  });

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);
