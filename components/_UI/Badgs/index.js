import React from 'react'
import styles from './Badgs.module.css'

const Badgs = (props) => {
  return (
    <div>
      {props.tags?.length > 0 && (
        <span class={`${styles.badge} rounded-pill bg-success mx-3`}>
          {props.tags}
        </span>
      )}
    </div>
  )
}

export default Badgs
