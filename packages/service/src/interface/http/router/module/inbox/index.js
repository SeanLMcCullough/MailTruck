const container = require('~src/container')
const router = require('./router')
const instance = require('./instance')

module.exports = () => {
  const { logger } = container.cradle
  const app = instance()

  return router({ logger, ...app })
}
