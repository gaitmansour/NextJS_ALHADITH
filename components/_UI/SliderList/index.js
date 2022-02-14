import Widget from '../Widget'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import _ from 'lodash'
import { Article } from '../../../assets'
import useTranslation from 'next-translate/useTranslation'
import Brand from '../Brand'
import Side from './Sidebar.png'
import { Icons } from '../../../assets'
import { base_url } from '../../../endpoints'

import styles from './SliderList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import $ from 'jquery'

const SliderList = (props) => {
  const { i18n } = useTranslation()
  const isRTL = i18n?.language === 'ar'

  const settings = {
    infinite: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    rows: 4,
    slidesPerRow: 1,
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
              // console.log('item =>', data)
              var stripedTitle = data.title.replace(/<[^>]+>/g, '')

              var rmSpaces = stripedTitle.trim()
              if (rmSpaces === 'جدول الدروس الحسنية') {
                var pathN = '/جدول الدروس الحسنية'
              } else {
                pathN = rmSpaces
              }
              $(document).ready(function () {
                $('.linksSlider').contextmenu(function (event) {
                  localStorage.setItem(
                    'dataSlider',
                    JSON.stringify({
                      from: 'slider',
                    })
                  )
                })
              })
              return (
                <Link
                  passHref
                  href={pathN}
                  key={index.toString()}
                  className='text-white'
                >
                  <a
                    style={{ textDecoration: 'none' }}
                    className={`${styles.cardSlid} linksSlider item-card-content d-flex align-items-center py-2`}
                  >
                    {data?.field_image ? (
                      <Image
                        src={data?.field_image}
                        alt=''
                        className={'ImageSlider'}
                        width={100}
                        height={100}
                        loader={props.loader}
                      />
                    ) : (
                      <Image
                        src={Icons.icon_image}
                        alt=''
                        className={'ImageSlider'}
                        width={100}
                        height={100}
                      />
                    )}

                    <div className='mx-3  w-100'>
                      <p className='text-success' onClick={props.onClick}>
                        {rmSpaces}
                      </p>
                      {/* <span className='text-success text-decoration-underline'>
                        لمعرفة المزيد
                      </span> */}
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
