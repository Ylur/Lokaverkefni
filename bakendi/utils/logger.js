// bakendi/utils/logger.js

const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // Corrected log level
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "lokaverkefni-service" },
  transports: [
    // File transports are commented out to prevent filesystem writes
    // new transports.File({ filename: "logs/error.log", level: "error" }),
    // new transports.File({ filename: "logs/combined.log" }),
  ],
});

// Always add console transport
logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  })
);

module.exports = logger;
