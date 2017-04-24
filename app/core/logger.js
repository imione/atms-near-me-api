const winston = require('winston');
const logLevel = require('../../config').logger.logLevel;

// logs to console
const consoleTransport = new (winston.transports.Console)({
  level: logLevel,
  colorize: true,
  prettyPrint: true,
});

const logger = new (winston.Logger)({
  transports: [consoleTransport],
});

module.exports = logger;

