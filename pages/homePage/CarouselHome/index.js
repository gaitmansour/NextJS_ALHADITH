import React, { useEffect, useState } from 'react'
import styles from './CarouselHome.module.css'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import _ from 'lodash'
import {
  getCarousel,
  base_url,
  getSlider,
  getMenuByName,
  getArticleByIdName,
} from '../../../endpoints'
import FetchAPI from '../../../API'
import { Carousel } from 'react-bootstrap'
import Loading from '../../../components/_UI/Loading'
import SMLinks from '../../../components/_UI/SMLinks'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const CarouselHome = (props) => {
  const [dataAPI, setDataAPI] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newData, setNewData] = useState([])
  const { t, i18n } = useTranslation('home')
  const isRTL = i18n?.language === 'ar'
  const getLanguage = isRTL ? 'ar' : 'fr'
  const more = 'اقرأ المزيد'
  const url = getCarousel()
  const urlSlider = getSlider()

  const getDataSliderHome = () => {
    setIsLoading(true)
    try {
      FetchAPI(urlSlider).then((data) => {
        if (data.success) {
          setDataAPI(data?.data)
          setIsLoading(false)
        }
      })
    } catch (error) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getDataSliderHome()
  }, [])
  useEffect(() => {
    setNewData(_.sortBy(dataAPI, 'field_ordre_slider'))
  }, [isLoading, dataAPI])

  let settings = {
    dotsClass: 'vertical-dots',
    dots: true,
    infinite: newData.length > 3,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 771,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dotsClass: 'vertical-dots',
          dots: true,
        },
      },
      {
        breakpoint: 495,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dotsClass: 'vertical-dots',
          dots: true,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dotsClass: 'vertical-dots',
          dots: true,
          // centerMode: true,
          // centerPadding: '60px',
          // className: 'center',
        },
      },
      {
        breakpoint: 380,
        settings: {
          //   centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dotsClass: 'vertical-dots',
          dots: true,
        },
      },
    ],
  }

  const getData = async (x) => {
    return FetchAPI(getArticleByIdName(x)).then((data) => {
      if (data.success) {
        let array = data?.data?.included.filter(
          (item) => item.type === 'taxonomy_term--alahadyt'
        )

        return array[0]?.attributes?.name
      }
    })
  }
  const getDataMenu = async (x) => {
    getData(x).then((r) => {
      FetchAPI(getMenuByName(r)).then((data) => {
        if (data.success) {
          localStorage.setItem(
            'categorieTitle',
            JSON.stringify({
              tidChild: data?.data[0]?.tid,
              parent: data?.data[0]?.parent_target_id_1,
              child: data?.data[0]?.name_1,
              contenuArticle:
                data?.data[0]?.field_contenu_default !== ''
                  ? data?.data[0]?.field_contenu_default
                  : x,
            })
          )
          localStorage.setItem(
            'tid',
            JSON.stringify(data?.data[0]?.parent_target_id)
          )
        }
      })
    })
  }

  return (
    <div
      className={`${styles.CarouselHome} ${styles.carouselIndicators} CarouselHome d-flex`}
    >
      <div
        className={`${styles.carouselControlBox} position-relative carousel-control-box ${styles.wpx100} wpx-100 d-flex flex-column justify-content-end py-5`}
      >
        <SMLinks className='smLinks' />
      </div>
      {isLoading ? (
        <div className='d-flex align-items-center justify-content-center py-5'>
          <Loading />
        </div>
      ) : (
        <Slider {...settings} className={`w-100 slide`}>
          {newData?.map((item, index) => {
            const toShow = item?.body_1
              ?.split(' ')
              .slice(0, 20)
              .join(' ')
              .concat('...')
            if (item.field_image.includes('src=')) {
              var str = item.field_image
                .substr(item.field_image.lastIndexOf('src='))
                .split(' ')[0]
                .slice(5)
              var element2 = str.slice(0, -1)
            }

            return (
              <Carousel.Item
                key={index.toString()}
                className={`${styles.ImgSlide} w-100 `}
              >
                <Image
                  src={`${base_url}/${element2}`}
                  // loader={myLoader}
                  alt={''}
                  // layout='fill'
                  objectFit='cover'
                  height={1850}
                  width={5000}
                  quality={70}
                  // priority
                />

                <div
                  className={`${styles.carouselCaption} px-4 carousel-caption d-md-block`}
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.8,
                    marginLeft: 150,
                  }}
                >
                  <Link
                    href={{
                      pathname: '/article/' + item?.title?.split(' ').join('-'),
                      query: {
                        from: 'CarouselHome',
                        selectedItem: item?.term_node_tid,
                        contenuArticle: '',
                      },
                    }}
                    as={'/article/' + item?.title?.split(' ').join('-')}
                  >
                    <a className='text-decoration-none text-black'>
                      <p>{toShow}</p>
                      <button
                        role={'button'}
                        className={`${styles.btn} linksCarousel btn bg-success rounded-0 text-white d-flex align-items-center p-0 ${styles.carouselItem} itemCarousel`}
                        onClick={() => {
                          getDataMenu(item?.title)
                        }}
                      >
                        <h6 className='m-0 px-4'>{more}</h6>
                        <i
                          className={`fas fa-caret-right align-items-center d-flex align-self-stretch`}
                        />
                      </button>
                    </a>
                  </Link>
                </div>
              </Carousel.Item>
            )
          })}
        </Slider>
      )}
    </div>
  )
}

export default CarouselHome
