import { useEffect, useState } from 'react'
import styles from './Videos.module.css'
import { Icons } from '../../../assets'
import VideosList from '../../../data/VideosList'
import useTranslation from 'next-translate/useTranslation'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { getLive } from '../../../endpoints'
import _ from 'lodash'
import FetchAPI from '../../../API'
import Moment from 'moment'
import SectionTitle from '../../../components/_UI/SectionTitle'
import PrayTimes from '../../../components/_Advanced/PrayTimes'
import Image from 'next/image'
import Loading from '../../../components/_UI/Loading'
import React from 'react'

const Videos = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          dots: false,
          rows: 2,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 771,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 1,
          rows: 1,
          infinite: true,
          centerPadding: '2px',
        },
      },
    ],
  }
  var myCurrentDate = new Date()
  var curD = Moment(myCurrentDate).format('YYYY-MM-DDTHH:mm:ssZ')
  const { t } = useTranslation('Videos')

  const [data, setData] = useState([])

  const [ApiData, setDataAPI] = useState({})
  const url = getLive()

  const getData = async () => {
    FetchAPI(url).then((data1) => {
      if (data1.success) {
        setDataAPI(data1.data)
      }
    })
  }

  useEffect(() => {
    getData()
    setData(VideosList)
  }, [])

  try {
    if (!data?.length > 0) {
      return (
        <div className='d-flex align-items-center justify-content-center py-5'>
          <Loading />
        </div>
      )
    }
  } catch (error) {
    console.log(`CATCH Videos ${error}`)
  }
  console.log('ApiData----', ApiData)

  var Exist = []
  if (!_.isEmpty(ApiData)) {
    var Exist = ApiData.filter(
      (item) =>
        Moment(item.field_date_debut, 'YYYY-MM-DDTHH:mm:ssZ').format() <=
          curD &&
        curD < Moment(item.field_date_fin, 'YYYY-MM-DDTHH:mm:ssZ').format()
    )
  }
  return (
    <div className={`${styles.container} container Videos px-lg-5 py-5 mx-7`}>
      <Link
        passHref={true}
        href={'../AllMedia'}
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
              <div className={`${styles.divA} divA position-relative`}>
                {/* <Image
                  src={Icons.icon_bg_dashed_tr}
                  alt=''
                  width={100}
                  height={100}
                  className={`${styles.imgTR} imgTR`}
                /> */}
                <Link href={'/media/الدروس الحسنية'} as='/media/الدروس الحسنية'>
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
              <div className={`${styles.divB} divB position-relative`}>
                {/* <Image
                  src={Icons.icon_bg_dashed_br}
                  alt=''
                  // width="18%"
                  className={`${styles.imgBR} imgBR`}
                  // className="imgBR"
                /> */}
                <Link
                  href={'/media/الدروس الحديثية'}
                  as='/media/الدروس الحديثية'
                >
                  <a>
                    <Image
                      src={Icons.icon_dorouss_hadita}
                      alt='الدروس-الحديثية'
                      // width="30%"
                      //   className='my-3'
                      style={{ marginRight: '38%' }}
                    />
                    <h3 style={{ width: '100%', marginRight: '30%' }}>
                      الدروس الحديثية
                    </h3>
                  </a>
                </Link>
              </div>
            </div>
            <div className={`${styles.secBottom} d-flex  secBottom`}>
              <div className={`${styles.div1} div1 position-relative`}>
                {/* <Image
                  src={Icons.icon_bg_dashed_tr}
                  //width="30%"
                  alt='برامج-تلفزية'
                  //className={`${styles.imgdiv1} imgdiv1`}
                /> */}
                <Link href={'/media/برامج تلفزية'} as='/media/برامج تلفزية'>
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
              <div className={`${styles.div2} div2 position-relative`}>
                {/* <Image
                  src={Icons.icon_bg_dashed_tr}
                  alt='برامج-اذاعية'
                  // width="22%"
                  //className={`${styles.imgdiv2} imgdiv2`}
                /> */}
                <Link href={'/media/برامج اذاعية'} as='/media/برامج اذاعية'>
                  <a>
                    <Image
                      src={Icons.icon_media}
                      alt=''
                      //width="55%"
                      //className="my-3"
                      style={{ marginRight: '55%' }}
                    />
                    <h3 style={{ width: '100%', marginRight: '45%' }}>
                      برامج اذاعية
                    </h3>
                  </a>
                </Link>
              </div>
              <div className={`${styles.div3} div3 position-relative`}>
                {/* <Image
                  src={Icons.icon_bg_dashed_tl}
                  alt=''
                  //width="20%"
                  className={`${styles.imgdiv3} imgdiv3`}
                  // className="imgdiv3"
                /> */}
                <Link
                  href={'/media/برامج على الشبكات الاجتماعية'}
                  as='/media/برامج على الشبكات الاجتماعية'
                >
                  <a>
                    <Image
                      src={Icons.icon_res_sociaux}
                      alt=''
                      // width="28%"
                      // className="my-3"
                      style={{ marginRight: '31%' }}
                    />
                    <h3 style={{ width: '85%', marginRight: '28%' }}>
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
