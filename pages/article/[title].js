import React, {useEffect, useState} from "react";
import _ from "lodash"
import {base_url, getArticleById, getMenuByName, getSideArticle, getSideItems} from "../../endpoints"
import FetchAPI from "../../API";
import {useRouter} from "next/router";
import Moment from 'moment';
import styles from "./article.module.css"
import Loading from "../../components/_UI/Loading";
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";
import PageSummary from "../../components/_UI/PageSummary";
import SimpleList from "../../components/_UI/SimpleList";
import SliderList from "../../components/_UI/SliderList";
import loadNamespaces from "next-translate/loadNamespaces";


export default function ArticlePage(props) {

    console.log('useRouter()?.query---------------------------')
    console.log(useRouter()?.query)
    const title = useRouter()?.query?.selectedItem;
    const parentBigTitle = useRouter()?.query?.parentBigTitle
    //console.log('title----------------------------', title)
    //console.log('parentBigTitle----------------------------', parentBigTitle)
    const [dataAPI, setDataAPI] = useState({})
    const [dataMenu, setdataMenu] = useState({})
    const [dataSlider, setdataSlider] = useState({})
    const [dataSide, setDataSide] = useState({})
    const [parentTitle, setparentTitle] = useState()
    const [parent, setParent] = useState()
    const [items, setItems] = useState({})

    const url = getArticleById(title)
    const urlMenu = getMenuByName(parentTitle ? parentTitle : title)
    const getData = async () => {
        FetchAPI(url).then(data => {
            if (data.success) {
                console.log('data?', data?.data)
                setDataAPI(data?.data)
            }
        })
    }
    const getDataSlider = async (name, tid, parent_target) => {
        const urlSlider = getSideArticle(name, tid, parent_target)
        FetchAPI(urlSlider).then(data => {
            if (data.success) {
                setdataSlider(data?.data)
            }
        })
    }
    const getDataMenu = async (x) => {
        return FetchAPI(getMenuByName(x)).then(data => {
            if (data.success) {
                setdataMenu(data?.data[0])
                setParent(data?.data[0]?.name_1)
                getItemsMenu(data?.data[0]?.parent_target_id)
                return data?.data[0]
            }
        })
    }

    const getItemsMenu = async (x) => {
        return FetchAPI(getSideItems(x)).then(data => {
            if (data.success) {
                const items = data?.data.map((item, index) => {
                    return {
                        "label": item.name,
                        "title": item.name,
                        "tID": item.tid,
                        "path": `article/${item.name}`,
                        "parentLabel": item.parent_target_id_1,
                        "parentID": item.parent_target_id,
                    }
                })
                setItems(items)
                return items
            }
        })
    }
    let router = useRouter().query;
    const handleSideData = (router) => {
        console.log('router')
        const data = router?.fromNav ? router?.fromNav : dataSide;
        console.log("data------------------------------")
        console.log(data)
        sessionStorage.setItem('dataSide', JSON.stringify(data))
        const selectedItem = router?.selectedItem ? router?.selectedItem : parentTitle;
        let routeState
        if (router) {
            localStorage.setItem('routeState', JSON.stringify(router))
            routeState = router
        } else {
            routeState = localStorage.getItem('routeState')
            if (routeState)
                routeState = JSON.parse(routeState)
        }
        setDataSide(routeState.fromNav)
        setparentTitle(selectedItem ? selectedItem : routeState.selectedItem)
    }

    useEffect(() => {
        console.log("parentTitle ? parentTitle : title", parentTitle ? parentTitle : title)
        getDataMenu(parentTitle ? parentTitle : title).then((r) => {
            console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", r)
            getDataSlider(r?.name_1, r?.tid, r?.parent_target_id_1)
            handleSideData(router);
        })
        getData();
    }, [parentTitle, router])

    const data = [
        {
            "title": "الرئيسية",
            "path": "",
        },
        {
            "title": parentBigTitle ? parentBigTitle : dataMenu?.parent_target_id_1,
            "path": "",
        },
        {
            "title": title,
            "path": '#',
        },
    ]


    if (_.isEmpty(dataAPI)) {
        return (
            <div className="d-flex align-items-center justify-content-center py-5">
                <Loading/>
            </div>
        )
    }
    if (dataAPI?.data[0]?.attributes?.body?.processed.includes("src=")) {
        var str = dataAPI?.data[0]?.attributes?.body?.processed.substr(dataAPI?.data[0]?.attributes?.body?.processed.lastIndexOf("src=")).split(' ')[0].slice(5)
    }
    let contentMeta = dataAPI?.data[0]?.attributes?.body?.summary;
    return (
        <TemplateArticle  {...props} ListBreadcrumb={data}
                          titlePage={dataAPI?.data[0]?.attributes?.title}
                          createdArticle={!!dataAPI?.data[0]?.attributes?.created}
                          dateArticlePage={Moment(dataAPI?.data[0]?.attributes?.created).format('DD-MM-YYYY')}>
            <Body className={`${styles.TemplateArticleBody}TemplateArticleBody d-flex p-4`}>
                <div className="flex-fill">
                    <PageSummary className={`${styles.summ} summ my-3`}
                                 summary={dataAPI?.data[0]?.attributes?.body?.summary}/>
                    {/* <PageTitleSecond className="page-title-second py-3" title="مبادرة ملكية لتعميم الحديث النبوي الشريف الصحيح على نطاق واسع" /> */}
                    {dataAPI && dataAPI.included &&
                    <img className="m-auto w-100 my-4" src={`${base_url}/${dataAPI?.included[0]?.attributes?.uri?.url}`}
                         alt=""/>}
                    <div className={styles.desc}
                         dangerouslySetInnerHTML={{__html: dataAPI?.data[0]?.attributes?.body?.value.replace(str, base_url + str)}}/>
                </div>
                {items[0]?.path === "article/تعریف" ?
                    <div className={styles.slider} style={{width: "30%"}}>
                        {/*<Alahadith/>*/}
                    </div>
                    :
                    <div className="side-bar" style={{width: "30%"}}>
                        {!items ? <SimpleList data={dataSide}/> : <SimpleList data={items}/>}
                        <SliderList className="pt-5" data={dataSlider}/>
                    </div>
                }
            </Body>
        </TemplateArticle>
    );
}


