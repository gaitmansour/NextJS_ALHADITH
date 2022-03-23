import React, { useEffect, useState } from 'react'
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
} from '../../endpoints'
import FetchAPI from '../../API'
import ReactPlayer from 'react-player'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import TabMedia from './TabMedia'

const media = ({ props }) => {
  const video = useRouter()?.query?.video
  const titleVideo = useRouter()?.query?.titleVideo
  const light = useRouter()?.query?.light
  console.log('titleVideo', titleVideo)
  console.log('light', light)
  const title = useRouter()?.query?.title?.split('-').join(' ')
  console.log('titre query', useRouter())
  const urlMenu = getMenuByName(title)
  //   const title = 'الدروس الحديثية'
  const [start, setStart] = useState(false)
  const [dataAPI, setDataAPI] = useState([])
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [itemOffset, setItemOffset] = useState(0)
  const [dataItems, setDataItems] = useState([])

  const url = getVideo(title)
  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
      console.log('media_data', data?.data)
      console.log('media', dataAPI)
    })
  }
  //
  //
  const getItemsMenu = async (tid) => {
    return FetchAPI(getSideItems(tid)).then((data) => {
      if (data.success) {
        console.log('data------------------------items')
        console.log(data?.data)
      }
    })
  }
  useEffect(() => {
    if (title) {
      getData()
    }
    getItemsMenu(50)
    getItemsMenu(51)
  }, [title])
  //
  // pagination
  //
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items fromm ${itemOffset} to ${endOffset}`)
    setCurrentItems(dataAPI?.data?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(dataAPI?.data?.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, dataAPI])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataAPI?.data?.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
  }

  //
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
  const sideData11 = [
    {
      title: 'الدروس الحديثية',
      path: '/media/برامج تلفزية',
      parentLabel: 'التلفزة الرقمية',
      items: [
        {
          title: 'الدروس التمهيدية',
          path: '/media/الدروس التمهيدية',
          parentLabel: 'الدروس الحديثية',
          items: [],
        },
        {
          title: 'الدروس البيانية',
          path: '/media/الدروس البيانية',
          parentLabel: 'الدروس الحديثية',
          items: [],
        },
        {
          title: 'الدروس التفاعلية',
          path: 'media/الدروس التفاعلية',
          parentLabel: 'الدروس الحديثية',
          items: [],
        },
      ],
    },
    {
      title: 'الدروس الحسنية',
      path: '/media/الدروس الحسنية',
      parentLabel: 'التلفزة الرقمية',
      items: [],
    },
    {
      title: 'برامج اذاعية',
      path: 'media/برامج اذاعية',
      parentLabel: 'التلفزة الرقمية',
      items: [],
    },
    {
      title: 'برامج تلفزية',
      path: '/media/برامج تلفزية',
      parentLabel: 'التلفزة الرقمية',
      items: [],
    },
    {
      title: 'برامج على الشبكات الاجتماعية',
      path: '/media/برامج على الشبكات الاجتماعية',
      parentLabel: 'التلفزة الرقمية',
      items: [],
    },
  ]

  console.log('show start------', start)
  if (_.isEmpty(dataAPI)) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }

  var leng = dataAPI?.included?.length

  // console.log('data item media ', dataAPI?.data)
  // let vedioTop = [dataAPI?.included?.map((item) => item?.attributes?.uri?.url)]
  // let filterVedio = vedioTop[0].filter((x) => x == video)

  // console.log('vedioQuery', video)
  // console.log('vedioTop', filterVedio[0])
  // console.log('vedioTop', vedioTop)
  return (
    <TemplateArticle {...props} ListBreadcrumb={data} title={'t'}>
      <TabMedia titlepage={title} dataTab={sideData11} />
      <Body className={`${styles.TemplateMediaBody} ${styles.Media}  p-3`}>
        <ScrollButton />
        <div className={`${styles.sectionTop} `}>
          {/* <label className={styles.blocSearch} htmlFor='search'>
              <span className='mx-2 fw-bold text-success'>{'البحث'} :</span>
              <div className={styles.searchInput}>
                <input id='search' type='text' onChange={handleSearch} />
                <i className='fas fa-search p-3' style={{ color: '#157646' }} />
              </div>
            </label> */}
          {/* <div className={styles.blocFilter}>
            <select className='px-2'>
              <option selected>{'التلفزة الرقمية'}</option>
              {sideData11?.map((item, index) => {
                return <option value='1'>{item.title}</option>
              })}
            </select>
            <i className='fas fa-filter' style={{ color: '#157646' }} />
          </div> */}
        </div>
        {dataAPI?.data?.length > 0 ? (
          <>
            <div
              className={`${styles.boxFirstVideo} d-flex align-items-center justify-content-center mb-2`}
            >
              <div className={`${styles.videoTop} w-50 mb-5`}>
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
                        : [
                            {
                              src: `${base_url}${
                                dataAPI?.included[leng / 2]?.attributes?.uri
                                  ?.url
                              }`,
                              type: 'video/mp4',
                            },
                          ]
                    }
                    light={
                      light
                        ? `${base_url}/${light}`
                        : `${base_url}/${dataAPI?.included[0]?.attributes?.uri?.url}`
                    }
                    controls
                    playing
                    className={`${styles.reactPlayer} react-player`}
                    width='90%'
                    height='90%'
                  />
                </div>
                <h3 className={`${styles.titleVideo}`} style={{ fontSize: 18 }}>
                  {titleVideo ? titleVideo : dataAPI.data[0].attributes.title}
                </h3>
              </div>
            </div>
            <div className='row '>
              {currentItems?.map((item, i) => {
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
                          url={[
                            {
                              src: `${base_url}${
                                dataAPI?.included[i + leng / 2]?.attributes?.uri
                                  ?.url
                              }`,
                              type: 'video/mp4',
                            },
                          ]}
                          key={`${base_url}${
                            dataAPI?.included[i + leng / 2]?.attributes?.uri
                              ?.url
                          }`}
                          playsinline={true}
                          playing={selectVideo === i ? true : false}
                          light={`${base_url}${dataAPI?.included[i]?.attributes?.uri?.url}`}
                          controls
                          className={`${styles.reactPlay} react-player`}
                          width='100%'
                          height='100%'
                        />
                      </div>
                      <div className='mt-4'>
                        <span>{item?.attributes?.title}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {dataAPI?.data?.length > 0 && (
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
                  breakClassName={'break-me'}
                  activeClassName={styles.activebtn}
                  containerClassName={`pagination justify-content-evenly align-content-around w-25 py-2 my-5 ${styles.paginationButtons}`}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                />
              </div>
            )}
          </>
        ) : null}
      </Body>
    </TemplateArticle>
  )
}

export default media
