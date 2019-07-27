const container = require('~src/container')
const { get, put } = require('~src/app/inbox')

module.exports = () => {
  const { redis } = container.cradle
  const getUseCase = get({ redis })
  const putUseCase = put({ redis })

  return {
    getUseCase,
    putUseCase
  }
}
