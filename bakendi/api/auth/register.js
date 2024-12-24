// bakendi/api/auth/register.js
// klárt fyrir serverless

const { body, validationResult } = require("express-validator");
const { applyMiddlewares } = require("../../utils/middleware");
const { cors } = require("../../utils/cors");
const connectToDatabase = require("../../utils/connectToDatabase");
const { register } = require("../../controllers/authController");

module.exports = async (req, res) => {
  try {
    // Apply middlewares: CORS and Cookie Parser
    await applyMiddlewares(req, res, [cors, require("cookie-parser")()]);

    // Only allow POST requests
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Run validations
    await Promise.all([
      body("username")
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long.")
        .trim()
        .escape()
        .run(req),
      body("email")
        .isEmail()
        .withMessage("Valid email is required.")
        .normalizeEmail()
        .run(req),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long.")
        .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Call the register controller
    await register(req, res);
  } catch (error) {
    console.error("Error in register handler:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
