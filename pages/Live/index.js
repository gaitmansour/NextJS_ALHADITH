import React, { useEffect, useState } from 'react'
import { Icons } from '../../assets'
import styles from './Live.module.css'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { getLive } from '../../endpoints'
import _ from 'lodash'
import FetchAPI from '../../API'
import Moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
const Live = () => {
  var myCurrentDate = new Date()
  var curD = Moment(myCurrentDate).format('YYYY-MM-DDTHH:mm:ssZ')
  const { t } = useTranslation()

  const [data, setData] = useState([])

  const [value, setValue] = useState(false)
  const [ApiData, setDataAPI] = useState({})
  const url = getLive()

  const getData = async () => {
    FetchAPI(url).then((data1) => {
      if (data1.success) {
        setDataAPI(data1.data)
      }
    })
  }

  const refresh = () => {
    setValue({})
  }

  useEffect(() => {
    getData()
  }, [])

  const data11 = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'البث المباشر',
      path: '',
    },
  ]

  var Exist = []
  var nextLive = []
  if (!_.isEmpty(ApiData)) {
    var nextLive = ApiData.filter(
      (item) =>
        Moment(item.field_date_debut, 'YYYY-MM-DDTHH:mm:ssZ').format() > curD
    )
      .sort((a, b) => (a.field_date_debut > b.field_date_debut ? 1 : -1))
      .slice(0, 1)
    var Exist = ApiData.filter(
      (item) =>
        Moment(item.field_date_debut, 'YYYY-MM-DDTHH:mm:ssZ').format() <=
          curD &&
        curD < Moment(item.field_date_fin, 'YYYY-MM-DDTHH:mm:ssZ').format()
    )
  }
  console.log('-*----exist', Exist)
  // && ApiData[0].field_date_debut > curD
  return (
    <TemplateArticle ListBreadcrumb={data11} titlePage='البث المباشر'>
      <Body
        className={`${styles.TemplateArticleBody} TemplateArticleBody d-flex p-4`}
      >
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
        <div
          className={`${styles.liveSection} flex-fill secSearch liveSection`}
          style={{ height: '100%' }}
        >
          {Exist.length > 0 ? (
            <div className='w-100 h-100'>
              <h5>{Exist[0].title}</h5>
              <ReactPlayer
                url={Exist[0].field_lien_live}
                playing
                width='90%'
                height='500px'
                controls={true}
              />
            </div>
          ) : (
            <div className='d-flex align-items-center justify-content-center h-100 py-5'>
              <div className='NotFound404 d-flex flex-column align-items-center justify-content-center mt-lg-11'>
                <Link
                  passHref={true}
                  exact
                  href={{ pathname: '/allMedia' }}
                  as={'/allMedia'}
                >
                  <Image
                    src={Icons.icon_not_found_404.default}
                    alt=''
                    width={100}
                    height={100}
                  />
                </Link>
                <h4>{'لا يتوفر أي بث مباشر حاليا'}</h4>
                <p className='fw-100'>
                  {
                    'البث المباشر لم يبدأ بعد أو إنتهت مدته ، يمكنكم العودة حين يتوفر بث مباشر جديد'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </Body>
    </TemplateArticle>
  )
}

export default Live
