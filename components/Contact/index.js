import styles from './Contact.module.css'
import SMLinks from '../_UI/SMLinks'

const Contact = (props) => {
  const className = props?.className ? props.className : ''
  return (
    <div
      className={`${styles.Contact} Contact bg-success-light d-flex align-items-center py-2 px-5 justify-content-around flex-wrap ${className}`}
    >
      <h2 className='text-white'>{'تواصلوا معنا عبر'}</h2>
      <div className={`${styles.devider} devider bg-white`} />
      <SMLinks row={true} className={`${styles.SMLinks} flex-row-reverse`} />
    </div>
  )
}

export default Contact
