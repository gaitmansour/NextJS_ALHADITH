import React, { useEffect, useState } from 'react'
import styles from './CarouselHome.module.css'
import { Backgrounds } from '../../../assets'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import _ from 'lodash'
import {
  getCarousel,
  base_url,
  getSlider,
  getMenuByName,
  getArticleById,
  getArticleByIdName,
} from '../../../endpoints'
import FetchAPI from '../../../API'
import { Carousel } from 'react-bootstrap'
import Loading from '../../../components/_UI/Loading'
import SMLinks from '../../../components/_UI/SMLinks'
import Image from 'next/image'
import $ from 'jquery'
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
        // console.log("data CarouselHome ==> ", data)
        if (data.success) {
          setDataAPI(data?.data)
          setIsLoading(false)
        }
      })
    } catch (error) {
      console.log(error)
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

  if (_.isEmpty(dataAPI)) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }

  const getData = async (x) => {
    return FetchAPI(getArticleByIdName(x)).then((data) => {
      if (data.success) {
        console.log('++++++++++++++++++++++ included')

        let array = data?.data?.included.filter(
          (item) => item.type === 'taxonomy_term--alahadyt'
        )
        console.log(array[0]?.attributes?.name)
        return array[0]?.attributes?.name
      }
    })
  }
  const getDataMenu = async (x) => {
    getData(x).then((r) => {
      FetchAPI(getMenuByName(r)).then((data) => {
        if (data.success) {
          console.log('dataSuccess')
          console.log(data?.data[0])
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
  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }
  console.log('dataAPI avant ===>', dataAPI)

  let sortData = _.sortBy(dataAPI, 'field_ordre_slider')
  let test = sortData?.map((item, index) => {
    return item
  })
  console.log('carousel =>', test)

  console.log('dataAPI apres ===>', newData)

  return (
    <div
      className={`${styles.CarouselHome} ${styles.carouselIndicators} CarouselHome d-flex`}
    >
      <div
        className={`${styles.carouselControlBox} position-relative carousel-control-box ${styles.wpx100} wpx-100 d-flex flex-column justify-content-end py-5`}
      >
        <SMLinks className='smLinks' />
      </div>
      <Slider {...settings} className={`w-100 slide`}>
        {newData?.map((item, index) => {
          console.log('itemCarousel', item)
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
            console.log('str', str)
            var element2 = str.slice(0, -1)
            console.log('element2', element2)
          }
          // $(document).ready(function () {
          //   $('.linksCarousel').contextmenu(function (event) {
          //     localStorage.setItem(
          //       'routeState',
          //       JSON.stringify({
          //         fromNav: {},
          //         selectedItem: item?.term_node_tid,
          //         from: 'CarouselHome',
          //         contenuArticle: '',
          //       })
          //     )
          //   })
          // })
          console.log('itemCarousel apres', item)
          return (
            <Carousel.Item
              key={index.toString()}
              className={`${styles.ImgSlide} w-100 `}
            >
              <Image
                src={element2}
                loader={myLoader}
                alt={''}
                // layout='fill'
                objectFit='cover'
                height={1850}
                width={5000}
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
                    <a
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
                    </a>
                  </a>
                </Link>
              </div>
            </Carousel.Item>
          )
        })}
      </Slider>

      {/*  <div className={`${styles.bg_dashed}bg_dashed position-absolute w-100`}
                 style={{backgroundImage: `url(${Backgrounds.bg_dashed})`}}/>
           <div className="bg_arabic_design_slide h-100 position-absolute w-100" style={{ backgroundImage: `url(${Backgrounds.bg_arabic_design_slide.default})`, opacity: .7 }} /> */}
    </div>
  )
}

export default CarouselHome
