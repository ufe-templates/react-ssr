const Router = require('koa-router')

const apiRouter = new Router({
  prefix: '/api'
})

const successResponse = data => {
  return {
    success: true,
    data
  }
}

apiRouter
  .get('/topics', async (ctx) => {
    ctx.body = successResponse([1, 2, 3, 4, 5])
  })

module.exports = apiRouter
