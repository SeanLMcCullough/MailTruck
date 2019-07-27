const dotenv = require('dotenv')
const { defaultsDeep } = require('lodash')
const { join } = require('path')
const pkg = require('~/package.json')
const base = require('./environments/base')

dotenv.config()

const env = process.env.NODE_ENV
const environment = require(join(__dirname, 'environments', env))

module.exports = defaultsDeep(
  {
    env,
    version: pkg.version
  },
  environment,
  base
)
