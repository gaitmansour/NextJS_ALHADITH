import React, {useEffect, useLayoutEffect, useState} from 'react'
import LiveSection from './LiveSection'
import styles from './AllMedia.module.css'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import ScrollButton from '../../components/ScrollButton'
import {getSideItems} from '../../endpoints'
import FetchAPI from '../../API'
import RowMedia from './RowMedia'
import {useRouter} from 'next/router'
import {getMenuList} from "../../lib/menu";
import {getDataLive, getItemsMenu} from "../../lib/allMedia";
// import { isMobile, isIOS } from 'react-device-detect'

const AllMedia = (props) => {
    /*const [categoryMedia, setCategoryMedia] = useState([])
    const [sousCategorie, setSousCategorie] = useState([])*/
    const [allDataMedia, setAllDataMedia] = useState([])
    /* const [NewAllMedia, setNewAllMedia] = useState([])
     const [NewCategoryMedia, setNewCategoryMedia] = useState([])*/
    /*const router = useRouter()
    const titleRouter = useRouter()?.query?.title*/
    let dataLive = props?.dataLive
    let categoryMedia = props?.dataMedia?.CategoryMedia
    let sousCategorie = props?.dataMedia?.SousCategorie
    /*const getItemsMenu = async (tid) => {
        return FetchAPI(getSideItems(tid)).then((data) => {
            if (data.success) {
                if (tid == 50) {
                    function move(from, to, arr) {
                        const newArr = [...arr]

                        const item = newArr.splice(from, 1)[0]
                        newArr.splice(to, 0, item)

                        return newArr
                    }

                    setCategoryMedia(move(1, 0, data?.data))
                }
                if (tid == 51) {
                    setSousCategorie(data?.data)
                }
            }
        })
    }

    useEffect(() => {
        if (titleRouter === 'التلفزة الرقمية' || router.isReady) {
            getItemsMenu(51)
            getItemsMenu(50)
        }
    }, [titleRouter, router.isReady])*/

    // useEffect(() => {
    //   function move(from, to, arr) {
    //     const newArr = [...arr]

    //     const item = newArr.splice(from, 1)[0]
    //     newArr.splice(to, 0, item)

    //     return newArr
    //   }
    //   if (router.isReady) {
    //     setNewAllMedia(move(1, 0, categoryMedia))
    //   }
    // }, [categoryMedia, titleRouter, router.isReady])

    useEffect(() => {
        if (categoryMedia && sousCategorie) {
            const merge = (a, b, i = 0) => a.splice(i, 0, ...b) && a
            setAllDataMedia(merge(categoryMedia, sousCategorie, 2))
        }
    }, [categoryMedia, sousCategorie])

    return (
        <TemplateArticle {...props} titlePage='التلفزة الرقمية'>
            <Body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                />
                {/* {isIOS ? null : <ScrollButton />} */}
                <ScrollButton/>
                <LiveSection dataLive={dataLive}/>
                {categoryMedia &&
                    sousCategorie &&
                    allDataMedia &&
                    allDataMedia?.map((item, index) => {
                        return item?.name == 'الدروس الحديثية' ? null : item?.name ==
                        'الدروس التمهيدية' ||
                        item?.name == 'الدروس البيانية' ||
                        item?.name == 'الدروس التفاعلية' ? (
                            <RowMedia
                                key={item?.tid}
                                title={item?.name.split(' ').join(' الحديثية ')}
                                _id={item?.tid}
                            />
                        ) : (
                            <RowMedia key={item?.tid} title={item?.name} _id={item?.tid}/>
                        )
                    })}
            </Body>
        </TemplateArticle>
    )
}
/*export const getServerSideProps = async () => {
    const dataAPI = await getDataAPI()
    const dataAPIDh = await getDataAPIDh()
    const dataAPIBt = await getDataAPIBt()
    const dataAPIBi = await getDataAPIBi()
    const dataAPIKi = await getDataAPIKi()
    const dataLive = await getDataLive()
    const MenuGlobal = await getMenuList()

    return {
        props: JSON.parse(JSON.stringify({
            MenuGlobal:MenuGlobal,
            dataAPI: dataAPI,
            dataAPIDh: dataAPIDh,
            dataAPIBt: dataAPIBt,
            dataAPIBi: dataAPIBi,
            dataAPIKi: dataAPIKi,
            dataLive: dataLive
        }))

    }
}*/
export const getServerSideProps = async ({query}) => {
    const titleRouter = query?.title
    const dataLive = await getDataLive()
    const MenuGlobal = await getMenuList()
    var MenuItems = null;
    var SousCategorie = null;

    if (titleRouter === 'التلفزة الرقمية') {
        MenuItems = await getItemsMenu(51)
        SousCategorie = await getItemsMenu(50)
    }
    return {
        props: JSON.parse(JSON.stringify({
            MenuGlobal: MenuGlobal,
            dataLive: dataLive,
            dataMedia: MenuItems
        }))

    }
}

export default AllMedia
