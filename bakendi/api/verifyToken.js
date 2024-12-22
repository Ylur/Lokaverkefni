// bakendi/api/verifyToken.js

const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ isValid: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isValid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ isValid: false, message: "Invalid token." });
  }
};
