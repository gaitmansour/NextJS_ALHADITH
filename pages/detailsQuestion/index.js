import React, { useEffect, useState } from 'react'
import { getQuestionbyID, AllForums } from '../../endpoints'
import FetchAPI from '../../API'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Loading from '../../components/_UI/Loading'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import styles from './detailsQuestion.module.css'

const Questions = () => {
  // const {state} = useLocation();
  console.log('useRouter()?.query------------------')
  console.log(useRouter()?.query)
  const { state } = useRouter()?.query
  const nID = useRouter()?.query?.nID
  const itemQuestion = useRouter()?.query?.itemQuestion
  const itemTitle = useRouter()?.query?.itemTitle
  const categoryId = useRouter()?.query?.itemId
  const [DataQuestion, setDataQuestion] = useState([])
  const [DataQuestions1, setDataQuestions1] = useState([])
  const url = getQuestionbyID(nID)
  const url1 = AllForums()

  const getDataQuestionID = async () => {
    return FetchAPI(url).then((data) => {
      if (data.success) {
        setDataQuestion(data?.data)
        return data?.data
      }
    })
  }

  const getDataQuestions1 = async () => {
    return FetchAPI(url1).then((data1) => {
      if (data1.success) {
        setDataQuestions1(data1?.data)
        return data1?.data
      }
    })
  }

  useEffect(() => {
    getDataQuestionID()
    getDataQuestions1()
  }, [])

  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'سؤال و جواب',
      path: '/detailsQuestion',
    },
  ]

  if (_.isEmpty(DataQuestions1.data)) {
    return (
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }
  return (
    <TemplateArticle ListBreadcrumb={data} titlePage='سؤال و جواب'>
      <Body className={`${styles.TemplateArticleBody} Media d-flex p-4`}>
        <div className={`${styles.quesList} flex-fill`}>
          {DataQuestion && DataQuestion.length > 0 ? (
            <div>
              <h3>السؤال</h3>
              <div className={`${styles.card} card w-100 my-5`}>
                <div
                  className={`${styles.CardQuestion} card-body Card-question`}
                >
                  <h5 className='col-9 d-flex card-subtitle'>{itemTitle}</h5>
                  <p className='p card-text'>{itemQuestion}</p>
                </div>
              </div>
              <h3>الإجابة</h3>
              {DataQuestion &&
                DataQuestion.map((item, index) => {
                  // console.log("-------------||||||",item)
                  return (
                    <div
                      key={index}
                      className={` ${styles.cardAnswer} card Card-answer1 w-100 my-5`}
                      style={styles.CardAnswer1}
                    >
                      <div className='card-body '>
                        <p className='p card-text text-justify '>
                          {item?.comment_body.replace(/<[^>]+>/g, '')}
                        </p>
                      </div>
                    </div>
                  )
                })}
            </div>
          ) : (
            <div>
              <h3 className={'h3'}>السؤال</h3>
              <div className='card w-100 my-5'>
                <div
                  className={`${styles.CardQuestion} card-body Card-question `}
                >
                  <h5 className='col-9 d-flex card-subtitle'>{itemTitle}</h5>
                  <p className='p card-text'>{itemQuestion}</p>
                </div>
              </div>
              <div
                className={`${styles.cardAnswer} card Card-answer1 w-100 my-5`}
              >
                <div className='card-body '>
                  <p className='p card-text'>{'لا توجد إجابات حتى الآن'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={`${styles.sidBar} side-bar px-4`}>
          <p className='p tiitle'>مواد ذات صلة</p>
          <div className='SimpleList'>
            {DataQuestions1?.data
              .filter(
                (item) =>
                  item.relationships.taxonomy_forums.data.id === categoryId
              )
              .map((item, i) => {
                return (
                  <Link
                    key={i}
                    exact
                    className='item d-flex align-items-center py-3 px-1'
                    passHref={true}
                    href={{
                      pathname: '/detailsQuestion',
                      query: {
                        itemTitle: item?.attributes?.title,
                        itemQuestion: item?.attributes?.body?.processed.replace(
                          /<[^>]+>/g,
                          ''
                        ),
                        nID: item?.attributes?.drupal_internal__nid,
                        itemId: item.relationships.taxonomy_forums.data.id,
                      },
                    }}
                    as={'/detailsQuestion'}
                    onClick={() => {
                      if (typeof window != 'undefined') {
                        window.location.reload()
                      }
                    }}
                  >
                    {item.attributes.title}
                  </Link>
                )
              })}
          </div>
        </div>
      </Body>
    </TemplateArticle>
  )
}

export default Questions
