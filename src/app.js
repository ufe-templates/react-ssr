import App from './views/App'
import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import AppState from './store/app-state'

const initialState = window.__INITIAL_STATE__ || {}
const appState = new AppState(initialState.appState)

class ClientApp extends Component {
  componentDidMount () {
    const css = document.getElementById('react-ssr-style')
    if (css && css.parentNode) {
      css.parentNode.removeChild(css)
    }
    // const serverScripts = document.querySelectorAll('#server-scripts')
    // serverScripts.forEach(script => {
    //   if (script && script.parentNode) {
    //     script.parentNode.removeChild(script)
    //   }
    // })
  }

  render () {
    return (
      <Provider appState={appState}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(module)(ClientApp)
