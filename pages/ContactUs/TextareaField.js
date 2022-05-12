import React from 'react'
import { useField, ErrorMessage } from 'formik'
import styles from './ContactUs.module.css'

const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  //   console.log('field', field)
  return (
    <div className={`${styles.inputField} mb-4`}>
      <label className='' htmlfor={field.name}>
        {label}
      </label>
      <textarea
        className={`form-control shadow-none rounded ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        {...field}
        {...props}
        rows='5'
      ></textarea>
      <ErrorMessage
        component='dev'
        name={field.name}
        className={styles.error}
      />
    </div>
  )
}

export default TextareaField
