const {
  createContainer,
  asValue,
  asFunction
} = require('awilix')

const config = require('~/config')
const logger = require('./infrastructure/logger')
const redis = require('./infrastructure/redis')
const app = require('./app')
const http = require('./interface/http')
const smtp = require('./interface/smtp')

const container = createContainer()

logger.info(config)

container.register({
  config: asValue(config),
  logger: asFunction(logger).singleton(),
  redis: asFunction(redis).singleton(),
  app: asFunction(app).singleton(),
  http: asFunction(http).singleton(),
  smtp: asFunction(smtp).singleton()
})

module.exports = container
