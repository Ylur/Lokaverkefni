// bakendi/api/health.js

const NextCors = require('nextjs-cors').default; // Correct import for CommonJS
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET', 'OPTIONS'],
    origin: [
      "http://localhost:3000",
      "https://lokaverkefni-framendi.vercel.app",
      "https://www.appgo.is",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  });

  if (req.method === 'GET') {
    logger.info("Health check endpoint accessed.");
    res.status(200).json({ status: 'Backend is running.' });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
};
