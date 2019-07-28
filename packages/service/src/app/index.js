module.exports = ({ http, smtp, logger, config }) => {
  const start = async () => {
    logger.info('App starting, ', config)
    smtp.start()
    http.start()
  }

  return { start }
}
