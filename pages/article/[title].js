import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  base_url,
  getArticleById,
  getMenuByName,
  getSideArticle,
  getSideItems,
  getTopic,
} from '../../endpoints'
import FetchAPI from '../../API'
import { useRouter } from 'next/router'
import Moment from 'moment'
import styles from './article.module.css'
import Loading from '../../components/_UI/Loading'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import PageSummary from '../../components/_UI/PageSummary'
import SimpleList from '../../components/_UI/SimpleList'
import SliderList from '../../components/_UI/SliderList'
import Badgs from '../../components/_UI/Badgs'
import ListAhadith from '../../components/_UI/ListAhadith'
import loadNamespaces from 'next-translate/loadNamespaces'
import Image from 'next/image'
import Link from 'next/link'
import { Icons } from '../../assets'
import ScrollButton from '../../components/ScrollButton'

export default function ArticlePage(props) {
  let params = useRouter()?.query
  const title = useRouter()?.query?.title?.split('-').join(' ')

  console.log('useRouter title ===>', params)

  let dataValue =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('categorieTitle'))
  console.log('dataValue', dataValue)
  let contenuArticle =
    params?.from == 'CarouselHome' ||
    params?.from == 'ressources' ||
    params?.from == 'Croyants'
      ? params?.contenuArticle || dataValue.contenuArticle
      : params?.contenuArticle !== '' || dataValue.contenuArticle !== ''
      ? params?.contenuArticle || dataValue.contenuArticle
      : title

  // params?.contenuArticle !== '' || dataValue.contenuArticle !== ''
  //   ? params?.contenuArticle || dataValue.contenuArticle
  //   : title
  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }

  const [dataAPI, setDataAPI] = useState({})
  const [dataTags, setDataTags] = useState([])
  const [dataMenu, setdataMenu] = useState({})
  const [dataSlider, setdataSlider] = useState([])
  const [dataSide, setDataSide] = useState({})
  const [parentTitle, setparentTitle] = useState()
  const [parent, setParent] = useState()
  const [items, setItems] = useState({})
  const [dataAhadith, setDataAhadith] = useState([])
  const urlAhadith = getTopic()
  const CodeTopic = 28

  console.log('contenuArticle ==>', contenuArticle)
  const url = getArticleById(contenuArticle)
  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
        setDataTags(data?.data?.included)
        console.log('data?.data articles => ', data?.data)
      }
    })
  }
  useEffect(() => {
    getData()
  }, [contenuArticle])

  const getDataSlider = async (name, tid, parent_target) => {
    const urlSlider = getSideArticle(name, tid, parent_target)
    FetchAPI(urlSlider).then((data) => {
      if (data.success) {
        setdataSlider(data?.data)
        console.log('data?.data ==>', name, 'tid', tid, parent_target)
      }
    })
  }
  const getDataMenu = async (x) => {
    return FetchAPI(getMenuByName(x)).then((data) => {
      if (data.success) {
        setdataMenu(data?.data[0])
        setParent(data?.data[0]?.name_1)
        return data?.data[0]
      }
    })
  }

  const getItemsMenu = async (x) => {
    return FetchAPI(getSideItems(x)).then((data) => {
      if (data.success) {
        console.log('data------------------------items')
        console.log(data?.data)
        const items = data?.data
          ?.sort((a, b) => {
            return b.weight - a.weight
          })
          .map((item, index) => {
            return {
              label: item.name,
              title: item.name,
              tID: item.tid,
              path: `article/${item.name}`,
              parentLabel: item.parent_target_id_1,
              parentID: item.parent_target_id,
              field_contenu_default: item.field_contenu_default,
            }
          })
        setItems(items)
        return items
      }
    })
  }
  let router = useRouter().query
  let route = useRouter()

  useEffect(() => {
    getDataMenu(title?.split('-').join(' ')).then((r) => {
      console.log('useEffect', title)
      if (r) {
        getDataSlider(r?.name_1, r?.tid, r?.parent_target_id_1)
      } else {
        getDataSlider(dataValue.child, dataValue.tidChild, dataValue.parent)
      }
      //handleSideData(router)
    })

    //getDataSlider(dataValue.child, dataValue.tidChild,dataValue.parent)
  }, [route])

  useEffect(() => {
    FetchAPI(`${urlAhadith}/${CodeTopic}`).then((data) => {
      if (data.success) {
        setDataAhadith(data?.data)
      }
    })
  }, [])

  let TID =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('tid'))
  console.log('TID:--------------------', TID)
  useEffect(() => {
    getItemsMenu(TID)
  }, [TID])

  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: dataValue.parent,
      path: '',
    },
    {
      title: dataValue.child,
      path: '#',
    },
  ]

  console.log('data-----------', dataValue)
  if (_.isEmpty(dataAPI)) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }
  // if (dataAPI?.data[0]?.attributes?.body?.processed.includes("src=")) {
  //     var str = dataAPI?.data[0]?.attributes?.body?.processed.substr(dataAPI?.data[0]?.attributes?.body?.processed.lastIndexOf("src=")).split(' ')[0].slice(5)
  // }

  let contentMeta = dataAPI?.data[0]?.attributes?.body?.summary
  return (
    <TemplateArticle
      {...props}
      ListBreadcrumb={data}
      titlePage={contenuArticle}
      createdArticle={!!dataAPI?.data[0]?.attributes?.created}
      dateArticlePage={Moment(dataAPI?.data[0]?.attributes?.created).format(
        'DD-MM-YYYY'
      )}
    >
      <Body
        className={`${styles.TemplateArticleBody} ${styles.articls} TemplateArticleBody d-flex p-4`}
      >
        <ScrollButton />
        <div className={`${styles.articleContent} flex-fill`}>
          <PageSummary
            className={`${styles.summ} summ my-3`}
            summary={dataAPI?.data[0]?.attributes?.body?.summary}
          />
          {/* <PageTitleSecond className="page-title-second py-3" title="مبادرة ملكية لتعميم الحديث النبوي الشريف الصحيح على نطاق واسع" /> */}
          {dataAPI?.included &&
            dataAPI?.included[dataAPI?.included?.length - 1]?.attributes?.uri
              ?.url && (
              <div className={`${styles.sectionImage}`}>
                <Image
                  src={
                    dataAPI?.included[dataAPI?.included?.length - 1]?.attributes
                      ?.uri?.url
                  }
                  className='m-auto w-100 my-4'
                  objectFit='cover'
                  width={850}
                  height={500}
                  loader={myLoader}
                  alt={
                    dataAPI?.data[0]?.relationships?.field_image?.data?.meta
                      ?.alt
                  }
                />
                <span className='my-3'>
                  {
                    dataAPI?.data[0]?.relationships?.field_image?.data?.meta
                      ?.alt
                  }
                </span>
              </div>
            )}
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: dataAPI?.data[0]?.attributes?.body?.value,
            }}
          />
          <div className={`${styles.articleTags}`}>
            {dataTags &&
              dataTags?.map((tag, index) => {
                return (
                  <div className={styles.sectionTags}>
                    <Link
                      passHref
                      key={index.toString()}
                      exact
                      activeClassName='nav-bar-active'
                      href={{
                        pathname: `/articlesByTag/${tag?.attributes?.drupal_internal__tid}`,
                        search: '',
                        hash: '',
                        query: { title: tag?.attributes?.drupal_internal__tid },
                      }}
                      as={`/articlesByTag/${tag?.attributes?.drupal_internal__tid}`}
                    >
                      <a
                        style={{ textDecoration: 'none' }}
                        onClick={() => {
                          localStorage.setItem(
                            'tagTitle',
                            JSON.stringify(
                              tag?.attributes?.drupal_internal__tid
                            )
                          )
                        }}
                      >
                        <Badgs
                          className={`${styles.badgTag} `}
                          key={index}
                          tags={tag?.attributes?.name}
                        />
                      </a>
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
        {items[0]?.path === 'article/تعریف' ? (
          <div className={styles.slider} style={{ width: '30%' }}>
            <ListAhadith data={dataAhadith} />
            <SliderList className='pt-5' data={dataSlider} loader={myLoader} />
          </div>
        ) : (
          <div
            className={` ${styles.slider} side-bar px-3`}
            style={{ width: '30%' }}
          >
            {!items ? (
              <SimpleList data={dataSide} />
            ) : (
              <SimpleList data={items} />
            )}
            <SliderList className='pt-5' data={dataSlider} loader={myLoader} />
          </div>
        )}
      </Body>
    </TemplateArticle>
  )
}
