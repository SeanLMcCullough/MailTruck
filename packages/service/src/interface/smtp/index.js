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

const parseEmail = stream => new Promise((resolve) => {
  const parser = new MailParser()

  parser.on('end', mail => {
      if (!mail.text && !mail.html) {
          mail.text = ''
          mail.html = '<div></div>'
      } else if (!mail.html) {
          mail.html = textToHtml(mail.text)
      } else if (!mail.text) {
          mail.text = htmlToText.fromString(mailhtml)
      }

      return resolve(mail)
  })

  stream.pipe(parser)
})

module.exports = ({ config, logger, redis }) => {
  const putUseCase = put({ redis })

  const handler = (stream, session, callback) => {
    stream.on('end', async () => {
      const email = await parseEmail(stream)
      const inbox = email.headers.get('to')
      if (!inbox) return callback()
      await putUseCase.store({ inbox, email })
      callback()
    })
  }

  let server
  const start = () => {
    server = new SMTPServer({
      logger,
      onData: handler,
      onAuth: (auth, session, callback) => callback(new Error('Unauthorized user')),
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
