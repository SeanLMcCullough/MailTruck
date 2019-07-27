const Router = require('koa-router')
const { OK } = require('http-status')

module.exports = ({ getUseCase, logger }) => {
  const router = new Router()

  /**
   * @swagger
   *
   * /health:
   *   get:
   *     description: Describes the current health of the API
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: health
   *         schema:
   *           $ref: '#/definitions/Health'
   */
  const getHandler = async (context, next) => {
    try {
      context.body = await getUseCase.check()
    } catch (error) {
      logger.error(error)
      context.status = OK
      context.body = {
        healthy: false,
        message: error.message
      }
    }
    return next()
  }

  router
    .get('/', getHandler)

  return {
    router,
    getHandler
  }
}
