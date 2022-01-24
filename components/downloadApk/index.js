import React from 'react'
import styles from './downloadApk.module.css'
import { Icons } from '../../assets'
import Image from 'next/image'

const DownloadApk = () => {
  return (
    <div className={`${styles.downloadApp} container`}>
      <Image src={Icons.icon_mobil} alt='' />
      <div className={` ${styles.downloadApk}`}>
        <div className={styles.download}>
          <Image
            src={Icons.icon_googlPlay}
            alt=''
            className={`${styles.dwdApk}`}
          />
          <Image
            src={Icons.icon_appStor}
            alt=''
            className={`${styles.dwdApk} `}
          />
        </div>
      </div>
    </div>
  )
}

export default DownloadApk
