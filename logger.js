const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log level (e.g., 'info', 'error')
  format: winston.format.simple(), // Log format
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'app.log' }) // Log to a file
  ],
});

// Export the logger for use in other modules
module.exports = logger;
