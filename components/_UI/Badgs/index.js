import React from 'react'
import styles from './Badgs.module.css'

const Badgs = (props) => {
  return (
    <div className='my-2'>
      {props.tags?.length > 0 && (
        <span class={`${styles.badge} rounded-pill bg-success`}>
          {props.tags}
        </span>
      )}
    </div>
  )
}

export default Badgs
