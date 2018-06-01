import App from './views/App'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import { createStoreMap } from './store'
import routes from './routes'
import React from 'react'
import Loadable from 'react-loadable'

useStaticRendering(true)

export { createStoreMap }

export default (context, url, store, path, modules) =>
  new Promise((resolve, reject) => {
    const promises = []
    routes.some(route => {
      const match = matchPath(path, route)
      if (match && typeof route.loadData === 'function') promises.push(route.loadData({ store, route: match }))
      return match
    })

    Promise.all(promises).then(data => {
      resolve(
        <Provider {...store}>
          <StaticRouter context={context} location={url}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <App />
            </Loadable.Capture>
          </StaticRouter>
        </Provider>
      )
    })
  })
