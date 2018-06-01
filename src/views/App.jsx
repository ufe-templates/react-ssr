import React, { Component } from 'react'
import routes from '../routes'
import { Route, withRouter, NavLink } from 'react-router-dom'
import '../assets/styl/reset.styl'
import styles from './App.styl'

class App extends Component {
  render () {
    return (
      <div>
        <div className={styles.navs}>
          <NavLink activeClassName={styles.active} to='/list'>list</NavLink>
          <NavLink activeClassName={styles.active} to='/item'>item</NavLink>
        </div>
        {routes.map(route => <Route key={route.path} {...route} />)}
      </div>
    )
  }
}

export default withRouter(App)
