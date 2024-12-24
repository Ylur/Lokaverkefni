// bakendi/utils/middleware.js
//klárt fyrir serverless

const { runMiddleware } = require("./cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

/**
 * Apply multiple middleware functions sequentially.
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The outgoing response object.
 * @param {Array<Function>} middlewares - An array of middleware functions.
 */
const applyMiddlewares = async (req, res, middlewares) => {
  for (const fn of middlewares) {
    await new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve(result);
      });
    });
  }
};

module.exports = { applyMiddlewares };