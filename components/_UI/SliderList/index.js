import React from 'react'
import Widget from '../Widget'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import _ from 'lodash'
import { Logos } from '../../../assets'
import { base_url } from '../../../endpoints'

import styles from './SliderList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import SectionTitle from '../SectionTitle'

const SliderList = (props) => {
  const settings = {
    // infinite: props?.data?.length > 3,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    rows: 5,
    slidesPerRow: 1,
  }

  const className = props?.className ? props.className : ''
  // const _data = _.chunk(props?.data, 2)
  // const data = isRTL ? _.reverse(_data) : _data
  const data = props?.data

  return (
    <Widget className={`${className}`}>
      {data.length > 0 ? (
        <div className={`${styles.SliderList} SliderList`}>
          {/* <h2 className='text-success fw-bold'> مواضيع ذات صلة</h2> */}
          <SectionTitle
            className={styles.titleSection}
            title={'مواضيع ذات صلة'}
          />
          <Slider {...settings} className='slide my-4'>
            {data?.map((item, index) => {
              //console.log('____item slider', item)
              var stripedTitle = item.title.replace(/<[^>]+>/g, '')

              var rmSpaces = stripedTitle.trim()
              if (rmSpaces === 'جدول الدروس الحسنية') {
                var pathN = '/جدول الدروس الحسنية'
              } else {
                pathN = rmSpaces
              }
              return (
                <Link
                  passHref
                  href={{
                    pathname: pathN?.split(' ').join('-'),
                    query: { contenuArticle: rmSpaces },
                  }}
                  key={index.toString()}
                  className='text-white'
                >
                  <a
                    style={{ textDecoration: 'none' }}
                    className={`${data?.length > 5 ? 'flex-row-reverse' : ''} ${
                      styles.cardSlid
                    } linksSlider item-card-content d-flex  align-items-center  py-2`}
                    onClick={() =>
                      console.log('item????????????????????', item)
                    }
                  >
                    {item?.field_image.trim() ? (
                      <Image
                        src={item?.field_image}
                        alt=''
                        objectFit='cover'
                        className={'ImageSlider'}
                        width='100%'
                        height='100%'
                        loader={props.loader}
                      />
                    ) : (
                      <Image
                        src={Logos.logo_hadith_m6}
                        alt=''
                        objectFit='cover'
                        className={'ImageSlider'}
                        width={170}
                        height='90%'
                      />
                    )}

                    <div className='mx-3  w-100'>
                      <p
                        className='text-success text-end'
                        onClick={props.onClick}
                      >
                        {rmSpaces}
                      </p>
                      {/* <span className='text-success text-decoration-underline'>
                              لمعرفة المزيد
                            </span> */}
                    </div>
                  </a>
                </Link>
              )
            })}
          </Slider>
        </div>
      ) : (
        <div></div>
      )}
    </Widget>
  )
}

export default SliderList
