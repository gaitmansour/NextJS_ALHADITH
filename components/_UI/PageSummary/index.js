import React from 'react'
import styles from './PageSummary.module.css'

const PageSummary = (props) => {
  const className = props?.className ? props.className : ''
  return (
    <div className={`${styles.SummaryPage} SummaryPage ${className}`}>
      <summary className={`${styles.summary} summary m-0 text-success`}>
        {props?.summary || ''}
      </summary>
    </div>
  )
}

export default PageSummary
