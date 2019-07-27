const responseTime = require('koa-response-time')

module.exports = () => {
  return responseTime()
}
