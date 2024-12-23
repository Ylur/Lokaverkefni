// bakendi/api/auth/logout.js
// Handles logout

const { cors, runMiddleware } = require('../../utils/cors');

module.exports = async (req, res) => {
  try {
    // Apply CORS middleware
    await runMiddleware(req, res, cors);

    // Only allow POST requests
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully, vertu velkomin aftur' });
  } catch (error) {
    console.error('Logout Handler Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
