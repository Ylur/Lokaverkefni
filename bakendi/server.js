// server.js

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const csurf = require("csurf");

// Import Routes
const authRoutes = require("./routes/auth"); // Handles /api/auth/register and /api/auth/login
const ordersRoutes = require("./routes/orders"); // Handles /api/orders
const verifyTokenRoute = require("./api/verifyToken"); // Handles /api/verifyToken
const logoutRoute = require("./api/logout"); // Handles /api/logout

// Import Middleware
const errorHandler = require("./middleware/errorHandler");
const generalLimiter = require("./middleware/rateLimiter");

const app = express();

// Initialize CSRF protection
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "strict",
  },
});

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
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Frontend URL from .env
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter); // Apply general rate limiting to all routes

// Apply Rate Limiting to Authentication Routes
app.use("/api/auth", authLimiter);

// Apply CSRF protection and define routes
app.use("/api/auth", csrfProtection, authRoutes); // Routes for /api/auth/register and /api/auth/login
app.use("/api/orders", csrfProtection, ordersRoutes); // Routes for order management

// Define Other Routes
app.use("/api/verifyToken", verifyTokenRoute);
app.use("/api/logout", logoutRoute);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Restaurant Server is running.");
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
