// bakendi/utils/logger.js

const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // Set to a single log level
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "Lokaverkefni" },
  transports: [
    // Remove or comment out file transports to prevent filesystem writes
    // new transports.File({ filename: "logs/error.log", level: "error" }),
    // new transports.File({ filename: "logs/combined.log" }),
  ],
});

// If we're not in production then log to the `console` with the simple format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
} else {
  // In production, also log to the console
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
