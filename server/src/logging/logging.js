const { createLogger, format, transports } = require('winston');
const { combine, colorize, timestamp, printf } = format;

const LogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const Log = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    colorize(),
    LogFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = {
  Log
};