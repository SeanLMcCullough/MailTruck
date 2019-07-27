const koaBodyParser = require('koa-bodyparser')

module.exports = (app = {}, config = {}) => {
  return koaBodyParser({
    enableTypes: ['json'],
    ...config
  })
}
