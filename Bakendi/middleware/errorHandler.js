// bakendi/middleware/errorHandler.js

const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    // Log the error details
    logger.error('Error Message: %s', err.message);
    logger.error('Stack Trace: %o', err.stack);
    logger.error('Request Path: %s', req.originalUrl);
    logger.error('Request Body: %o', req.body);
    logger.error('Request Params: %o', req.params);
    logger.error('Request Query: %o', req.query);

    // Handle specific error types
    if (err.code === 'EBADCSRFTOKEN') {
        // CSRF token errors
        return res.status(403).json({ success: false, error: 'Invalid CSRF token.' });
    }

    // General error response
    res.status(500).json({ success: false, error: 'Internal Server Error' });
};

module.exports = errorHandler;
