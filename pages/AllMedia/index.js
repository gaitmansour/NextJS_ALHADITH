import React, { useEffect, useState } from 'react'
import LiveSection from './LiveSection'
import styles from './AllMedia.module.css'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import ScrollButton from '../../components/ScrollButton'
import { getSideItems } from '../../endpoints'
import FetchAPI from '../../API'
import RowMedia from './RowMedia'

const AllMedia = (props) => {
  const [categoryMedia, setCategoryMedia] = useState([])

  const getItemsMenu = async (tid) => {
    return FetchAPI(getSideItems(tid)).then((data) => {
      if (data.success) {
        console.log(data?.data)
        setCategoryMedia(data?.data)
      }
      console.log('data------------------------items', categoryMedia)
    })
  }
  useEffect(() => {
    getItemsMenu(50)
  }, [])
  return (
    <TemplateArticle {...props} titlePage='التلفزة الرقمية'>
      <Body>
        <ScrollButton />
        <LiveSection />
        {categoryMedia?.map((item, index) => {
          return <RowMedia title={item.name} _id={item.tid} />
        })}
      </Body>
    </TemplateArticle>
  )
}

export default AllMedia
