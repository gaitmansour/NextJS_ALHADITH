import React, { useEffect, useState } from 'react'
import styles from './AllMedia.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import FetchAPI from '../../API'
import { base_url, getVideoMedia, getVideoByParent } from '../../endpoints'
import ReactPlayer from 'react-player'
import Image from 'next/image'

const RowMedia = (props) => {
  const [dataMedia, setDataMedia] = useState([])
  const [mediaSelected, setMediaSelected] = useState(null)
  const [selectVideo, setSelectVideo] = useState('')
  const { title, _id } = props
  // const url = getVideoMedia(title)
  const urlgetData =
    title == 'الدروس التمهيدية' ||
    title == 'الدروس البيانية' ||
    title == 'الدروس التفاعلية'
      ? getVideoByParent(null, _id)
      : getVideoByParent(_id, _id)
  const urlAllVideo = getVideoByParent(_id)

  const getData = async () => {
    FetchAPI(urlgetData).then((data) => {
      if (data.success) {
        setDataMedia(data?.data)
      }
      console.log('media_data', data?.data)
    })
    console.log('media inside function', dataMedia)
  }
  useEffect(() => {
    getData()
  }, [_id])

  let myStyle =
    title === 'الدروس الحديثية' ||
    title == 'الدروس الحديثية التمهيدية' ||
    title == 'الدروس الحديثية البيانية' ||
    title == 'الدروس الحديثية التفاعلية'
      ? { color: '#22CABE' }
      : title === 'الدروس الحسنية'
      ? { color: '#1F7800' }
      : title === 'برامج تلفزية'
      ? { color: '#FF794D' }
      : title === 'برامج اذاعية'
      ? { color: '#FEBB1A' }
      : { color: '#CEBB97' }

  const settings = {
    infinite: false,
    autoplay: true,
    slidesToShow: dataMedia?.length > 4 ? 4 : dataMedia?.length,
    slidesToScroll: dataMedia?.length > 4 ? 4 : dataMedia?.length,
    arrows: true,
    dots: true,
    speed: 4000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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

  const loadURLVideo = (item) => {
    return !_.isEmpty(item?.field_upload_video)
      ? [{ src: `${base_url}${item?.field_upload_video}`, type: 'video/mp4' }]
      : item?.field_lien_video
  }

  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }

  console.log('mediaSelected=>', mediaSelected)

  return (
    <>
      {dataMedia.length > 0 && (
        <div className='my-2'>
          <div className='d-flex justify-content-between'>
            <h3 style={myStyle} className={`${styles.titleSection} fw-bold`}>
              <span>{title}</span>
            </h3>
            <hr style={myStyle} className={styles.hrLine} />
          </div>
          <div className='my-5'>
            <div className='d-flex align-items-center justify-content-center'>
              {mediaSelected ? (
                <div className={`${styles.secVideo} `}>
                  <div className={`${styles.playerWrapper} player-wrapper`}>
                    <ReactPlayer
                      url={[
                        mediaSelected?.field_lien_video
                          ? mediaSelected?.field_lien_video
                          : {
                              src: `${base_url}${mediaSelected?.field_upload_video}`,
                              type: 'video/mp4',
                            },
                      ]}
                      // light={`${base_url}/${mediaSelected?.field_thumbnail_video}`}
                      controls
                      playing={true}
                      playIcon={
                        title === 'برامج اذاعية' ? (
                          <i
                            className='bi bi-volume-up fa-4x bg-white rounded-circle px-3'
                            style={{ color: '#ffd24a' }}
                          ></i>
                        ) : (
                          <button className='d-none'></button>
                        )
                      }
                      className={`${styles.reactPlayer} react-player`}
                      width='100%'
                      height='100%'
                    />
                  </div>
                  <h4 className={`${styles.titleVideo} my-3`}>
                    {mediaSelected?.title}
                  </h4>
                  <hr />
                  <p>{mediaSelected?.field_description_video}</p>
                </div>
              ) : (
                <div className={`${styles.secVideo} `}>
                  <div className={`${styles.playerWrapper} player-wrapper`}>
                    <ReactPlayer
                      url={[
                        dataMedia[0]?.field_lien_video
                          ? dataMedia[0]?.field_lien_video
                          : {
                              src: `${base_url}${dataMedia[0]?.field_upload_video}`,
                              type: 'video/mp4',
                            },
                      ]}
                      light={`${base_url}/${dataMedia[0]?.field_thumbnail_video}`}
                      controls
                      playing
                      playIcon={
                        title === 'برامج اذاعية' ? (
                          <i
                            className='bi bi-volume-up fa-4x bg-white rounded-circle px-3'
                            style={{ color: '#ffd24a' }}
                          ></i>
                        ) : (
                          <button className='d-none'></button>
                        )
                      }
                      className={`${styles.reactPlayer} react-player`}
                      width='100%'
                      height='100%'
                    />
                  </div>
                  <h4 className={`${styles.titleVideo} my-3`}>
                    {dataMedia[0]?.title}
                  </h4>
                  <hr />
                  <p>{dataMedia[0]?.field_description_video}</p>
                </div>
              )}
            </div>
            <div className=' px-2'>
              <Slider {...settings} dir='rtl'>
                {dataMedia?.map((item, index) => {
                  return (
                    <div
                      key={index.toString()}
                      onClick={() => {
                        setSelectVideo(index), setMediaSelected(item)
                      }}
                      className={`${styles.cardVideo} ${
                        dataMedia?.length <= 2 ? styles.newWidth : ''
                      }`}
                      dir='rtl'
                    >
                      <div className={``}>
                        <Image
                          src={item?.field_thumbnail_video}
                          className=''
                          objectFit='cover'
                          width={10}
                          height={6}
                          layout='responsive'
                          quality={65}
                          loader={myLoader}
                          alt={item?.title}
                        />
                        {/* <ReactPlayer
                          url={loadURLVideo(item)}
                          light={`${base_url}${item?.field_thumbnail_video}`}
                          // onClickPreview={() => {
                          //   setMediaSelected(item)
                          // }}
                          controls
                          playing={
                            selectVideo === index
                              ? true
                              : mediaSelected != null
                              ? false
                              : false
                          }
                          playIcon={
                            title === 'برامج اذاعية' ? (
                              <i
                                className='bi bi-volume-up fa-2x bg-white rounded-circle px-2'
                                style={{
                                  color: '#ffd24a',
                                }}
                              ></i>
                            ) : (
                              <button className='d-none'></button>
                            )
                          }
                          className={`${styles.reactPlay} react-player`}
                          width='100%'
                          height='100%'
                        /> */}
                      </div>
                      <h5 className={`${styles.description} h6 my-3`}>
                        {item?.title}
                      </h5>
                      <p className={styles.descVideo}>
                        {item?.field_description_video}
                      </p>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RowMedia
