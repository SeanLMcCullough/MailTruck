const redis = require('async-redis')

module.exports = ({ config, logger }) => {
  const client = redis.createClient(config.redis)

  client.on('error', logger.error.bind(logger, 'Failed to connect to Redis'))
  client.on('connect', logger.info.bind(logger, 'Connected to Redis'))

  return client
}
