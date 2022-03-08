import Link from 'next/link'
import Image from 'next/image'
import { Logos } from '../../../assets'
import styles from './Brand.module.css'
import React from 'react'

const Brand = (props) => {
  const className = props?.className ? props.className : ''
  return (
    <div className={`my-0 ${className} ${styles.logo}`}>
      <Link href='/' passHref={true}>
        <Image
          src={Logos.logo_web}
          width={230}
          height={120}
          // width={16}
          // height={9}
          quality={65}
          alt='logo-Al-hadith-Mohammed-VI'
        />
      </Link>
    </div>
  )
}

export default Brand
