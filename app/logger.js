import winston from 'winston'
import dailyLogRotate from 'winston-daily-rotate-file'
import fs from 'fs'

const environment = process.env.NODE_ENV || 'development'

const logDirectory = 'logs'

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

const timestampFormat = () => (new Date()).toLocaleTimeString()

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: environment === 'development' ? 'debug' : 'info',
      silent: environment === 'test',
      handleExceptions: true,
      timestamp: timestampFormat,
      colorize: true
    }),
    new (dailyLogRotate)({
      level: 'info',
      handleExceptions: true,
      filename: `${logDirectory}/-info.log`,
      timestamp: timestampFormat,
      localTime: true,
      datePattern: 'yyyy-MM-dd',
      prepend: true
    })
  ],
  exitOnError: false,
})

export default logger
