import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logos } from '../../assets'
import styles from './articlesByTag.module.css'
import _ from 'lodash'
import { base_url, getArticlesByTag } from '../../endpoints'
import FetchAPI from '../../API'
import { useRouter } from 'next/router'
import Loading from '../../components/_UI/Loading'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import ScrollButton from '../../components/ScrollButton'
import Image from 'next/image'

const ArticlesByTag = (props) => {
  let TagID =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('tagTitle'))
  console.log('TAGID----------------------', TagID)
  let routerQuery = useRouter()
  const Id = TagID
  const [dataAPI, setDataAPI] = useState({})
  console.log('--------55---', Id)
  let dataValue =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('categorieTitle'))
  const url = getArticlesByTag(Id)
  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        setDataAPI(data?.data)
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])

  if (_.isEmpty(dataAPI)) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }

  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }
  return (
    <TemplateArticle {...props} titlePage='مقالات ذات صلة'>
      <Body className='TemplateArticleBody d-flex p-4'>
        <ScrollButton />
        <div className='flex-fill my-5'>
          <div className='row tags'>
            {dataAPI &&
              dataAPI?.map((data, index) => {
                console.log('articleTag-----------------------', data)
                return (
                  <div
                    key={index}
                    className='card col col-12 col-lg-4 col-md-6 col-sm-12 m-2'
                  >
                    <Link
                      passHref
                      // to={field_lien[0]?.uri.slice(9)}
                      href={{
                        pathname: `/article/${data.title.split(' ').join('-')}`,
                        search: '',
                        hash: '',
                        query: {
                          title: data.title,
                        },
                      }}
                      as={`/article/${data.title.split(' ').join('-')}`}
                    >
                      <a className='text-decoration-none'>
                        {data.field_image ? (
                          <Image
                            className='card-img-top p-2 pt-3'
                            objectFit='cover'
                            width={16}
                            height={9}
                            layout='responsive'
                            quality={65}
                            loader={myLoader}
                            src={data.field_image}
                            alt='Card image cap'
                          />
                        ) : (
                          <Image
                            className={`card-img-top  p-2 pt-3`}
                            src={Logos.logo_web}
                            objectFit='cover'
                            width={16}
                            height={9}
                            layout='responsive'
                            quality={65}
                            alt='logo-Al-hadith-Mohammed-VI'
                            title='logo Al hadith Mohammed VI'
                          />
                        )}
                        <div className={`${styles.cardBody} card-body`}>
                          <h5 className='card-title text-center'>
                            {data.title}
                          </h5>
                          <p className='card-text mb-3 text-black'>
                            {data.body_1
                              ?.split(' ')
                              .slice(0, 14)
                              .join(' ')
                              .concat('...')}
                          </p>
                          <a
                            className={`${styles.btnLearnMore} btn`}
                            role='button'
                            onClick={() => {
                              localStorage.setItem(
                                'categorieTitle',
                                JSON.stringify({
                                  parent: dataValue.parent,
                                  child: data?.title,
                                  contenuArticle: data?.title,
                                })
                              )
                            }}
                          >
                            <p style={{ textAlign: 'center' }} className='m-0'>
                              {'إقرأ المزيد '}
                            </p>
                          </a>
                        </div>
                      </a>
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
      </Body>
      <ScrollButton />
    </TemplateArticle>
  )
}

export default ArticlesByTag
