const koaXRequestId = require('koa-x-request-id')

module.exports = ({ server }) => {
  return koaXRequestId({ inject: true }, server)
}
