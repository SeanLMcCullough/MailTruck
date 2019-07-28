const { SMTPServer } = require('smtp-server')
const { MailParser } = require('mailparser');
const htmlToText = require('html-to-text')

const { put } = require('~src/app/inbox')

// Careof https://github.com/Flolagale/mailin/blob/master/lib/mailin.js
const textToHtml = text => {
  return text
    .replace(/(\n\r)|(\n)/g, '<br>') // newlines to br
    .replace(/^\s*(<br>)*\s*/, '') // remove beginning br
    .replace(/\s*(<br>)*\s*$/, '') // remoe ending br
}

module.exports = ({ config, logger, redis }) => {
  const putUseCase = put({ redis })

  const handler = (stream, session, callback) => {
    logger.info('----------------------------------')
    logger.info('onData handler')
    logger.info({ session })

    const parser = new MailParser()
    stream.pipe(parser)

    stream.on('data', logger.info.bind(logger, 'data'))
    stream.on('end', logger.info.bind(logger, 'end'))
    stream.on('close', logger.info.bind(logger, 'close'))
    stream.on('error', logger.info.bind(logger, 'error'))
    stream.on('end', logger.info.bind(logger, 'end'))

    parser.on('end', async email => {
      logger.info('parser.end')
      logger.info({ email })

      if (!email.text && !email.html) {
          email.text = ''
          email.html = '<div></div>'
      } else if (!email.html) {
          email.html = textToHtml(email.text)
      } else if (!email.text) {
          email.text = htmlToText.fromString(email.html)
      }

      const inbox = email.headers.get('to')
      if (!inbox) return
      await putUseCase.store({ inbox, email })
    })
  }

  let server
  const start = () => {
    server = new SMTPServer({
      logger,
      onData: handler,
      authOptional: true,
      ...config.smtp
    })

    server.on('error', logger.error.bind(logger, 'SMTP'))
    server.listen(Number(config.smtp.port), logger.info.bind(logger, 'SMTP Listening'))
    logger.info('SMTP server listening')
  }

  return {
    start,
    server
  }
}
