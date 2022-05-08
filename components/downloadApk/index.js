import React from 'react'
import styles from './downloadAPK.module.css'
import { Icons } from '../../assets'
import Image from 'next/image'
import Link from 'next/link'

const DownloadApk = () => {
  return (
    <div className={`${styles.mobile} container`}>
      <Image src={Icons.icon_mobil} alt='' className={styles.iconMobile} />
      <div className={`container ${styles.downloadApk}`}>
        <div className={`${styles.download} p-4`}>
          <h4 className={`${styles.titleSec} `}>
            {'تحميل التطبيق الخاص بمنصة محمد السادس للحديث الشريف'}
          </h4>
          <div className={`${styles.iconGroup}`}>
            <Link href='https://play.google.com/store/apps/details?id=com.hadithApp'>
              <a target='_blank' rel='noreferrer'>
                <Image
                  src={Icons.icon_googlPlay}
                  alt=''
                  className={styles.dwdApk}
                />
              </a>
            </Link>

            {/* <Image src={Icons.icon_appStor} alt='' className={styles.dwdApk} />*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadApk
