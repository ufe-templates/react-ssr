const Router = require('koa-router')
const MFS = require('memory-fs')
const webpack = require('webpack')
const path = require('path')
const NativeModule = require('module')
const vm = require('vm')
const ServerRender = require('./server-render')
const serverConfig = require('../../build/webpack.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MFS()
const axios = require('axios')
const { readFileByDir } = require('../util')

serverCompiler.outputFileSystem = mfs

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(
      path.join(serverConfig.output.path, file),
      'utf-8'
    )
  } catch (e) {
    console.log(e)
  }
}

const fetchBundle = (fs, filename) => {
  const r = file => {
    if (/\.js$/.test(file)) {
      return fetchBundle(fs, file)
    } else {
      return require(file)
    }
  }
  try {
    const m = { exports: {} }
    const bundleStr = readFile(fs, filename)
    const wrapper = NativeModule.wrap(bundleStr)
    const script = new vm.Script(wrapper, {
      filename,
      displayErrors: true
    })
    const result = script.runInThisContext()
    result.call(m.exports, m.exports, r, m)
    return m.exports
  } catch (e) {
    console.log('compile js error:', e)
  }
}

let bundle
let css
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))
  css = readFileByDir(mfs, path.join(serverConfig.output.path, 'server/css'))
  bundle = fetchBundle(mfs, 'server-bundle.js')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    console.log('稍等, 正在编译')
    return
  }
  // dev 阶段不使用mini-css-extract-pligin 导致不会产生async chunks css文件
  const name = `server.${ctx.path.substr(1)}.css`
  css['server.css'] += css[name]
  const template = await axios.get('http://localhost:9000/index.html')
  const stats = await axios.get('http://localhost:9000/dist/react-loadable.json')
  await ServerRender(bundle, template.data, css, ctx, stats.data)
}

const router = new Router()
router.get('*', handleSSR)
module.exports = router
