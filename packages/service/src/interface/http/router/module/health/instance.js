const { get } = require('~src/app/health')

module.exports = () => {
  const getUseCase = get()

  return {
    getUseCase
  }
}
