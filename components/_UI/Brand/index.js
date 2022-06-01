import Link from 'next/link'
import Image from 'next/image'
import { Logos } from '../../../assets'
import styles from './Brand.module.css'
import React from 'react'

const Brand = React.forwardRef(({ onClick, href }, ref, props) => {
  const className = props?.className ? props.className : ''
  return (
    <div className={`my-0 ${className} ${styles.logo}`}>
      {/* <Link href='/' passHref={true}> */}
      <a href={href} onClick={onClick} ref={ref}>
        <Image
          src={Logos.logo_hadith_m6}
          objectFit='cover'
          width={230}
          height={120}
          // width={16}
          // height={9}
          quality={95}
          alt='logo-Al-hadith-Mohammed-VI'
        />
      </a>
      {/* </Link> */}
    </div>
  )
})

export default Brand
