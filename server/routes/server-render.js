const Helmet = require('react-helmet').default
const ReactDomServer = require('react-dom/server')
const {
  getBundles
} = require('react-loadable/webpack')

const getStore = store =>
  Object.keys(store).reduce((result, key) => {
    result[key] = store[key].toJson()
    return result
  }, {})

module.exports = async (bundle, template, css, ctx, stats) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = {
    url: ctx.path,
    user: ctx.session.user || null
  }
  const createApp = bundle.default
  const createStoreMap = bundle.createStoreMap
  const store = createStoreMap()
  const modules = []
  try {
    const app = await createApp(context, ctx.url, store, ctx.path, modules)
    const appString = ReactDomServer.renderToString(app)
    if (context.action && context.action === 'REPLACE') {
      return ctx.redirect(context.location.pathname)
    }
    const helmet = Helmet.renderStatic()
    const bundles = getBundles(stats, modules)
    let cssString = css['server.css']

    const bundleTemplate = bundles.map(bundle => {
      const name = bundle.file.substring(bundle.file.lastIndexOf('/') + 1, bundle.file.indexOf('.'))

      if (bundle.publicPath.endsWith('js')) {
        return `<script id="server-scripts" src="${bundle.publicPath}"></script>`
      } else if (bundle.publicPath.endsWith('css')) {
        cssString += css[`server.${name}.css`]
      }
    }).join('\n')
    const html = template
      .replace('<!-- react-ssr-title -->', helmet.title.toString())
      .replace('<!-- react-ssr-meta -->', helmet.meta.toString())
      .replace('/* react-ssr-style */', cssString)
      .replace('<!-- react-ssr-outlet -->', appString)
      .replace('// react-ssr-state', JSON.stringify(getStore(store)))
      .replace('<!-- react-ssr-scripts -->', bundleTemplate)
    ctx.body = html
  } catch (err) {
    console.log('render error:', err)
    throw err
  }
}
