// bakendi/utils/cors.js
// einfalda uppsetningu

const Cors = require('cors');

const cors = Cors({
  origin: 'https://lokaverkefni-three.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

module.exports = { cors, runMiddleware };
