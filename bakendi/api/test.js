// bakendi/api/test.js

const cors = require('cors')({
    origin: 'https://lokaverkefni-three.vercel.app', // Frontend URL
    methods: ['GET'],
    credentials: true,
  });
  
  module.exports = async (req, res) => {
    await cors(req, res, () => {
      if (req.method === 'GET') {
        res.status(200).json({ success: true, message: 'Test endpoint working' });
      } else {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
      }
    });
  };
  