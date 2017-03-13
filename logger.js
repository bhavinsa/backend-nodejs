var winston = require('winston');
require('winston-daily-rotate-file');
  
  var transport = new winston.transports.DailyRotateFile({
    filename: './logs/log',
    datePattern: 'yyyy-MM-ddTHH.',
    prepend: true,
    level: process.env.ENV == 'development' ? 'info' : 'debug'
  });
  
  var logger = new (winston.Logger)({
    transports: [
      transport
    ]
  });
 
//logger.debug('Hello World!'); //It will print only process.env.ENV == 'development'
//logger.info('Hello World!');

module.exports = logger;