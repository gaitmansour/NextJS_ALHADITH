import React from 'react'
import styles from './downloadAPK.module.css'
import { Icons } from '../../assets'
import Image from 'next/image'

const DownloadApk = () => {
  return (
    <div className={`${styles.mobile} container`}>
      <Image src={Icons.icon_mobil} alt='' className={styles.iconMobile} />
      <div className={`container ${styles.downloadApk}`}>
        <div className={`${styles.download} p-4`}>
          <h4 className={`${styles.titleSec} `}>
            {'تحميل التطبيق الخاص بمنصة محمد السادس للحديث النبوي الشريف'}
          </h4>
          <div className={`${styles.iconGroup}`}>
            <Image
              src={Icons.icon_googlPlay}
              alt=''
              className={styles.dwdApk}
            />
           {/* <Image src={Icons.icon_appStor} alt='' className={styles.dwdApk} />*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadApk
