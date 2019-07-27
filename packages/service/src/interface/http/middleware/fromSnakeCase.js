const { camelizeKeys } = require('humps')

module.exports = (app = {}, config = {}) => {
  return async function fromSnakeCase (ctx, next) {
    const { body } = ctx.request
    if (body && Object.keys(body).length) {
      ctx.request.body = camelizeKeys(body)
    }
    await next()
  }
}
