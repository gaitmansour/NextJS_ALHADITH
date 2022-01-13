import React from 'react'
import styles from './Badgs.module.css'

const Badgs = (props) => {
  return (
    <div>
      {props.tags?.length > 0 && (
        <span class={`${styles.badge} rounded-pill bg-success my-2 mx-1`}>
          {props.tags}
        </span>
      )}
    </div>
  )
}

export default Badgs
