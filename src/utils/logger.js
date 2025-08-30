import winston from "winston";

const logger = winston.createLogger({
  level: "info", // levels: error, warn, info, http, verbose, debug, silly
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // store logs in JSON
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // log to console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // log errors
    new winston.transports.File({ filename: "logs/combined.log" }) // log everything
  ],
});

// If not in production, log to console with colors
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
