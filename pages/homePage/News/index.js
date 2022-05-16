import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../components/_UI/SectionTitle'
import NewsCard from './NewsCard'
import styles from './News.module.css'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { getNews } from '../../../endpoints'
import FetchAPI from '../../../API'
import Loading from '../../../components/_UI/Loading'

const News = () => {
  const [dataAPI, setDataAPI] = useState([])
  const [isLoding, setIsLoding] = useState(false)
  const [isError, setIsError] = useState('')
  const urlgetData = getNews()

  useEffect(() => {
    try {
      setIsLoding(true)
      FetchAPI(urlgetData).then((data) => {
        if (data.success) {
          setDataAPI(data?.data)
          setIsLoding(false)
          //   console.log('dataaaa Newsssss ===>', data?.data)
        }
      })
    } catch (error) {
      setIsError(error)
    }
  }, [])

  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    slidesToShow: dataAPI.length > 3 ? 3 : dataAPI.length,
    slidesToScroll: 2,
    arrows: false,
    speed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: dataAPI.length > 3 ? 3 : dataAPI.length,
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
          slidesToShow: 1,
          slidesToScroll: 1,
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
  return (
    <div className='mt-5 container'>
      <SectionTitle title={'مستجدات'} />
      <Slider {...settings} className='slide my-4'>
        {isLoding ? (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        ) : (
          dataAPI?.map((item, index) => {
            return (
              <div
                className={`${styles.groupCard} ${
                  dataAPI?.length <= 2 ? styles.newWidth : ''
                }`}
              >
                <NewsCard
                  key={index}
                  title={item?.title}
                  description={item?.body}
                  image={item?.field_image}
                  category_news={item?.field_categorie_news}
                />
              </div>
            )
          })
        )}
      </Slider>
    </div>
  )
}

export default News
