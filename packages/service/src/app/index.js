module.exports = ({ http, smtp }) => {
  const start = async () => {
    smtp.start()
    http.start()
  }

  return { start }
}
