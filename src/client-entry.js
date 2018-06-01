import App from './app'
import React from 'react'
import ReactDom from 'react-dom'
import Loadable from 'react-loadable'

Loadable.preloadReady().then(() => {
  ReactDom.hydrate(<App />, document.getElementById('app'))
})
