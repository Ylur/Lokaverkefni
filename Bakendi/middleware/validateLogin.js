// bakendi/middleware/validateLogin.js
// klárt fyrir serverless

const { body, validationResult } = require("express-validator");

/**
 * Validation rules for login
 */
const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first validation error
      return res
        .status(400)
        .json({ success: false, error: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = { validateLogin };
