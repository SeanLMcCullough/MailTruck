module.exports = {
  logging: {
    level: 'warning',
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD
  },

  smtp: {
    port: Number(process.env.SMTP_PORT || '25')
  },

  http: {
    port: Number(process.env.HTTP_PORT || '4000'),
    cors: {}
  }
}
