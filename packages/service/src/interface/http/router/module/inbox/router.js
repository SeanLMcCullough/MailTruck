const Router = require('koa-router')
const { OK } = require('http-status')

module.exports = ({ getUseCase, putUseCase, logger }) => {
  const router = new Router()

  const getInboxHandler = async (context, next) => {
    const { inbox } = context.params
    context.body = await getUseCase.list({ inbox })
    return next()
  }

  const putInboxHandler = async (context, next) => {
    const { inbox } = context.params
    const { body: data } = context.request
    await putUseCase.store({ inbox, data })
  }

  router
    .get('/:inbox', getInboxHandler)
    .put('/:inbox', putInboxHandler)

  return {
    router,
    getInboxHandler
  }
}
