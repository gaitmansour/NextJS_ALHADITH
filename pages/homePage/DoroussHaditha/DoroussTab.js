import React, { useEffect, useState } from 'react'
import { Backgrounds } from '../../../assets'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import _ from 'lodash'
import Loading from '../../../components/_UI/Loading'
import styles from './DoroussHaditha.module.css'
import {
  base_url,
  getVideoByParent,
  getVideoDorouss,
  getVideoMedia,
} from '../../../endpoints'
import FetchAPI from '../../../API'
import $ from 'jquery'
import ReactPlayer from 'react-player'
import { Icons } from '../../../assets'
import Image from 'next/image'

const DoroussTab = ({ title, tid }) => {
  const url = getVideoMedia(title)
  const [dataAPI, setDataAPI] = useState([])
  const [isLoding, setIsLoding] = useState(false)
  const [start, setStart] = useState(false)
  const urlgetData = getVideoByParent(null, tid)

  useEffect(() => {
    try {
      setIsLoding(true)
      FetchAPI(urlgetData).then((data) => {
        if (data.success) {
          setDataAPI(data?.data)
          setIsLoding(false)
          console.log('dataaaa D.H ===>', data?.data)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [tid])

  // useEffect(() => {
  //   try {
  //     setIsLoding(true)
  //     FetchAPI(url).then((data) => {
  //       if (data.success) {
  //         setDataAPI(data?.data)
  //         setIsLoding(false)
  //         console.log('dataaaa D.H ===>', data?.data)
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    slidesToShow: dataAPI?.length > 3 ? 3 : dataAPI?.length,
    slidesToScroll: 2,
    arrows: false,
    speed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          centerPadding: '10px',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }
  const renderData = () => {
    try {
      if (isLoding) {
        return (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        )
      } else {
        if (dataAPI?.length > 0) {
          return dataAPI?.map((item, i) => {
            console.log('-item----', item)

            return (
              <div
                key={i.toString()}
                className={`${dataAPI?.length <= 2 ? styles.newWidth : ''} ${
                  styles.itemCard
                } mt-4 mb-2`}
                onClick={() => {
                  localStorage.setItem('tid', JSON.stringify(tid))
                }}
                dir='rtl'
              >
                <Link
                  href={{
                    pathname: `/media/${title.split(' ').join('-')}`,
                    search: '',
                    hash: '',
                    query: {
                      video: item?.field_upload_video
                        ? item?.field_upload_video
                        : item?.field_lien_video,
                      light: item?.field_thumbnail_video,
                      titleVideo: item?.title,
                    },
                  }}
                  as={`/media/${title.split(' ').join('-')}`}
                >
                  <a className='text-decoration-none'>
                    <Image
                      src={item?.field_thumbnail_video}
                      className=''
                      objectFit='cover'
                      width={10}
                      height={6}
                      layout='responsive'
                      quality={65}
                      loader={myLoader}
                      alt={title}
                    />
                    <p
                      className={`${styles.titleVideo} my-3 text-center fw-bold description text-black`}
                    >
                      {item?.title}
                    </p>
                  </a>
                </Link>
              </div>
            )
          })
        } else {
          return (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <Image
                src={Icons.icon_video}
                alt=''
                className={'ImageSlider my-4'}
                width='100%'
                height='100%'
              />
              <h4 className='mt-3 mb-4'>{'لا توجد نتائج'}</h4>
            </div>
          )
        }
      }
    } catch (error) {
      console.log(`CATCH Alhadiths ${error}`)
    }
  }

  return (
    <>
      <div
        className={`${styles.Alhadiths}  overflow-hidden position-relative `}
      >
        <div className='bg-blue-100'>
          <div className='container'>
            <div
              className='bg-arabic-design h-100 w-100'
              style={{
                backgroundImage: `url(${Backgrounds.bg_arabic_design})`,
                opacity: 0.7,
              }}
            />
            <Slider {...settings} className='slide mb-4'>
              {renderData()}
            </Slider>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoroussTab
