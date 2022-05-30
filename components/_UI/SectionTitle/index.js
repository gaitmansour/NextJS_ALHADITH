import React from 'react'

import styles from './SectionTitle.module.css'

const SectionTitle = (props) => {
  return (
    <div
      className={`${
        styles.sectionTitleBox
      } section-title-box d-flex justify-content-center align-items-center ${
        props?.className ? props.className : ''
      }`}
      style={props?.style}
    >
      <h2 className='pt-2 m-0 text-dark'>{props?.title || 'عنوان!'}</h2>
    </div>
  )
}

export default SectionTitle
