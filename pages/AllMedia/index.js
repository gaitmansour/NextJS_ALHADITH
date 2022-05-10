import React, { useEffect, useLayoutEffect, useState } from 'react'
import LiveSection from './LiveSection'
import styles from './AllMedia.module.css'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import ScrollButton from '../../components/ScrollButton'
import { getSideItems } from '../../endpoints'
import FetchAPI from '../../API'
import RowMedia from './RowMedia'
import { useRouter } from 'next/router'
// import { isMobile, isIOS } from 'react-device-detect'

const AllMedia = (props) => {
  const [categoryMedia, setCategoryMedia] = useState([])
  const [sousCategorie, setSousCategorie] = useState([])
  const [allDataMedia, setAllDataMedia] = useState([])
  const [NewAllMedia, setNewAllMedia] = useState([])
  const [NewCategoryMedia, setNewCategoryMedia] = useState([])
  const router = useRouter()
  const titleRouter = useRouter()?.query?.title

  const getItemsMenu = async (tid) => {
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
  }, [titleRouter, router.isReady])

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
    if (router.isReady && categoryMedia && sousCategorie) {
      const merge = (a, b, i = 0) => a.splice(i, 0, ...b) && a
      setAllDataMedia(merge(categoryMedia, sousCategorie, 2))
    }
  }, [categoryMedia, sousCategorie, titleRouter, router.isReady])

  return (
    <TemplateArticle {...props} titlePage='التلفزة الرقمية'>
      <Body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        {/* {isIOS ? null : <ScrollButton />} */}
        <ScrollButton />
        <LiveSection />
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
              <RowMedia key={item?.tid} title={item?.name} _id={item?.tid} />
            )
          })}
      </Body>
    </TemplateArticle>
  )
}

export default AllMedia
