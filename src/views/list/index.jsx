import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import styles from './index.styl'

@inject('appState')
@observer
class List extends Component {
  static propTypes = {
    appState: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className={styles.container}>
        <Helmet>
          <title>前端论坛</title>
          <meta name='description' content='node 论坛 列表' />
        </Helmet>
        {this.props.appState.msg}
        <div className={styles.operation}>
          <button onClick={() => this.props.appState.add()}>add</button>
          <button onClick={() => this.props.appState.minus()}>minus</button>
        </div>
      </div>
    )
  }
}

export default List
