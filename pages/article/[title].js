import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  base_url,
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
import Image from 'next/image'
import Link from 'next/link'
import { Icons } from '../../assets'
import ScrollButton from '../../components/ScrollButton'
import { getData, getDataMenu } from '../../lib/article'
import { getMenuList } from '../../lib/menu'
// import { isMobile, isIOS } from 'react-device-detect'

export default function ArticlePage(props, { dataAPI }) {
  let params = useRouter()?.query
  const title = useRouter()?.query?.title?.split('-').join(' ')

  let dataValue =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('categorieTitle'))

  // const [dataAPI, setDataAPI] = useState({})
  const [showBlockSlider, setShowBlockSlider] = useState(true)
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

  const getDataMenu = async (x) => {
    return FetchAPI(getMenuByName(x)).then((data) => {
      if (data.success) {
        setdataMenu(data?.data[0])
        setParent(data?.data[0]?.name_1)
        return data?.data[0]
      }
    })
  }

  const getDataSlider = async (name, tid, parent_target) => {
    const urlSlider = getSideArticle(name, tid, parent_target)
    FetchAPI(urlSlider).then((data) => {
      if (data.success) {
        let dataArray = data?.data
        let array = [...dataArray] // make a separate copy of the array
        let index = array.filter(
          (item) =>
            item.title.replace(/<[^>]+>/g, '') !==
            props.dataAPI?.data[0]?.attributes?.title
        )

        if (index.length === 0) {
          setShowBlockSlider(false)
        } else {
          setdataSlider(index)
          setShowBlockSlider(true)
        }
        //  setdataSlider(data?.data)

        // return data?.data
      }
    })
  }

  const getItemsMenu = async (x) => {
    return FetchAPI(getSideItems(x)).then((data) => {
      if (data.success) {
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
  let { query } = useRouter()
  let route = useRouter()
  let router = useRouter().query

  useEffect(() => {
    getDataMenu(title?.split('-').join(' ')).then((r) => {
      if (r) {
        getDataSlider(r?.name_1, r?.tid, r?.parent_target_id_1)
      } else {
        getDataSlider(dataValue?.child, dataValue?.tidChild, dataValue?.parent)
      }
      //handleSideData(router)
    })

    //getDataSlider(dataValue.child, dataValue.tidChild,dataValue.parent)
  }, [route, showBlockSlider])

  useEffect(() => {
    FetchAPI(`${urlAhadith}/${CodeTopic}`).then((data) => {
      if (data.success) {
        setDataAhadith(data?.data)
      }
    })
  }, [])

  let TID =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('tid'))
      ? typeof window !== 'undefined' && JSON.parse(localStorage.getItem('tid'))
      : props?.dataMenuA?.parent_target_id

  useEffect(() => {
    getItemsMenu(TID)
  }, [TID])

  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: dataValue?.parent || props?.dataMenuA?.parent_target_id_1,
      path: '',
    },
    {
      title: dataValue?.child || props?.dataMenuA?.name_1,
      path: '#',
    },
  ]

  return (
    <TemplateArticle
      {...props}
      ListBreadcrumb={data}
      titlePage={props.dataAPI?.data[0]?.attributes?.title}
      createdArticle={!!props.dataAPI?.data[0]?.attributes?.created}
      dateArticlePage={Moment(
        props.dataAPI?.data[0]?.attributes?.created
      ).format('DD-MM-YYYY')}
    >
      <Body
        id='templateArticleBody'
        className={`${styles.TemplateArticleBody} ${styles.articls} TemplateArticleBody d-flex p-4`}
      >
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        {/* {isIOS ? null : <ScrollButton />} */}
        <ScrollButton />
        <article className={`${styles.articleContent} flex-fill`}>
          <PageSummary
            className={`${styles.summ} summ my-3`}
            summary={props.dataAPI?.data[0]?.attributes?.body?.summary}
          />
          {/* <PageTitleSecond className="page-title-second py-3" title="مبادرة ملكية لتعميم الحديث النبوي الشريف الصحيح على نطاق واسع" /> */}
          {props.dataAPI?.included &&
            props.dataAPI?.included[props.dataAPI?.included?.length - 1]
              .attributes?.uri?.url && (
              <div className={`${styles.sectionImage}`}>
                <Image
                  src={`${base_url}/${
                    props.dataAPI?.included[props.dataAPI?.included?.length - 1]
                      .attributes?.uri?.url
                  }`}
                  className='m-auto w-100 my-4'
                  objectFit='cover'
                  width={850}
                  height={500}
                  // loader={myLoader}
                  alt={
                    props.dataAPI?.data[0]?.relationships?.field_image?.data
                      ?.meta?.alt
                  }
                />
                <span className='my-3'>
                  {
                    props.dataAPI?.data[0]?.relationships?.field_image?.data
                      ?.meta?.alt
                  }
                </span>
              </div>
            )}
          <div
            id='description'
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: props.dataAPI?.data[0]?.attributes?.body?.value,
            }}
          />
          <div className={`${styles.articleTags}`}>
            {props.dataTags &&
              props.dataTags?.map((tag, index) => {
                return (
                  <div key={index} className={styles.sectionTags}>
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
        </article>
        {items[0]?.path === 'article/تعریف الحديث الموضوع' ? (
          <div className={styles.slider} style={{ width: '30%' }}>
            <ListAhadith data={dataAhadith} />
            <SliderList className='pt-5' data={dataSlider} />
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
            {showBlockSlider ? (
              <SliderList className='pt-5' data={dataSlider} />
            ) : null}
          </div>
        )}
      </Body>
    </TemplateArticle>
  )
}

export const getServerSideProps = async ({ query, params }) => {
  // console.log('query=====>>>>>>>>', query)
  // console.log('params=====>>>>>>>>', params)
  // let contenuArticle =
  //   query?.contenuArticle !== '' ? query?.contenuArticle : params?.title
  const dataMenuArticle = await getDataMenu(params?.title?.split('-').join(' '))
  let contenuArticle =
    params?.from == 'Croyants' && dataMenuArticle?.dataMA?.field_contenu_default
      ? dataMenuArticle?.dataMA?.field_contenu_default
      : params?.from == 'CarouselHome' ||
        params?.from == 'ressources' ||
        params?.from == 'Croyants'
      ? params?.title?.split('-').join(' ')
      : query?.contenuArticle
      ? query?.contenuArticle
      : dataMenuArticle?.dataMA?.field_contenu_default
      ? dataMenuArticle?.dataMA?.field_contenu_default
      : params?.title?.split('-').join(' ')
  const data = await getData(contenuArticle)

  const MenuGlobal = await getMenuList()
  const dataAPI = data?.DataAPI
  const dataTags = data?.DataTags
  const dataMenuA = dataMenuArticle?.dataMA

  console.log('dataAPI ====>>>>', dataAPI)
  return {
    props: JSON.parse(
      JSON.stringify({
        MenuGlobal: MenuGlobal,
        dataAPI: dataAPI,
        dataTags: dataTags,
        dataMenuA: dataMenuA,
      })
    ),
  }
}
