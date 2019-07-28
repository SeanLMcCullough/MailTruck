module.exports = ({ logger, redis }) => {
  const store = async ({ inbox, data }) => {
    const key = `inbox:${inbox.substring(0, inbox.indexOf('@'))}`
    logger.info(`put for ${key}`, data)
    await redis.lpush(key, JSON.stringify(data))
  }

  return {
    store
  }
}
