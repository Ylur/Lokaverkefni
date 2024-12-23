// bakendi/utils/middleware.js

const { runMiddleware } = require('./cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/**
 * Apply multiple middleware functions sequentially.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The outgoing response object.
 * @param {Array} middlewares - An array of middleware functions to apply.
 */
const applyMiddlewares = async (req, res, middlewares) => {
  for (const middleware of middlewares) {
    await runMiddleware(req, res, middleware);
  }
};

module.exports = { applyMiddlewares };
