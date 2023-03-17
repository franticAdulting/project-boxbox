import winston from 'winston'

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'winstonLogs.log' }),
  ],
})

export function getLogger(): winston.Logger {
  return logger
}
