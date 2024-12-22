// bakendi/api/verifyToken.js

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

/**
 * Verify JWT token from HTTP-only cookie
 */
router.post("/", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ isValid: false, message: "Access token missing." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ isValid: false, message: "User not found." });
    }
    res
      .status(200)
      .json({
        isValid: true,
        user: { id: user._id, email: user.email, username: user.username },
      });
  } catch (error) {
    console.error("Token verification error:", error);
    res
      .status(403)
      .json({ isValid: false, message: "Invalid or expired token." });
  }
});

module.exports = router;
