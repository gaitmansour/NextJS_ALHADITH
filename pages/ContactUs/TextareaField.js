import React from 'react'
import { ErrorMessage } from 'formik'
import styles from './ContactUs.module.css'

const TextareaField = ({ label, name, error, ...props }) => {
  return (
    <div className={`${styles.inputField} mb-4`}>
      <label className='' htmlfor={name}>
        {label}
      </label>
      <textarea
        className={`form-control shadow-none rounded `}
        name={name}
        {...props}
        rows='5'
      ></textarea>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}

export default TextareaField
