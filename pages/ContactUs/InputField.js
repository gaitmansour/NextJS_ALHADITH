import React from 'react'
import { ErrorMessage } from 'formik'
import styles from './ContactUs.module.css'

const InputField = ({ label, name, error, ...props }) => {
  return (
    <div className={`${styles.inputField} mb-4`}>
      <label className='' htmlfor={name}>
        {label}
      </label>
      <input
        className={`${styles.inputF} form-control shadow-none p-2 mt-1 mb-1 bg-body rounded `}
        name={name}
        {...props}
        autoComplete='off'
      />

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}

export default InputField
