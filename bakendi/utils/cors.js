// bakendi/utils/cors.js
// klárt fyrir serverless

const Cors = require("cors");

// Define CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://lokaverkefni-framendi.vercel.app",
    "https://www.appgo.is", // Corrected to include 'www'
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS for preflight
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true,
};

// Initialize CORS middleware
const cors = Cors(corsOptions);

/**
 * Runs a middleware function and returns a promise.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The outgoing response object.
 * @param {Function} fn - The middleware function to run.
 */
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

module.exports = { cors, runMiddleware };
