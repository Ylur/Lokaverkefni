// bakendi/api/auth/logout.js
// klárt fyrir serverless

const { applyMiddlewares } = require("../../utils/middleware");
const { cors } = require("../../utils/cors");
const cookieParser = require("cookie-parser");

module.exports = async (req, res) => {
  try {
    // Apply middlewares: CORS and Cookie Parser
    await applyMiddlewares(req, res, [cors, cookieParser()]);

    // Only allow POST requests
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully, vertu velkomin aftur",
      });
  } catch (error) {
    console.error("Logout Handler Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
