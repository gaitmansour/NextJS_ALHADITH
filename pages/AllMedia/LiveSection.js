import React, { useEffect, useState } from 'react'
import { BsBroadcast } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { base_url, getLive } from '../../endpoints'
import FetchAPI from '../../API'
import styles from './AllMedia.module.css'
import Image from 'next/image'
import Moment from 'moment'
import { Icons } from '../../assets'
import { BsCalendar2Date } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const LiveSection = () => {
  const [dataLive, setDataLive] = useState([])
  const [isLoding, setIsLoding] = useState(false)
  const urlLive = getLive()
  const settings = {
    // infinite: props?.data?.length > 3,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    rows: 3,
    slidesPerRow: 1,
  }
  var myCurrentDate = new Date().getHours()

  const getDataLive = async () => {
    try {
      setIsLoding(true)
      FetchAPI(urlLive).then((data) => {
        if (data.success) {
          setDataLive(data?.data)
          setIsLoding(false)
        }
      })
      console.log('data Live ==>', dataLive)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDataLive()
  }, [])

  /////// loader Image
  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }

  //// data current
  var myCurrentDate = new Date()
  var curD = Moment(myCurrentDate).format('YYYY-MM-DDTHH:mm:ss')
  // console.log('current Date ', curD)

  ///// filter live by date
  let currentLive = dataLive?.filter(
    (item) =>
      curD == Moment(item.field_date_debut, 'YYYY-MM-DDTHH:mm:ss').format() ||
      (curD >= Moment(item.field_date_debut, 'YYYY-MM-DDTHH:mm:ss').format() &&
        curD <= Moment(item.field_date_fin, 'YYYY-MM-DDTHH:mm:ss').format())
  )

  console.log('CurrentLive =>', currentLive)
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <BsBroadcast color='#ff6b62' size={50} />
        <h2 className='mx-5 mt-2'>{'البث المباشر'}</h2>
      </div>
      {dataLive?.filter(
        (item) =>
          curD < Moment(item.field_date_fin, 'YYYY-MM-DDTHH:mm:ss').format()
      )?.length > 0 ? (
        <div className={`${styles.secLive} row`}>
          {currentLive.length > 0 ? (
            <div className='col col-12 col-lg-9 col-md-8 col-sm-1 my-2'>
              <div className={`${styles.playerWrapper} player-wrapper`}>
                <ReactPlayer
                  url={currentLive[0]?.field_lien_live}
                  // light={`${base_url}/${dataLive[2]?.field_thumbnail_live}`}
                  controls
                  playing={true}
                  className={`${styles.reactPlayer} react-player`}
                  width='95%'
                  height='95%'
                />
              </div>
              <h3 className='text-success fw-bold '>{currentLive[0]?.title}</h3>
              <p className=''>{currentLive[0]?.field_description_live}</p>
            </div>
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <Image
                src={Icons.icon_video}
                alt=''
                className={'ImageSlider my-4'}
                width='100%'
                height='100%'
              />
              <h4 className='mt-3 mb-4'>{'لا يوجد أي بث مباشر حاليا'}</h4>
            </div>
          )}
          <div className='col col-12 col-lg-3 col-md-4 col-sm-1 my-2'>
            <div className={styles.titleSecLive}>{'البث المباشر'}</div>

            <div dir='rtl' className={styles.allLive}>
              <Slider {...settings}>
                {dataLive
                  ?.filter(
                    (item) =>
                      curD <
                      Moment(
                        item.field_date_fin,
                        'YYYY-MM-DDTHH:mm:ss'
                      ).format()
                  )
                  ?.map((item, index) => {
                    return (
                      <div key={index} dir='rtl'>
                        <div
                          dir='rtl'
                          className='d-flex justify-content-between align-items-center'
                        >
                          <div>
                            <div className='d-flex'>
                              <BsCalendar2Date color='#ff6b62' size={20} />
                              <p className='mx-2 '>
                                {Moment(
                                  item?.field_date_debut,
                                  'YYYY-MM-DDTHH:mm:ss'
                                ).format('DD/MM/YYYY')}
                              </p>
                            </div>
                            <div className='d-flex'>
                              <BiTimeFive color='#ff6b62' size={20} />
                              <p className='mx-2'>
                                {Moment(
                                  item.field_date_debut,
                                  'YYYY-MM-DDTHH:mm:ss'
                                ).format('HH:mm')}
                              </p>
                            </div>
                          </div>
                          <Image
                            loader={myLoader}
                            src={item?.field_thumbnail_live}
                            //   className='mx-2'
                            alt=''
                            objectFit='cover'
                            width={220}
                            height={120}
                            quality={65}
                          />
                        </div>
                        <h4 className='h6 fw-bold my-3 mb-5'>{item?.title}</h4>
                      </div>
                    )
                  })}
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <Image
            src={Icons.icon_video}
            alt=''
            className={'ImageSlider my-4'}
            width='100%'
            height='100%'
          />
          <h4 className='mt-3 mb-4'>{'لا يوجد أي بث مباشر'}</h4>
        </div>
      )}
    </div>
  )
}

export default LiveSection
