// bakendi/api/auth/verifyToken.js
// Verifies JWT token from HTTP-only cookie
// Configured for serverless

const NextCors = require("nextjs-cors");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const connectToDatabase = require("../../utils/connectToDatabase");
const NextCors = require('nextjs-cors').default;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

module.exports = async (req, res) => {
  // Run the cors middleware
  await NextCors(req, res, {
    // Options
    methods: ["POST", "OPTIONS"],
    origin: [
      "http://localhost:3000",
      "https://lokaverkefni-framendi.vercel.app",
      "https://www.appgo.is",
    ],
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    credentials: true,
  });

  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  try {
    await connectToDatabase();

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
      res.status(200).json({
        isValid: true,
        user: { id: user._id, email: user.email, username: user.username },
      });
    } catch (error) {
      console.error("Token verification error:", error);
      res
        .status(403)
        .json({ isValid: false, message: "Invalid or expired token." });
    }
  } catch (error) {
    console.error("VerifyToken Handler Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
