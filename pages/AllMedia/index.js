import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Moment from 'moment'
import _ from 'lodash'
import styles from './AllMedia.module.css'
import {
  base_url,
  getMenuByName,
  getLive,
  getVideo1,
  getVideoDh,
  getVideoBi,
  getVideoKi,
  getVideoBt,
} from '../../endpoints'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import FetchAPI from '../../API'
import ReactPlayer from 'react-player'
import Link from 'next/link'
import TemplateArticle from '../../components/TemplateArticle'
import ScrollButton from '../../components/ScrollButton'
import Body from '../../components/Body'
import Loading from '../../components/_UI/Loading'
import Image from 'next/image'

const AllMedia = (props) => {
  var myCurrentDate = new Date()
  var curD = Moment(myCurrentDate).format('YYYY-MM-DDTHH:mm:ssZ')
  const title = props?.match?.params?.title
  const [start, setStart] = useState(false)
  const [dataAPI, setDataAPI] = useState({})
  const [dataAPIDh, setDataAPIDh] = useState({})
  const [dataAPIBt, setDataAPIBt] = useState({})
  const [dataAPIBi, setDataAPIBi] = useState({})
  const [dataAPIKi, setDataAPIKi] = useState({})
  const [dataLive, setDataLive] = useState({})
  const [dataMenu, setdataMenu] = useState({})
  const [dataSlider, setdataSlider] = useState({})
  const [dataSide, setDataSide] = useState({})

  const { t } = useTranslation()

  const url = getVideo1()
  const urlDh = getVideoDh()
  const urlBi = getVideoBi()
  const urlKi = getVideoKi()
  const urlBt = getVideoBt()
  const urlLive = getLive()
  const urlMenu = getMenuByName(title)
  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 330,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const getDataLive = async () => {
    FetchAPI(urlLive).then((data) => {
      if (data.success) {
        setDataLive(data?.data)
      }
    })
  }
  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
    })
    FetchAPI(urlDh).then((data) => {
      if (data.success) {
        setDataAPIDh(data?.data)
      }
    })
    FetchAPI(urlBt).then((data) => {
      if (data.success) {
        setDataAPIBt(data?.data)
      }
    })
    FetchAPI(urlBi).then((data) => {
      if (data.success) {
        setDataAPIBi(data?.data)
      }
    })
    FetchAPI(urlKi).then((data) => {
      if (data.success) {
        setDataAPIKi(data?.data)
      }
    })
  }

  useEffect(() => {
    getData()
    getDataLive()
  }, [])

  console.log('**live**', dataLive)
  // console.log(dataAPI.included[1]?.attributes?.uri?.url)

  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'التلفزة الرقمية',
      path: '',
    },
  ]

  function handleStart() {
    setStart(true)
  }

  console.log('-------live filtred', dataLive)

  if (
    _.isEmpty(dataAPI) ||
    _.isEmpty(dataAPIDh) ||
    _.isEmpty(dataAPIBt) ||
    _.isEmpty(dataAPIBi) ||
    _.isEmpty(dataAPIKi)
  ) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }

  var leng = dataAPI?.included.length
  var leng1 = dataAPIDh?.included.length
  var leng2 = dataAPIBt?.included.length
  var leng3 = dataAPIBi?.included.length
  var leng4 = dataAPIKi?.included.length

  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }

  return (
    <TemplateArticle
      {...props}
      ListBreadcrumb={data}
      titlePage='التلفزة الرقمية'
    >
      <ScrollButton />
      <Body className={`TemplateArticleBody ${styles.Media} d-flex p-4`}>
        <div className='flex-fill ' style={{ width: '100%' }}>
          <div className={`row ${styles.firstRoww}`}>
            <div className='col-lg-6 col-md-6 col-sm-1 px-4 category1'>
              <div>
                <h3
                  className={`${styles.titlePage}`}
                  style={{
                    width: '30%',
                    color: '#CEBB97',
                    fontSize: 20,
                    fontWeight: 900,
                    float: 'right',
                  }}
                >
                  برامج على الشبكات الاجتماعية
                </h3>
                <hr
                  style={{
                    width: '70%',
                    float: 'right',
                    color: '#CEBB97',
                    border: '6px #CEBB97  solid',
                  }}
                />
              </div>
              <div className={`${styles.boxFirstVideo} box-first-video`}>
                <div className={`${styles.btnPlay} btn-play`}>
                  <button
                    type='button'
                    className='btn  p-0 position-relative'
                    id='bttn'
                    onClick={() => handleStart()}
                  >
                    <div className={`${styles.playerWrapper} player-wrapper`}>
                      <ReactPlayer
                        url={[
                          {
                            src: `${base_url}${
                              dataAPI.included[leng / 2]?.attributes?.uri?.url
                            }`,
                            type: 'video/mp4',
                          },
                        ]}
                        light={`${base_url}/${dataAPI?.included[0]?.attributes?.uri?.url}`}
                        controls
                        playing
                        className={`${styles.reactPlayer} react-player`}
                        width='100%'
                        height={400}
                      />
                    </div>
                  </button>
                </div>
                <h3 className={`${styles.titlePage}`} style={{ fontSize: 18 }}>
                  {dataAPI.data[0].attributes.title}
                </h3>
                <hr className='line' />
                <div className={styles.SliderVideoList1}>
                  <Slider {...settings} className='slide my-4'>
                    {dataAPI?.data.map((item, i) => {
                      return (
                        <div
                          key={i.toString()}
                          className={`${styles.SliderVideoList} SliderVideoList-data1 d-flex flex-wrap`}
                        >
                          <div
                            key={i.toString()}
                            className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`}
                          >
                            <div
                              className={`${styles.playerWrapper} player-wrapper`}
                            >
                              <ReactPlayer
                                url={[
                                  {
                                    src: `${base_url}${
                                      dataAPI?.included[i + leng / 2]
                                        ?.attributes?.uri?.url
                                    }`,
                                    type: 'video/mp4',
                                  },
                                ]}
                                light={`${base_url}${dataAPI?.included[i]?.attributes?.uri?.url}`}
                                controls
                                playing
                                className={`${styles.RPlayer} react-player`}
                                width={300}
                                height={150}
                              />
                            </div>
                            <p
                              className='m-0 py-3 px-4'
                              style={{
                                fontSize: 12,
                                textAlign: 'right',
                              }}
                            >
                              {item?.attributes?.title}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 px-4 col-sm-1'>
              <div style={{ height: '80px', marginBottom: '25px' }}>
                <svg
                  style={{ float: 'right', width: '30%', marginTop: '8px' }}
                  xmlns='http://www.w3.org/2000/svg'
                  width='60'
                  height='60'
                  fill='#FF794D'
                  className='bi bi-broadcast'
                  viewBox='0 0 16 16'
                >
                  <path d='M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z' />
                </svg>
                <h3
                  style={{
                    color: '#000000',
                    fontSize: 18,
                    float: 'right',
                    width: '70%',
                    marginTop: '15px',
                  }}
                >
                  البث المباشر
                </h3>
              </div>
              {dataLive.length > 0 ? (
                dataLive
                  ?.filter(
                    (item) =>
                      curD <
                      Moment(
                        item.field_date_fin,
                        'YYYY-MM-DDTHH:mm:ssZ'
                      ).format()
                  )
                  .map((item, i) => {
                    return (
                      <div key={i} className='row no-gutters my-5 mx-4'>
                        <div className='col-auto'>
                          <Image
                            loader={myLoader}
                            src={item.field_thumbnail_live}
                            className='img-fluid'
                            alt=''
                            style={{ height: '110px', width: '110px' }}
                          />
                        </div>
                        <div className='col'>
                          <div className='row card-block px-2'>
                            <div
                              className='col col-lg-6 col-md-12 col-sm-12 px-2 text-left d-flex icon-holder'
                              style={{ width: '50%' }}
                            >
                              <i className='fa fa-calendar iconBo' style={{}} />
                              <p style={{}}>
                                {Moment(
                                  item.field_date_debut,
                                  'YYYY-MM-DDTHH:mm:ssZ'
                                ).format('DD/MM/YYYY')}
                              </p>
                            </div>
                            <div
                              className='col col-lg-6  col-md-12 col-sm-12 icon-holder d-flex'
                              style={{ width: '50%' }}
                            >
                              <i className='fa fa-clock iconBo' style={{}} />
                              <p style={{}}>
                                {Moment(
                                  item.field_date_debut,
                                  'YYYY-MM-DDTHH:mm:ssZ'
                                ).format('HH:mm')}
                              </p>
                            </div>
                            <div className='col col-lg-12  col-md-12 col-sm-12 '>
                              <p className='card-text'>{item.title}</p>
                            </div>
                          </div>
                          <Link passHref={true} href='/'>
                            <button
                              style={{
                                backgroundColor: '#FF794D',
                                color: '#fff',
                                width: '150px',
                                height: '40px',
                                border: 'none',
                                marginRight: '15%',
                                marginTop: '2%',
                              }}
                            >
                              إبدأ البث
                            </button>
                          </Link>
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-1 px-4 category1'>
              <div>
                <h3
                  className={`${styles.titlePage}`}
                  style={{
                    width: '30%',
                    color: '#FF794D',
                    fontSize: 20,
                    fontWeight: 900,
                    float: 'right',
                  }}
                >
                  برامج تلفزية
                </h3>
                <hr
                  style={{
                    width: '70%',
                    float: 'right',
                    color: '#FF794D',
                    border: '6px #FF794D  solid',
                  }}
                />
              </div>
              <div className={`${styles.boxFirstVideo} box-first-video`}>
                <div className={`${styles.btnPlay} btn-play`}>
                  <button
                    type='button'
                    className='btn  p-0 position-relative'
                    id='bttn'
                    onClick={() => handleStart()}
                  >
                    <div className={`${styles.playerWrapper} player-wrapper`}>
                      <ReactPlayer
                        url={[
                          {
                            src: `${base_url}${
                              dataAPIBt.included[leng2 / 2]?.attributes?.uri
                                ?.url
                            }`,
                            type: 'video/mp4',
                          },
                        ]}
                        light={`${base_url}/${dataAPIBt?.included[0]?.attributes?.uri?.url}`}
                        controls
                        playing
                        className={`${styles.reactPlayer} react-player`}
                        width='100%'
                        height={380}
                      />
                    </div>
                  </button>
                </div>
                <h3 className='titlePage' style={{ fontSize: 18 }}>
                  {dataAPIBt.data[0].attributes.title}
                </h3>
                <hr className={`${styles.line}`} />
                <div className={styles.SliderVideoList1}>
                  <Slider {...settings} className='slide my-4'>
                    {dataAPIBt?.data.map((item, i) => {
                      return (
                        <div
                          key={i.toString()}
                          className='SliderVideoList-data1 d-flex flex-wrap'
                        >
                          <div
                            key={i.toString()}
                            className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`}
                          >
                            {/* {dataAPI && dataAPI.included && <img className="image w-100" src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`} alt="" />}
                                                    <p className="m-0 py-3 description">{item?.attributes?.title}</p>
                                                    {item?.attributes?.field_lien_video.uri && <i className={`fas fa-play`}></i>} */}
                            <div
                              className={`${styles.playerWrapper} player-wrapper`}
                            >
                              <ReactPlayer
                                url={[
                                  {
                                    src: `${base_url}${
                                      dataAPIBt?.included[i + leng2 / 2]
                                        ?.attributes?.uri?.url
                                    }`,
                                    type: 'video/mp4',
                                  },
                                ]}
                                light={`${base_url}${dataAPIBt?.included[i]?.attributes?.uri?.url}`}
                                controls
                                playing
                                className={`${styles.RPlayer} react-player`}
                                width={300}
                                height={150}
                              />
                            </div>
                            <p
                              className='m-0 py-3 px-4'
                              style={{
                                fontSize: 12,
                                textAlign: 'right',
                              }}
                            >
                              {item?.attributes?.title}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-1 px-4 category1'>
              <div>
                <h3
                  className={`${styles.titlePage}`}
                  style={{
                    width: '30%',
                    color: '#FEBB1A',
                    fontSize: 20,
                    fontWeight: 900,
                    float: 'right',
                  }}
                >
                  برامج اذاعية
                </h3>
                <hr
                  style={{
                    width: '70%',
                    float: 'right',
                    color: '#FEBB1A',
                    border: '6px #FEBB1A  solid',
                  }}
                />
              </div>
              <div className={`${styles.boxFirstVideo} box-first-video`}>
                <div className={`${styles.btnPlay} btn-play`}>
                  <button
                    type='button'
                    className='btn  p-0 position-relative'
                    id='bttn'
                    onClick={() => handleStart()}
                  >
                    <div className={`${styles.playerWrapper} player-wrapper`}>
                      <ReactPlayer
                        url={[
                          {
                            src: `${base_url}${
                              dataAPIBi.included[leng3 / 2]?.attributes?.uri
                                ?.url
                            }`,
                            type: 'video/mp4',
                          },
                        ]}
                        light={`${base_url}/${dataAPIBi?.included[0]?.attributes?.uri?.url}`}
                        controls
                        playing
                        className={`${styles.reactPlayer} react-player`}
                        width='100%'
                        height={380}
                      />
                    </div>
                  </button>
                </div>
                <h3 className={`${styles.titlePage}`} style={{ fontSize: 18 }}>
                  {dataAPIBi.data[0].attributes.title}
                </h3>
                <hr className={styles.line} />
                <div className={styles.SliderVideoList1}>
                  <Slider {...settings} className='slide my-4'>
                    {dataAPIBi?.data.map((item, i) => {
                      return (
                        <div
                          key={i.toString()}
                          className='SliderVideoList-data1 d-flex flex-wrap'
                        >
                          <div
                            key={i.toString()}
                            className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`}
                          >
                            <div
                              className={`${styles.playerWrapper} player-wrapper`}
                            >
                              <ReactPlayer
                                url={[
                                  {
                                    src: `${base_url}${
                                      dataAPIBi?.included[i + leng3 / 2]
                                        ?.attributes?.uri?.url
                                    }`,
                                    type: 'video/mp4',
                                  },
                                ]}
                                light={`${base_url}${dataAPIBi?.included[i]?.attributes?.uri?.url}`}
                                controls
                                playing
                                className={`${styles.RPlayer} react-player`}
                                width={300}
                                height={150}
                              />
                            </div>
                            <p
                              className='m-0 py-3 px-4'
                              style={{
                                fontSize: 12,
                                textAlign: 'right',
                              }}
                            >
                              {item?.attributes?.title}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-1 px-4 category1'>
              <div>
                <h3
                  className={`${styles.titlePage}`}
                  style={{
                    width: '30%',
                    color: '#1F7800',
                    fontSize: 20,
                    fontWeight: 900,
                    float: 'right',
                  }}
                >
                  الدروس الحسنية
                </h3>
                <hr
                  style={{
                    width: '70%',
                    float: 'right',
                    color: '#1F7800',
                    border: '6px #1F7800  solid',
                  }}
                />
              </div>
              <div className={`${styles.boxFirstVideo} box-first-video`}>
                <div className={`${styles.btnPlay} btn-play`}>
                  <button
                    type='button'
                    className='btn  p-0 position-relative'
                    id='bttn'
                    onClick={() => handleStart()}
                  >
                    <div className={`${styles.playerWrapper} player-wrapper`}>
                      <ReactPlayer
                        url={[
                          {
                            src: `${base_url}${
                              dataAPIKi.included[leng4 / 2]?.attributes?.uri
                                ?.url
                            }`,
                            type: 'video/mp4',
                          },
                        ]}
                        light={`${base_url}/${dataAPIKi?.included[0]?.attributes?.uri?.url}`}
                        controls
                        playing
                        className={`${styles.reactPlayer} react-player`}
                        width='100%'
                        height={380}
                      />
                    </div>
                  </button>
                </div>
                <h3 className={`${styles.titlePage}`} style={{ fontSize: 18 }}>
                  {dataAPIKi.data[0].attributes.title}
                </h3>
                <hr className='line' />
                <div className={styles.SliderVideoList1}>
                  <Slider {...settings} className='slide my-4'>
                    {dataAPIKi?.data.map((item, i) => {
                      return (
                        <div
                          key={i.toString()}
                          className='SliderVideoList-data1 d-flex flex-wrap'
                        >
                          <div
                            key={i.toString()}
                            className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`}
                          >
                            {/* {dataAPI && dataAPI.included && <img className="image w-100" src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`} alt="" />}
                                                    <p className="m-0 py-3 description">{item?.attributes?.title}</p>
                                                    {item?.attributes?.field_lien_video.uri && <i className={`fas fa-play`}></i>} */}
                            <div
                              className={`${styles.playerWrapper} player-wrapper`}
                            >
                              <ReactPlayer
                                url={[
                                  {
                                    src: `${base_url}${
                                      dataAPIKi?.included[i + leng4 / 2]
                                        ?.attributes?.uri?.url
                                    }`,
                                    type: 'video/mp4',
                                  },
                                ]}
                                light={`${base_url}${dataAPIKi?.included[i]?.attributes?.uri?.url}`}
                                controls
                                playing
                                className={`${styles.RPlayer} react-player`}
                                width={300}
                                height={150}
                              />
                            </div>
                            <p
                              className='m-0 py-3 px-4'
                              style={{
                                fontSize: 12,
                                textAlign: 'right',
                              }}
                            >
                              {item?.attributes?.title}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </Slider>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-1 px-4 category1'>
              <div>
                <h3
                  className={`${styles.titlePage}`}
                  style={{
                    width: '30%',
                    color: '#22CABE',
                    fontSize: 20,
                    fontWeight: 900,
                    float: 'right',
                  }}
                >
                  الدروس الحديثية
                </h3>
                <hr
                  style={{
                    width: '70%',
                    float: 'right',
                    color: '#22CABE',
                    border: '6px #22CABE  solid',
                  }}
                />
              </div>
              <div className={`${styles.boxFirstVideo} box-first-video`}>
                <div className={`${styles.btnPlay} btn-play`}>
                  <button
                    type='button'
                    className='btn  p-0 position-relative'
                    id='bttn'
                    onClick={() => handleStart()}
                  >
                    <div className={`${styles.playerWrapper} player-wrapper`}>
                      <ReactPlayer
                        url={[
                          {
                            src: `${base_url}${
                              dataAPIDh.included[leng1 / 2]?.attributes?.uri
                                ?.url
                            }`,
                            type: 'video/mp4',
                          },
                        ]}
                        light={`${base_url}/${dataAPIDh?.included[0]?.attributes?.uri?.url}`}
                        controls
                        playing
                        className={`${styles.reactPlayer} react-player`}
                        width='100%'
                        height={380}
                      />
                    </div>
                  </button>
                </div>
                <h3 className={`${styles.titlePage}`} style={{ fontSize: 18 }}>
                  {dataAPIDh.data[0].attributes.title}
                </h3>
                <hr className='line' />
                <div className={styles.SliderVideoList1}>
                  <Slider {...settings} className='slide my-4'>
                    {dataAPIDh?.data.map((item, i) => {
                      return (
                        <div
                          key={i.toString()}
                          className='SliderVideoList-data1 d-flex flex-wrap'
                        >
                          <div
                            key={i.toString()}
                            className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`}
                          >
                            {/* {dataAPI && dataAPI.included && <img className="image w-100" src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`} alt="" />}
                                                    <p className="m-0 py-3 description">{item?.attributes?.title}</p>
                                                    {item?.attributes?.field_lien_video.uri && <i className={`fas fa-play`}></i>} */}
                            <div
                              className={`${styles.playerWrapper} player-wrapper`}
                            >
                              <ReactPlayer
                                url={[
                                  {
                                    src: `${base_url}${
                                      dataAPIDh?.included[i + leng1 / 2]
                                        ?.attributes?.uri?.url
                                    }`,
                                    type: 'video/mp4',
                                  },
                                ]}
                                light={`${base_url}${dataAPIDh?.included[i]?.attributes?.uri?.url}`}
                                controls
                                playing
                                className={`${styles.RPlayer} react-player`}
                                width={300}
                                height={150}
                              />
                            </div>
                            <p
                              className={`${styles.description} m-0 py-3 description px-4`}
                              style={{
                                fontSize: 12,
                                textAlign: 'right',
                              }}
                            >
                              {item?.attributes?.title}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </TemplateArticle>
  )
}

export default AllMedia
