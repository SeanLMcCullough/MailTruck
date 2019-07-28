const container = require('~src/container')
const { get, put } = require('~src/app/inbox')

module.exports = () => {
  const { logger, redis } = container.cradle
  const getUseCase = get({ logger, redis })
  const putUseCase = put({ logger, redis })

  return {
    getUseCase,
    putUseCase
  }
}
