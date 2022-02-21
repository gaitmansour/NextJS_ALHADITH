import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import photo from './photo.png'
import _ from 'lodash'
import $ from 'jquery'
import styles from './media.module.css'
import {
  base_url,
  getArticleById,
  getMenuByName,
  getSideArticle,
  getVideo,
} from '../../endpoints'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import FetchAPI from '../../API'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import Loading from '../../components/_UI/Loading'
import TemplateArticle from '../../components/TemplateArticle'
import ScrollButton from '../../components/ScrollButton'
import Body from '../../components/Body'
import PageTitleSecond from '../../components/_UI/PageTitleSecond'
import SimpleListMedia from '../../components/_UI/SimpleListMedia'

function Media(props) {
  //const {state} = useLocation();
  const title = useRouter().query.title
  const [start, setStart] = useState(false)
  const [dataAPI, setDataAPI] = useState({})
  const [dataMenu, setdataMenu] = useState({})
  const [dataSlider, setdataSlider] = useState({})
  const [dataSide, setDataSide] = useState({})

  const { t } = useTranslation()

  const url = getVideo(title)
  const urlMenu = getMenuByName(title)
  const settings = {
    infinite: dataAPI?.included?.length > 3,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
      console.log('media', dataAPI)
    })
  }

  const getDataSlider = async (name, tid, parent_target) => {
    const urlSlider = getSideArticle(name, tid, parent_target)
    FetchAPI(urlSlider).then((data) => {
      if (data.success) {
        setdataSlider(data?.data)
      }
    })
  }
  const getDataMenu = async () => {
    FetchAPI(urlMenu).then((data) => {
      if (data.success) {
        setdataMenu(data?.data[0])
        getDataSlider(
          data?.data[0]?.name_1,
          data?.data[0]?.tid,
          data?.data[0]?.parent_target_id_1
        )
      }
    })
  }

  const handleSideData = (location) => {
    const data = location?.state?.fromNav
    setDataSide(data)
  }
  useEffect(() => {
    if (title) {
      getDataMenu()
      getData()
      handleSideData(props.location)
    }
  }, [title, props.location])

  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'التلفزة الرقمية',
      path: '',
    },
    {
      title: title,
      path: 'article/' + title,
    },
  ]

  const sideData11 = [
    {
      title: 'الدروس الحديثية',
      path: '/media/برامج تلفزية',
      parentLabel: 'التلفزة الرقمية',
    },
    {
      title: 'الدروس الحسنية',
      path: '/media/الدروس الحسنية',
      parentLabel: 'التلفزة الرقمية',
    },
    {
      title: 'برامج اذاعية',
      path: 'media/برامج اذاعية',
      parentLabel: 'التلفزة الرقمية',
    },
    {
      title: 'برامج تلفزية',
      path: '/media/برامج تلفزية',
      parentLabel: 'التلفزة الرقمية',
    },
    {
      title: 'برامج على الشبكات الاجتماعية',
      path: '/media/برامج على الشبكات الاجتماعية',
      parentLabel: 'التلفزة الرقمية',
    },
  ]
  const sideDataDoroussHaditha = [
    {
      title: 'الدروس التمهيدية',
      path: '/media/الدروس التمهيدية',
      parentLabel: 'الدروس الحديثية',
    },
    {
      title: 'الدروس البيانية',
      path: '/media/الدروس البيانية',
      parentLabel: 'الدروس الحديثية',
    },
    {
      title: 'الدروس التفاعلية',
      path: 'media/الدروس التفاعلية',
      parentLabel: 'الدروس الحديثية',
    },
  ]

  function handleStart() {
    setStart(true)
  }

  console.log('show start------', start)
  if (_.isEmpty(dataAPI)) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }
  var leng = dataAPI?.included?.length

  return (
    <TemplateArticle {...props} ListBreadcrumb={data} titlePage={title}>
      <ScrollButton />
      <Body
        className={` ${styles.TemplateArticleBody} ${styles.Media} d-flex p-4`}
      >
        {dataAPI?.data?.length > 0 ? (
          <div
            className={`${styles.playerVideo} pl-4`}
            style={{ width: '70%' }}
          >
            <div className={`${styles.boxFirstVideo} box-first-video`}>
              {/* <div className='btn-play'>
                <button
                  type='button'
                  className='btn  p-0 position-relative'
                  id='bttn'
                  onClick={() => handleStart()}
                > */}
              <div
                className={`${styles.playerWrapper} player-wrapper`}
                onClick={() => handleStart()}
              >
                <ReactPlayer
                  url={[
                    {
                      src: `${base_url}${
                        dataAPI?.included[leng / 2]?.attributes?.uri?.url
                      }`,
                      type: 'video/mp4',
                    },
                  ]}
                  light={`${base_url}/${dataAPI?.included[0]?.attributes?.uri?.url}`}
                  controls
                  playing
                  className={`${styles.reactPlayer} react-player`}
                  width='90%'
                  height='90%'
                />
              </div>
              {/* </button>
              </div> */}
              <PageTitleSecond
                className='title-video px-0 mt-5'
                title={dataAPI?.data[0]?.attributes?.title}
              />
            </div>
            <div>
              {/* <SliderVideoList data={VideosList} className="pt-5" /> */}
              <div className={`${styles.SliderVideoList} `}>
                <Slider {...settings} className='slide my-4'>
                  {dataAPI?.data?.map((item, i) => {
                    console.log('-item----', item)

                    return (
                      <div
                        key={i.toString()}
                        className={`${styles.itemCard} mt-4 mb-2`}
                      >
                        <div
                          className={`${styles.playerWrapper} player-wrapper`}
                        >
                          <ReactPlayer
                            url={[
                              {
                                src: `${base_url}${
                                  dataAPI?.included[i + leng / 2]?.attributes
                                    ?.uri?.url
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
                        </div>
                        <p className='m-0 py-3 description text-center'>
                          {item?.attributes?.title}
                        </p>
                      </div>
                    )
                  })}
                </Slider>
              </div>
              <div
                className='modal fade'
                id='SliderVideoListModal'
                tabIndex='-1'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-lg modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body p-0'>
                      <iframe
                        src='https://www.youtube.com/'
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex-fill' style={{ width: '67%' }}></div>
        )}
        <div
          className={`${styles.sideBar} px-3 side-bar`}
          style={{ width: '30%' }}
        >
          {title === 'الدروس الحديثية' ||
          title === 'الدروس التفاعلية' ||
          title === 'الدروس التمهيدية' ||
          title === 'الدروس البيانية' ? (
            <SimpleListMedia data={sideDataDoroussHaditha} />
          ) : null}
          {<SimpleListMedia data={sideData11} />}
        </div>
      </Body>
      <div
        className='modal fade'
        id='modalVideo1'
        tabIndex='-1'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='btn-close'
                id='close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body p-0'>
              <iframe
                src=''
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </TemplateArticle>
  )
}
export default Media
