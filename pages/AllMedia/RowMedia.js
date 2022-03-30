import React, { useEffect, useState } from 'react'
import styles from './AllMedia.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import FetchAPI from '../../API'
import { base_url, getVideoMedia, getVideoByParent } from '../../endpoints'
import ReactPlayer from 'react-player'

const RowMedia = (props) => {
  const [dataMedia, setDataMedia] = useState([])
  const { title, _id } = props
  const url = getVideoMedia(title)
  const urlAllVideo = getVideoByParent(_id)
  const endpointVideo = title == 'الدروس الحديثية' ? urlAllVideo : url
  const getData = async () => {
    FetchAPI(endpointVideo).then((data) => {
      if (data.success) {
        setDataMedia(data?.data)
      }
      console.log('media_data', data?.data)
    })
    console.log('media inside function', dataMedia)
  }
  useEffect(() => {
    getData()
  }, [])

  let myStyle =
    title === 'الدروس الحديثية'
      ? { color: '#22CABE' }
      : title === 'الدروس الحسنية'
      ? { color: '#1F7800' }
      : title === 'برامج تلفزية'
      ? { color: '#FF794D' }
      : title === 'برامج اذاعية'
      ? { color: '#FEBB1A' }
      : { color: '#CEBB97' }

  const settings = {
    infinite: dataMedia?.length > 4,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: dataMedia?.length > 4 ? 4 : dataMedia?.length,
    arrows: true,
    dots: true,
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
              <div className='w-50'>
                <div className={`${styles.playerWrapper} player-wrapper`}>
                  <ReactPlayer
                    url={[
                      {
                        src: `${base_url}${dataMedia[0]?.field_upload_video}`,
                        type: 'video/mp4',
                      },
                    ]}
                    light={`${base_url}/${dataMedia[0]?.field_thumbnail_video}`}
                    controls
                    playing
                    className={`${styles.reactPlayer} react-player`}
                    width='100%'
                    height='100%'
                  />
                </div>
                <h4 className='my-3'>{dataMedia[0]?.title}</h4>
              </div>
            </div>
            <div className='mt-4'>
              <Slider {...settings}>
                {dataMedia?.map((item, index) => {
                  return (
                    <div key={index} className={`mt-5`}>
                      <div className={`${styles.playerWrapper} player-wrapper`}>
                        <ReactPlayer
                          url={[
                            {
                              src: `${base_url}${item?.field_upload_video}`,
                              type: 'video/mp4',
                            },
                          ]}
                          light={`${base_url}${item?.field_thumbnail_video}`}
                          controls
                          playing
                          className={`${styles.reactPlay} react-player`}
                          width='100%'
                          height='100%'
                        />
                      </div>
                      <h4 className={`${styles.description} h6 my-3`}>
                        {item?.title}
                      </h4>
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
