const fs = require('fs')
const winston = require('winston')

/* istanbul ignore if */
if (!fs.existsSync(`logs`)) {
  fs.mkdirSync(`logs`)
}

module.exports = ({ config }) => {
  return winston.createLogger({
    transports: [
      new winston.transports.Console(config.logging),
      new winston.transports.File(Object.assign(config.logging, {
        filename: `logs/${config.env}.log`
      }))
    ]
  })
}
