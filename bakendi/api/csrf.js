// bakendi/api/csrf.js

const { cors, runMiddleware } = require("../utils/cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const csrfProtection = csrf({ cookie: true });

module.exports = async (req, res) => {
  try {
    // Apply CORS middleware
    await runMiddleware(req, res, cors);

    // Apply Cookie Parser middleware
    await runMiddleware(req, res, cookieParser());

    // Only allow GET requests
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Apply CSRF protection
    await new Promise((resolve, reject) => {
      csrfProtection(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Send CSRF token
    res.status(200).json({ csrfToken: req.csrfToken() });
  } catch (error) {
    console.error("Error in csrf handler:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
