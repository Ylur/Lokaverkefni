// bakendi/api/register.js

const connectToDatabase = require('../utils/connectToDatabase');
const { register } = require('../controllers/authController');
const cors = require('cors')({
  origin: 'https://lokaverkefni-three.vercel.app/', 
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
});

module.exports = async (req, res) => {
  await cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, error: 'Method Not Allowed' });
      return;
    }
    await connectToDatabase();
    await register(req, res);
  });
};
