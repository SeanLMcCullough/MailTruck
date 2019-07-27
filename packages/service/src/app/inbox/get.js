module.exports = ({ redis }) => {
  const list = async ({ inbox }) => {
    const key = `inbox:${inbox.substring(0, inbox.indexOf('@'))}`
    const data = await redis.lrange(key, 0, -1)
    return data.map(JSON.parse)
  }

  return {
    list
  }
}
