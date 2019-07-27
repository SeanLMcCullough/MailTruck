const path = require('path')

module.exports = uri => {
  const toPath = path.resolve('src/interface/http/router/module', uri)
  const Module = require(toPath)

  return Module().router
}
