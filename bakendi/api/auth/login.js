// bakendi/api/auth/login.js

const { body, validationResult } = require("express-validator");
const { cors, runMiddleware } = require("../../utils/cors");
const connectToDatabase = require("../../utils/connectToDatabase");
const { login } = require("../../controllers/authController");
const { validateLogin } = require("../../middleware/validateLogin");

module.exports = async (req, res) => {
  try {
    // Apply CORS middleware
    await runMiddleware(req, res, cors);

    // Only allow POST requests
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Run input validations
    await Promise.all([
      body("email")
        .isEmail()
        .withMessage("Valid email is required.")
        .normalizeEmail()
        .run(req),
      body("password").notEmpty().withMessage("Password is required.").run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Call the login controller
    await login(req, res);
  } catch (error) {
    console.error("Error in login handler:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
