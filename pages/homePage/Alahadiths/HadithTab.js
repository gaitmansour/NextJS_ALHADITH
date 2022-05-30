import React from 'react'
import { Backgrounds } from '../../../assets'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import _ from 'lodash'
import $ from 'jquery'
import styles from './Alahadiths.module.css'
import Loading from '../../../components/_UI/Loading'

const HadithTab = ({ codeTopic, content, ...props }) => {
  let dataALhadith = props?.dtatttt

  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    slidesToShow: dataALhadith?.length > 5 ? 5 : dataALhadith?.length,
    slidesToScroll: 4,
    speed: 4000,
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

  const renderData = () => {
    try {
      if (_.isEmpty(dataALhadith)) {
        return (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        )
      } else {
        const dataList = dataALhadith?.map((item, i) => {
          $(document).ready(function () {
            $(`.${i}`).contextmenu(function (event) {
              localStorage.setItem(
                'searchData',
                JSON.stringify({
                  pathname: '/search',
                  search: '',
                  hash: '',
                  query: {
                    word: '',
                    topic: item?.label,
                    content: content,
                    codeDegree: codeTopic,
                    from: 'home',
                  },
                })
              )
            })
          })

          return (
            <Link
              key={i}
              //className={`${i} ${styles["item-link"]}item-link d-flex flex-column  btn align-self-stretch my-5 px-0 p-5 hadithItem`}
              as={'/search'}
              href={{
                pathname: '/search',
                search: '',
                hash: '',
                query: {
                  word: '',
                  topic: item?.label,
                  content: content,
                  codeDegree: codeTopic,
                  from: 'home',
                },
              }}
              passHref={true}
            >
              <a
                key={i}
                className={`${styles.itemLink} item-link d-flex flex-column  btn align-self-stretch my-5 px-0 p-5 hadithItem`}
              >
                <div
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  className={`${
                    content === 'صحيح'
                      ? styles.icon1
                      : content === 'ضعيف'
                      ? styles.icon2
                      : styles.icon3
                  } text-center ${
                    styles.tabIcon
                  } box-logo m-auto d-flex justify-content-center align-items-center`}
                >
                  <p className='text-center my-auto text-light font-weight-bold'>
                    {item?.label}
                  </p>
                </div>
              </a>
            </Link>
          )
        })
        return dataList
      }
    } catch (error) {}
  }
  return (
    <>
      <div className={`${styles.Alhadiths}  overflow-hidden position-relative`}>
        <div className='bg-blue-100 '>
          <div dir='ltr' className='container'>
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

export default HadithTab
