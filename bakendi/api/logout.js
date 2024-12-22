// bakendi/api/logout.js

const express = require("express");
const router = express.Router();

/**
 * Handles user logout by clearing the JWT cookie.
 */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

module.exports = router;
