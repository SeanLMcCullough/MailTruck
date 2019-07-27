module.exports = ({ redis }) => {
  const store = async ({ inbox, data }) => {
    const key = `inbox:${inbox.substring(0, inbox.indexOf('@'))}`
    await redis.lpush(key, JSON.stringify(data))
  }

  return {
    store
  }
}
