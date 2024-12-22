// bakendi/middleware/errorHandler.js
//TODO skoða hvort ég vilji nota þetta fyrir lokaverkefnið

const { logger } = require("../server");

module.exports = (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res
    .status(err.status || 500)
    .json({ success: false, error: err.message || "Internal Server Error" });
};
