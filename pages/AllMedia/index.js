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

const AllMedia = (props) => {
  const [categoryMedia, setCategoryMedia] = useState([])
  const [sousCategorie, setSousCategorie] = useState([])
  const [allDataMedia, setAllDataMedia] = useState([])
  const [NewAllMedia, setNewAllMedia] = useState([])
  const [NewCategoryMedia, setNewCategoryMedia] = useState([])
  const router = useRouter()
  const titleRouter = useRouter()?.query?.title
  console.log('router=>', router)

  const getItemsMenu = async (tid) => {
    return FetchAPI(getSideItems(tid)).then((data) => {
      if (data.success) {
        if (tid == 50) {
          // console.log(data?.data)
          // setCategoryMedia(data?.data)
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

  useLayoutEffect(() => {
    if (router.isReady) {
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

  console.log('data------------------------categoryMedia', categoryMedia)
  console.log('sousCategorie', sousCategorie)

  useEffect(() => {
    if (categoryMedia && sousCategorie) {
      const merge = (a, b, i = 0) => a.splice(i, 0, ...b) && a
      setAllDataMedia(merge(categoryMedia, sousCategorie, 2))
    }
  }, [categoryMedia, sousCategorie, titleRouter, router.isReady])

  console.log('NewAllMedia=>', allDataMedia)
  // console.log('merge data =>', allDataMedia)
  return (
    <TemplateArticle {...props} titlePage='التلفزة الرقمية'>
      <Body>
        <ScrollButton />
        <LiveSection />
        {categoryMedia &&
          sousCategorie &&
          allDataMedia &&
          allDataMedia?.map((item, index) => {
            return (
              <RowMedia key={item?.tid} title={item?.name} _id={item?.tid} />
            )
          })}
      </Body>
    </TemplateArticle>
  )
}

export default AllMedia
