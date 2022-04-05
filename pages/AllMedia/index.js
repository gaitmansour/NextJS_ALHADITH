import React, { useEffect, useState } from 'react'
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
  const router = useRouter

  const getItemsMenu = async (tid) => {
    return FetchAPI(getSideItems(tid)).then((data) => {
      if (data.success) {
        if (tid == 50) {
          console.log(data?.data)
          setCategoryMedia(data?.data)
        }
        if (tid == 51) {
          setSousCategorie(data?.data)
        }
      }
    })
  }

  useEffect(() => {
    getItemsMenu(50)
    getItemsMenu(51)
  }, [router])

  console.log('data------------------------items', categoryMedia)
  console.log('sousCategorie', sousCategorie)

  useEffect(() => {
    const merge = (a, b, i = 0) => a.splice(i, 0, ...b) && a
    setAllDataMedia(merge(categoryMedia, sousCategorie, 1))
  }, [categoryMedia, sousCategorie])

  console.log('merge data =>', allDataMedia)
  return (
    <TemplateArticle {...props} titlePage='التلفزة الرقمية'>
      <Body>
        <ScrollButton />
        <LiveSection />
        {allDataMedia &&
          allDataMedia?.map((item, index) => {
            return <RowMedia key={item.tid} title={item.name} _id={item.tid} />
          })}
      </Body>
    </TemplateArticle>
  )
}

export default AllMedia
