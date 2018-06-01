const Router = require('koa-router')
const serverRender = require('./server-render')
const fs = require('fs')
const {resolve} = require('path')
const { readFileByDir } = require('../util')

const template = fs.readFileSync(resolve(__dirname, '../../dist/index.html'), 'utf-8')
const stats = require('../../dist/react-loadable.json')
const bundle = require('../../dist/server-bundle')
const css = readFileByDir(fs, resolve(__dirname, '../../dist/server/css'))

const router = new Router()

router.get('*', async (ctx) => {
  await serverRender(bundle, template, css, ctx, stats)
})

module.exports = router
