import React from 'react'
import { useField, ErrorMessage } from 'formik'
import styles from './ContactUs.module.css'

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  //   console.log('field', field)
  return (
    <div className={`${styles.inputField} mb-4`}>
      <label className='' htmlfor={field.name}>
        {label}
      </label>
      <input
        className={`${
          styles.inputF
        } form-control shadow-none p-2 mt-1 mb-1 bg-body rounded ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        {...field}
        {...props}
        autoComplete='off'
      />
      <ErrorMessage
        component='dev'
        name={field.name}
        className={styles.error}
      />
    </div>
  )
}

export default InputField
