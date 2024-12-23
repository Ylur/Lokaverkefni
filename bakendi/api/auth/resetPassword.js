// bakendi/api/auth/resetPassword.js

const { cors, runMiddleware } = require("../../utils/cors");
const connectToDatabase = require("../../utils/connectToDatabase");
const { resetPassword } = require("../../controllers/authController");

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

    // Connect to MongoDB
    await connectToDatabase();

    // Call the resetPassword controller
    await resetPassword(req, res);
  } catch (error) {
    console.error("ResetPassword Handler Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
