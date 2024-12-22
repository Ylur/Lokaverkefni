// bakendi/middleware/errorHandler.js

const logger = require('../utils/logger'); 

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack); // Log fyrir error stack trace
    res.status(500).json({ success: false, error: 'Internal Server Error' });
};

module.exports = errorHandler;
