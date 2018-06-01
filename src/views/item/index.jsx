import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import styles from './index.styl'

class Item extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Helmet>
          <title>博客详情</title>
          <meta name='description' content='node 博文' />
        </Helmet>
        item
      </div>
    )
  }
}

export default Item
