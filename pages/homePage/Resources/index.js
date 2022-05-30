import React, { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Link from 'next/link'
import _ from 'lodash'
import { getResourcesData, base_url, getMenuByName } from '../../../endpoints'
import FetchAPI from '../../../API'
import Loading from '../../../components/_UI/Loading'
import Cards from '../../../components/_UI/Cards'
import SectionTitle from '../../../components/_UI/SectionTitle'
import Image from 'next/image'
import styles from './Resources.module.css'

const Resources = () => {
  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 771,
        settings: {
          slidesToShow: 2,
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
        },
      },
      {
        breakpoint: 495,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerPadding: '60px',
          // className: 'center',
          centerMode: true,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // centerPadding: '60px',
          className: 'center',
          // centerMode: true,
        },
      },
      {
        breakpoint: 380,
        settings: {
          centerPadding: '5px',
          className: 'center',
          // centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const [dataAPI, setDataAPI] = useState({})
  const getLanguage = 'ar'
  const url = getResourcesData(getLanguage)
  const getDataMenu = async (x) => {
    FetchAPI(getMenuByName(x)).then((data) => {
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
                : data?.data[0]?.name_1,
          })
        )
        localStorage.setItem(
          'tid',
          JSON.stringify(data?.data[0]?.parent_target_id)
        )
      }
    })
  }
  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const renderContent = () => {
    try {
      if (dataAPI?.data?.length <= 4) {
        settings.slidesToShow = dataAPI?.data?.length
      }
      if (_.isEmpty(dataAPI)) {
        return (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        )
      }

      return (
        <div className={`${styles.content} container row my-5 mx-0 `}>
          <Slider {...settings} className={`${styles.slide} slide px-2 `}>
            {dataAPI?.data?.map((item, i) => {
              const { title, body, field_icone, field_lien } = item?.attributes

              return (
                <Cards
                  id={'cards'}
                  key={i.toString()}
                  className={`${styles.itemCard} me-4 ms-1 text-center mt-4 child`}
                >
                  <Link
                    class={'links'}
                    role='button'
                    href={{
                      pathname:
                        title === 'المصحف المحمدي'
                          ? '/Almoshaf'
                          : `/article/${title?.split(' ').join('-')}`,
                      query: {
                        from: 'ressources',
                        selectedItem: title,
                        contenuArticle: '',
                      },
                    }}
                    as={
                      title === 'المصحف المحمدي'
                        ? '/المصحف-المحمدي'
                        : `/article/${title?.split(' ').join('-')}`
                    }
                  >
                    <a
                      className='text-decoration-none'
                      onClick={() => {
                        getDataMenu(title)
                        /*localStorage.setItem(
                          'categorieTitle',
                          JSON.stringify({
                            parent: 'موارد',
                            child: title,
                            contenuArticle: title
                          })
                      )*/
                      }}
                    >
                      <div className={`${styles.boxImg} m-auto`}>
                        <Image
                          // loader={myLoader}
                          src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`}
                          width={350}
                          height={400}
                          alt={title}
                          className={`${styles.img} img img-responsive`}
                        />
                      </div>
                      <h3 className={`${styles.title} my-4`}>{title}</h3>
                      <div
                        className={`${styles.desc}`}
                        dangerouslySetInnerHTML={{ __html: body?.processed }}
                      />

                      <button
                        className={`${styles.action} d-flex justify-content-between ${styles.btn} btn align-items-center mb-2 text-white bg-success-light m-auto py-2 px-3 button`}
                      >
                        <i className='fas fa-long-arrow-alt-left text-white mx-2' />
                        <p className='m-0 mx-2'>{'لمعرفة المزيد'}</p>
                      </button>
                    </a>
                  </Link>
                </Cards>
              )
            })}
          </Slider>
        </div>
      )
    } catch (error) {
      console.log(`CATCH OurPartners ${error}`)
    }
  }

  return (
    <div className={`${styles.Resources} container py-5 overflow-hidden`}>
      <SectionTitle title={'موارد'} />
      {renderContent()}
    </div>
  )
}

export default Resources
