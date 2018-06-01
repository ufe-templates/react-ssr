import React from 'react'
import styles from './index.styl'

export default function Loading (props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>
    } else if (props.pastDelay) {
      return (
        <div className={styles.spinner}>
          <div className={styles.dot1} />
          <div className={styles.dot2} />
        </div>
      )
    } else {
      return null
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>
  } else {
    return null
  }
}
