import Link from 'next/link'
import Image from 'next/image'
import { Logos } from '../../../assets'
import styles from './Brand.module.css'
import React from 'react'

const Brand = (props) => {
  const className = props?.className ? props.className : ''
  return (
    <div className={`my-2 ${className} ${styles.logo}`}>
      <Link href='/' passHref={true}>
        <Image src={Logos.logo_new} alt='logo-Al-hadith-Mohammed-VI' />
      </Link>
    </div>
  )
}

export default Brand
