const Koa = require('koa')

const {
  bodyParser,
  cors,
  helmet,
  requestId,
  statusMonitor,
  timer,
  fromSnakeCase
} = require('./middleware')
const router = require('./router')

module.exports = ({ config, logger }) => {
  const server = new Koa()

  server.proxy = true

  const app = router()
  server
    .use(timer())
    .use(requestId({ server }))
    .use(statusMonitor())
    .use(helmet())
    .use(cors({ server, config: config.http.cors }))
    .use(bodyParser())
    .use(fromSnakeCase())
    .use(app.routes())

  const start = () => {
    logger.info(`API listening on port ${config.http.port}`)
    logger.debug('API routes:', app.stack.map(i => i.path))
    return server.listen(config.http.port)
  }

  return { server, start }
}
