import React, { useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'
import styles from './ScrollButton.module.css'

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 600) {
      setVisible(true)
    } else if (scrolled <= 600) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
        /* you can also use 'auto' behaviour
                    in place of 'smooth' */
      })
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', toggleVisible)
  }

  return (
    <div className={styles.backToTop}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        fill='#129D59'
        className={`${styles.iconToTop} bi bi-arrow-up-square-fill`}
        viewBox='0 0 16 16'
        alt='العودة لأعلى الموقع'
        onClick={() => scrollToTop()}
        style={{ display: visible ? 'block' : 'none' }}
      >
        <path d='M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z' />
      </svg>
    </div>
  )
}

export default ScrollButton
