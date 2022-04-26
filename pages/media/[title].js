import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './media.module.css'
import TemplateArticle from '../../components/TemplateArticle'
import ScrollButton from '../../components/ScrollButton'
import Body from '../../components/Body'
import Loading from '../../components/_UI/Loading'
import _ from 'lodash'
import PageTitleSecond from '../../components/_UI/PageTitleSecond'
import {
  base_url,
  getMenuByName,
  getSideItems,
  getVideo,
  getVideoMedia,
  getMenu,
  getVideoByParent,
} from '../../endpoints'
import FetchAPI from '../../API'
import ReactPlayer from 'react-player'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import TabMedia from './TabMedia'
import Image from 'next/image'
import { Icons } from '../../assets'
import { handleMenu } from '../../helpers'

const media = ({ props }) => {
  const video = useRouter()?.query?.video
  const titleVideo = useRouter()?.query?.titleVideo
  const light = useRouter()?.query?.light
  // const _id = useRouter()?.query?._id

  let _id =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('tid'))
  console.log('dataValue tid =>', _id)

  const title = useRouter()?.query?.title?.split('-').join(' ')
  console.log('_id query', useRouter().query)
  const urlMenu = getMenu()
  const [start, setStart] = useState(false)
  const [dataAPI, setDataAPI] = useState([])
  const [dataTab, setDataTab] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const PER_PAGE = 12
  const url = getVideoMedia(title)
  const urlAllVideo =
    title == 'الدروس التمهيدية' ||
    title == 'الدروس البيانية' ||
    title == 'الدروس التفاعلية'
      ? getVideoByParent(null, _id)
      : getVideoByParent(_id, _id)
  // const urlAllVideo = getVideoByParent(51)
  // const endpointVideo = title == 'الدروس الحديثية' ? urlAllVideo : url
  const [param_id, setParam_id] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      console.log('router.query =>', router)
      // setParam_id(router?.query?._id)
    }
  }, [router.isReady])
  // console.log('param_id =>', param_id)

  const getData = async () => {
    FetchAPI(urlAllVideo).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
      console.log('media_data', data?.data)
    })
  }

  useEffect(() => {
    if (title) {
      getData()
    }
  }, [title])

  //
  const getItemsMenu = async (tid) => {
    return FetchAPI(getSideItems(tid)).then((data) => {
      if (data.success) {
        if (tid == 50) {
          setDataTab(data?.data)
        }
      }
    })
  }
  console.log('dataTab', dataTab)
  useEffect(() => {
    getItemsMenu(50)
  }, [])

  //palyer video
  //
  const [selectVideo, setsSelectVideo] = useState('')

  //
  //data
  //
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
      path: 'article/' + title?.split(' ').join('-'),
    },
  ]

  const handlePageClick = (e) => {
    setCurrentPage(e.selected)
  }

  const offset = currentPage * PER_PAGE

  const pageCount = Math.ceil(dataAPI.length / PER_PAGE)
  useEffect(() => {
    // setCurrentPage(0)
    handlePageClick({ selected: 0 })
  }, [title])

  console.log('show start------', start)
  // if (_.isEmpty(currentItems)) {
  //   return (
  //     <div className='d-flex align-items-center justify-content-center py-5'>
  //       <Loading />
  //     </div>
  //   )
  // }
  const loadURLVideo = (item) => {
    return !_.isEmpty(item?.field_upload_video)
      ? [{ src: `${base_url}${item?.field_upload_video}`, type: 'video/mp4' }]
      : item?.field_lien_video
  }
  // var leng = dataAPI?.included?.length
  return (
    <TemplateArticle {...props} ListBreadcrumb={data} title={'t'}>
      <TabMedia titlepage={title} dataTab={dataTab} />
      <Body className={`${styles.TemplateMediaBody} ${styles.Media}  p-3`}>
        <ScrollButton />
        {dataAPI?.length > 0 ? (
          <>
            <div
              className={`${styles.boxFirstVideo} d-flex align-items-center justify-content-center mb-2 mt-5`}
            >
              <div className={`${styles.videoTop} w-50 mb-5 mt-5`}>
                <div
                  className={`${styles.playerWrapper} player-wrapper`}
                  // onClick={() => handleStart()}
                >
                  <ReactPlayer
                    url={
                      video
                        ? [
                            {
                              src: `${base_url}${video}`,
                              type: 'video/mp4',
                            },
                          ]
                        : dataAPI[0]?.field_upload_video
                        ? [
                            {
                              src: `${base_url}${dataAPI[0]?.field_upload_video}`,
                              type: 'video/mp4',
                            },
                          ]
                        : dataAPI[0]?.field_lien_video
                    }
                    light={
                      light
                        ? `${base_url}/${light}`
                        : `${base_url}/${dataAPI[0]?.field_thumbnail_video}`
                    }
                    controls
                    playing
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
                    className={`${styles.reactPlayer} react-player`}
                    width='90%'
                    height='90%'
                  />
                </div>
                <h3 className={`${styles.titleVideo}`} style={{ fontSize: 18 }}>
                  {titleVideo ? titleVideo : dataAPI[0]?.title}
                </h3>
                <hr />
                <p>{dataAPI[0]?.field_description_video}</p>
              </div>
            </div>
            <div className='row '>
              {dataAPI?.slice(offset, offset + PER_PAGE).map((item, i) => {
                // console.log('itemmmmmm=>', item)
                return (
                  <div
                    key={i.toString()}
                    className={`${styles.groupCard} col col-12 col-lg-3 col-md-4 col-sm-1 my-5`}
                  >
                    <div className={`${styles.cardVideo} p-3 shadow-card mx-1`}>
                      <div
                        onClick={() => setsSelectVideo(i)}
                        className={`${styles.playerWrapper} player-wrapper`}
                      >
                        <ReactPlayer
                          url={loadURLVideo(item)}
                          key={item?.field_upload_video}
                          playsinline={true}
                          playing={selectVideo === i ? true : false}
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
                          light={`${base_url}${item?.field_thumbnail_video}`}
                          controls
                          className={`${styles.reactPlay} react-player`}
                          width='100%'
                          height='100%'
                        />
                      </div>
                      <h5 className='mt-4 h6'>{item?.title}</h5>
                      {item?.field_description_video && (
                        <>
                          <hr />
                          <p className={styles.descVideo}>
                            {item?.field_description_video}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {dataAPI?.length > 0 && (
              <div className='d-flex justify-content-center align-items-center'>
                <ReactPaginate
                  previousLabel={
                    <i
                      id='pagination'
                      className='fa fa-chevron-right text-success'
                    />
                  }
                  nextLabel={
                    <i
                      id='pagination'
                      className='fa fa-chevron-left text-success'
                    />
                  }
                  breakLabel={'...'}
                  // breakClassName={'break-me'}
                  activeClassName={styles.activebtn}
                  containerClassName={`pagination justify-content-evenly align-content-around w-25 py-2 my-5 ${styles.paginationButtons}`}
                  // pageRangeDisplayed={5}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  forcePage={currentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <Image
              src={Icons.icon_video}
              alt=''
              className={'ImageSlider my-4'}
              width='100%'
              height='100%'
            />
            <h4 className='mt-3 mb-4'>{'لا توجد نتائج'}</h4>
          </div>
        )}
      </Body>
    </TemplateArticle>
  )
}

export default media
