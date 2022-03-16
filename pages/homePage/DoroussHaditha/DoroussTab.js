import React, { useEffect, useState } from 'react'
import { Backgrounds } from '../../../assets'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import _ from 'lodash'
import Loading from '../../../components/_UI/Loading'
import styles from './DoroussHaditha.module.css'
import { base_url, getVideoDorouss } from '../../../endpoints'
import FetchAPI from '../../../API'
import $ from 'jquery'
import ReactPlayer from 'react-player'
import { Icons } from '../../../assets'
import Image from 'next/image'

const DoroussTab = ({ title }) => {
  const url = getVideoDorouss(title)
  const [dataAPI, setDataAPI] = useState([])
  const [start, setStart] = useState(false)

  useEffect(() => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
      console.log('dataaaa D.H ===>', dataAPI)
    })
  }, [])

  const settings = {
    dots: true,
    infinite: dataAPI?.data?.length > 2,
    autoplay: true,
    slidesToShow: dataAPI?.data?.length > 3 ? 3 : dataAPI?.data?.length,
    slidesToScroll: 2,
    arrows: false,
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
      if (_.isEmpty(dataAPI)) {
        return (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        )
      } else {
        if (dataAPI?.data?.length > 0) {
          return dataAPI?.data?.map((item, i) => {
            var leng = dataAPI.included.length
            console.log('-item----', item)

            return (
              <div
                key={i.toString()}
                className={`${styles.itemCard} mt-4 mb-2`}
              >
                {/* <div className={`${styles.playerWrapper} player-wrapper `}>
                  <ReactPlayer
                    url={[
                      {
                        src: `${base_url}${
                          dataAPI?.included[i + leng / 2]?.attributes?.uri?.url
                        }`,
                        type: 'video/mp4',
                      },
                    ]}
                    key={[
                      {
                        src: `${base_url}${
                          dataAPI?.included[i + leng / 2]?.attributes?.uri?.url
                        }`,
                        type: 'video/mp4',
                      },
                    ]}
                    light={`${base_url}${dataAPI?.included[i]?.attributes?.uri?.url}`}
                    controls
                    playing
                    className={`${styles.reactPlay} react-player`}
                    width='90%'
                    height='90%'
                  />
                </div> */}
                <Link
                  href={{
                    pathname: `/media/${title}`,
                    search: '',
                    hash: '',
                    query: {
                      _id: item?.id,
                      video:
                        dataAPI?.included[i + leng / 2]?.attributes?.uri?.url,
                    },
                  }}
                  as={`/media/${title}`}
                >
                  <a className='text-decoration-none'>
                    <Image
                      src={dataAPI?.included[i]?.attributes?.uri?.url}
                      className='m-auto w-100 my-4'
                      objectFit='cover'
                      width={850}
                      height={500}
                      loader={myLoader}
                      alt={title}
                    />
                    <p className='text-center fw-bold description text-black'>
                      {item?.attributes?.title}
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
