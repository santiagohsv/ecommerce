const { createLogger, transports } = require('winston');

const logConfiguration = {
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "./logs/warn.log", level: "warn" }),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
  ],
}; 

module.exports = createLogger(logConfiguration);