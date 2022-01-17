import Widget from '../Widget'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import _ from 'lodash'
import { Article } from '../../../assets'
import useTranslation from 'next-translate/useTranslation'
import Brand from '../Brand'
import Side from './Sidebar.png'

import styles from './SliderList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const SliderList = (props) => {
  const { i18n } = useTranslation()
  const isRTL = i18n?.language === 'ar'

  const settings = {
    infinite: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  const className = props?.className ? props.className : ''
  const _data = _.chunk(props?.data, 2)
  const data = isRTL ? _.reverse(_data) : _data

  return (
    <Widget className={`${className}`}>
      <div className={`${styles.SliderList} SliderList`}>
        <Slider {...settings} className='slide my-4'>
          {data?.map((item, i) => {
            const newData = item.map((data, index) => {
              var stripedTitle = data.title.replace(/<[^>]+>/g, '')
              var rmSpaces = stripedTitle.trim()
              if (rmSpaces === 'جدول الدروس الحسنية') {
                var pathN = '/جدول الدروس الحسنية'
              } else {
                pathN = rmSpaces
              }
              return (
                <Link
                  href={pathN}
                  key={index.toString()}
                  className=''
                  as={pathN}
                >
                  <a style={{ textDecoration: 'none' }}>
                    {/* <Image className="w-100" src={Side} alt=""/> */}
                    <div className={`${styles.imgContainer01} imgContainer01`}>
                      <p>{rmSpaces}</p>
                    </div>
                  </a>
                </Link>
              )
            })
            return (
              <div
                key={i.toString()}
                className={`${styles.SliderListData} SliderList-data`}
              >
                {newData}
              </div>
            )
          })}
        </Slider>
      </div>
    </Widget>
  )
}

export default SliderList
