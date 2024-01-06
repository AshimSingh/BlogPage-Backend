const winston = require('winston')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const path = require('path')
require('winston-daily-rotate-file')
const fs = require('fs')
const fsPromise = require('fs').promises

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})
// const errorFileName = path.join(__dirname, 'errorLogger.log');
// const combineFileName = path.join(__dirname,'combineLogger.log')
// const pathname = path.join(__dirname,'../../logs')
const Loglevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}
const logsfile = path.join(__dirname, '../..', 'Logs')

const makeFile = async () => {
  try {
    if (!fs.existsSync(logsfile)) {
      await fsPromise.mkdir(logsfile)
    }
  } catch (err) {
    console.log(err)
  }
}

var logger
if (process.env.NODE_ENV == 'production') {
  makeFile()
  logger = winston.createLogger({
    level: Loglevels,
    format: combine(
      // label({ label: 'right meow!' }),
      timestamp(),
      myFormat,
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.DailyRotateFile({
        level: 'error',
        filename: path.join(logsfile, 'application-%DATE%-error.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
      //this wii run on error level
      new winston.transports.DailyRotateFile({
        level: 'info',
        filename: path.join(logsfile, 'application-%DATE%-info.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }), //this will run on info level
      new winston.transports.DailyRotateFile({
        level: 'http',
        filename: path.join(logsfile, 'application-%DATE%-error.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }), // this to log http logs may or maynot be using morgan
    ],
  })
} else {
  logger = winston.createLogger({
    label: 'debug',
    transports: [new winston.transports.Console()],
    format: winston.format.simple(),
  })
}

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   console.log("pro")
//   Logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }
module.exports = logger
