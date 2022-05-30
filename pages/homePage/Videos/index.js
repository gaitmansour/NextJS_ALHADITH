import React from 'react'
import styles from './Videos.module.css'
import { Icons } from '../../../assets'
import Link from 'next/link'
import _ from 'lodash'
import SectionTitle from '../../../components/_UI/SectionTitle'
import PrayTimes from '../../../components/_Advanced/PrayTimes'
import Image from 'next/image'

const Videos = () => {
  return (
    <div className={`${styles.container} container Videos px-lg-5 py-5 mx-7`}>
      <Link
        passHref={true}
        href={{
          pathname: '/AllMedia',
          query: { title: 'التلفزة الرقمية' },
        }}
        as='/AllMedia'
        style={{ textDecoration: 'none' }}
      >
        <a style={{ textDecoration: 'none' }}>
          <SectionTitle title={'التلفزة الرقمية'} className='' />
        </a>
      </Link>
      <div className={`row h-100`}>
        <div className={`${styles.alignSec} Bslick col-md-7 mt-4 alignSec`}>
          <div className={`${styles.sec} sec w-100 h-100`}>
            <div className={`${styles.secTop} d-flex  secTop`}>
              <div
                className={`${styles.divA} divA position-relative`}
                onClick={() => {
                  localStorage.setItem('_id', JSON.stringify('52'))
                }}
              >
                <Link href={'/media/الدروس-الحسنية'} as='/media/الدروس-الحسنية'>
                  <a>
                    <Image
                      src={Icons.icon_dorouss_hassania}
                      alt='الدروس-الحسنية'
                      //   width='45%'
                    />
                    <h3>الدروس الحسنية</h3>
                  </a>
                </Link>
              </div>
              <div
                className={`${styles.divB} divB`}
                onClick={() => {
                  localStorage.setItem('_id', JSON.stringify('51'))
                }}
              >
                <Link
                  href={'/media/الدروس-الحديثية'}
                  as='/media/الدروس-الحديثية'
                >
                  <a>
                    <Image
                      src={Icons.icon_dorouss_hadita}
                      alt='الدروس-الحديثية'
                    />
                    <h3
                      className='mt-3'
                      style={{ width: '100%', marginRight: '10%' }}
                    >
                      الدروس الحديثية
                    </h3>
                  </a>
                </Link>
              </div>
            </div>
            <div className={`${styles.secBottom} d-flex  secBottom`}>
              <div
                className={`${styles.div1} div1 position-relative`}
                onClick={() => {
                  localStorage.setItem('_id', JSON.stringify('53'))
                }}
              >
                <Link href={'/media/برامج-تلفزية'} as='/media/برامج-تلفزية'>
                  <a>
                    <Image
                      src={Icons.icon_tv}
                      alt=''
                      //width="50%"
                      // className="my-3"
                    />
                    <h3>برامج تلفزية</h3>
                  </a>
                </Link>
              </div>
              <div
                className={`${styles.div2} div2 position-relative`}
                onClick={() => {
                  localStorage.setItem('_id', JSON.stringify('54'))
                }}
              >
                <Link href={'/media/برامج-اذاعية'} as='/media/برامج-اذاعية'>
                  <a>
                    <Image
                      src={Icons.icon_media}
                      alt=''
                      //width="55%"
                      className={styles.iconMedia}
                    />
                    <h3 style={{ width: '100%', marginRight: '10%' }}>
                      برامج اذاعية
                    </h3>
                  </a>
                </Link>
              </div>
              <div
                className={`${styles.div3} div3 position-relative`}
                onClick={() => {
                  localStorage.setItem('_id', JSON.stringify('55'))
                }}
              >
                <Link
                  href={'/media/برامج-على-الشبكات-الاجتماعية'}
                  as='/media/برامج-على-الشبكات-الاجتماعية'
                >
                  <a>
                    <Image
                      src={Icons.icon_res_sociaux}
                      alt=''
                      // width="28%"
                      className={styles.icomRess}
                    />
                    <h3 style={{ width: '100%', marginRight: '5%' }}>
                      برامج على الشبكات الاجتماعية
                    </h3>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-5 praytime'>
          <PrayTimes />
        </div>
      </div>
    </div>
  )
}

export default Videos
