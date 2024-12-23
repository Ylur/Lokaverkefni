// bakendi/api/csrf.js

const { applyMiddlewares } = require("../utils/middleware");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

module.exports = async (req, res) => {
  try {
    // Apply middlewares: CORS, Cookie Parser, and CSRF
    await applyMiddlewares(req, res, [
      require("../utils/cors").cors,
      require("cookie-parser")(),
    ]);

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
