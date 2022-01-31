import React, {useEffect, useState} from 'react'
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
import {useRouter} from 'next/router'
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
import {Icons} from '../../assets'

import Router from 'next/router'

export default function ArticlePage(props) {
    const title = useRouter()?.query?.title
    const parentBigTitle = useRouter()?.query?.parentBigTitle
    console.log('useRouter()?.query---------------------------')
    console.log(useRouter()?.query)

    const myLoader = ({src, width, quality}) => {
        return `${base_url}/${src}`
    }

    const [dataAPI, setDataAPI] = useState({})
    const [dataTags, setDataTags] = useState([])
    const [dataMenu, setdataMenu] = useState({})
    const [dataSlider, setdataSlider] = useState({})
    const [dataSide, setDataSide] = useState({})
    const [parentTitle, setparentTitle] = useState()
    const [refresh, setRefresh] = useState(false)
    const [parent, setParent] = useState()
    const [items, setItems] = useState({})
    const [dataAhadith, setDataAhadith] = useState([])
    const urlAhadith = getTopic()
    const CodeTopic = 28

    const url = getArticleById(title)
    const urlMenu = getMenuByName(parentTitle ? parentTitle : title)
    const getData = async () => {
        FetchAPI(url).then((data) => {
            if (data.success) {
                setDataAPI(data?.data)
                setDataTags(data?.data?.included)
            }
        })
    }
    const getDataSlider = async (name, tid, parent_target) => {
        const urlSlider = getSideArticle(name, tid, parent_target)
        FetchAPI(urlSlider).then((data) => {
            if (data.success) {
                setdataSlider(data?.data)
                localStorage.setItem("datSliderLeft", JSON.stringify(data?.data))
            }
        })
    }
    const getDataMenu = async (x) => {
        return FetchAPI(getMenuByName(x)).then((data) => {
            if (data.success) {
                setdataMenu(data?.data[0])
                localStorage.setItem("parent", JSON.stringify(data?.data[0]))

                setParent(data?.data[0]?.name_1)
                getItemsMenu(data?.data[0]?.parent_target_id)
                return data?.data[0]
            }
        })
    }

    const getItemsMenu = async (x) => {
        return FetchAPI(getSideItems(x)).then((data) => {
            if (data.success) {
                const items = data?.data.map((item, index) => {
                    return {
                        label: item.name,
                        title: item.name,
                        tID: item.tid,
                        path: `article/${item.name}`,
                        parentLabel: item.parent_target_id_1,
                        parentID: item.parent_target_id,
                    }
                })
                setItems(items)
                localStorage.setItem("items", JSON.stringify(items))
                return items
            }
        })
    }
    let router = useRouter().query
    let route = useRouter()
    const handleSideData = (router) => {
        // console.log('router')
        const data = router?.fromNav ? router?.fromNav : dataSide
        sessionStorage.setItem('dataSide', JSON.stringify(data))
        const selectedItem = router?.selectedItem
            ? router?.selectedItem
            : parentTitle
        let routeState
        if (router) {
            localStorage.setItem('routeState', JSON.stringify(router))
            routeState = router
        } else {
            routeState = localStorage.getItem('routeState')
            if (routeState) routeState = JSON.parse(routeState)
        }
        setDataSide(routeState.fromNav)
        console.log('routeState.fromNav--------------------')
        console.log(routeState.fromNav)
        setparentTitle(selectedItem ? selectedItem : routeState.selectedItem)
    }

    useEffect(() => {
        let sliderCheck = JSON.parse(localStorage.getItem("dataSlider"))
        let sliders = JSON.parse(localStorage.getItem("datSliderLeft"))
        let parent = JSON.parse(localStorage.getItem("parent"))
        let items = JSON.parse(localStorage.getItem("items"))
        /* if (sliderCheck?.from == 'slider' || performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            setdataSlider(sliders)
            getDataMenu(parentTitle ? parentTitle : title)
            setItems(items)
        }else {*/
        if (sliderCheck) {
            setdataSlider(sliders)
            setdataMenu(parent)
            setItems(items)
            handleSideData(router)
        } else {
            console.log('sssssssssssssssssss')
            console.log(parentTitle ? parentTitle : title)
            getDataMenu(parentTitle ? parentTitle : title).then((r) => {
                getDataSlider(r?.name_1, r?.tid, r?.parent_target_id_1)
                handleSideData(router)
            })
        }

        //}
        getData()
    }, [parentTitle, route])

    useEffect(() => {
        FetchAPI(`${urlAhadith}/${CodeTopic}`).then((data) => {
            if (data.success) {
                setDataAhadith(data?.data)
            }
        })
    }, [])
    const data = [
        {
            title: 'الرئيسية',
            path: '',
        },
        {
            title: parentBigTitle ? parentBigTitle : dataMenu?.parent_target_id_1,
            path: '',
        },
        {
            title: title,
            path: '#',
        },
    ]

    console.log('data-----------', data)
    if (_.isEmpty(dataAPI)) {
        return (
            <div className='d-flex align-items-center justify-content-center py-5'>
                <Loading/>
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
            titlePage={dataAPI?.data[0]?.attributes?.title}
            createdArticle={!!dataAPI?.data[0]?.attributes?.created}
            dateArticlePage={Moment(dataAPI?.data[0]?.attributes?.created).format(
                'DD-MM-YYYY'
            )}
        >
            <Body
                className={`${styles.TemplateArticleBody} ${styles.articls}TemplateArticleBody d-flex p-4`}
            >
                <div className={`${styles.articleContent} flex-fill`}>
                    <PageSummary
                        className={`${styles.summ} summ my-3`}
                        summary={dataAPI?.data[0]?.attributes?.body?.summary}
                    />
                    {/* <PageTitleSecond className="page-title-second py-3" title="مبادرة ملكية لتعميم الحديث النبوي الشريف الصحيح على نطاق واسع" /> */}
                    {dataAPI?.included &&
                        dataAPI?.included[dataAPI?.included?.length - 1]?.attributes?.uri
                            ?.url && (
                            <div className={`${styles.sectionImage} px-3`}>
                                <Image
                                    src={
                                        dataAPI?.included[dataAPI?.included?.length - 1]?.attributes
                                            ?.uri?.url
                                    }
                                    className='m-auto w-100 my-4'
                                    width={850}
                                    height={500}
                                    loader={myLoader}
                                    alt={
                                        dataAPI?.data[0]?.relationships?.field_image?.data?.meta
                                            ?.alt
                                    }
                                />
                                <span>
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
                    <div className={`${styles.articleTags} d-flex `}>
                        {dataTags &&
                            dataTags?.map((tag, index) => {
                                return (
                                    <Link
                                        passHref
                                        key={index.toString()}
                                        exact
                                        activeClassName='nav-bar-active'
                                        href={{
                                            pathname: `/articlesByTag/${tag?.attributes?.drupal_internal__tid}`,
                                            search: '',
                                            hash: '',
                                            query: {title: tag?.attributes?.drupal_internal__tid},
                                        }}
                                        as={`/articlesByTag/${tag?.attributes?.drupal_internal__tid}`}
                                    >
                                        <a style={{textDecoration: 'none'}}>
                                            <Badgs
                                                className={`${styles.badgTag}`}
                                                key={index}
                                                tags={tag?.attributes?.name}
                                            />
                                        </a>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                {items[0]?.path === 'article/تعریف' ? (
                    <div className={styles.slider} style={{width: '30%'}}>
                        <ListAhadith data={dataAhadith}/>
                        <SliderList className='pt-5' data={dataSlider} loader={myLoader}/>
                    </div>
                ) : (
                    <div
                        className={` ${styles.slider} side-bar px-3`}
                        style={{width: '30%'}}
                    >
                        {!items ? (
                            <SimpleList data={dataSide}/>
                        ) : (
                            <SimpleList data={items}/>
                        )}
                        <SliderList onClick={() => localStorage.setItem("dataSlider", JSON.stringify({
                            from: "slider"
                        }))} className='pt-5' data={dataSlider}
                                    loader={myLoader}/>
                    </div>
                )}
            </Body>
        </TemplateArticle>
    )
}
