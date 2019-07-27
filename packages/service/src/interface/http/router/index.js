const Router = require('koa-router')

const factory = require('./factory')

module.exports = () => {
  const router = new Router()

  const health = factory('health')
  const inbox = factory('inbox')

  router.use('/health', health.routes(), health.allowedMethods())
  router.use('/inbox', inbox.routes(), inbox.allowedMethods())

  return router
}
