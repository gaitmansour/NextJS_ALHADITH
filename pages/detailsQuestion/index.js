import React, { useEffect, useState } from 'react'
import { getQuestionbyID, AllForums, searchQuestion } from '../../endpoints'
import FetchAPI from '../../API'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Loading from '../../components/_UI/Loading'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import styles from './detailsQuestion.module.css'
import {FetchPostAPI} from '../../data/API/questions'

const Questions = () => {
  const { state } = useRouter()?.query
  const itemQuestion = useRouter()?.query?.itemQuestion
  const itemReponse = useRouter()?.query?.itemReponse
  const itemTitle = useRouter()?.query?.itemTitle
  const [dataQuestion, setDataQuestion] = useState([])
  const urlSearchQuestion = searchQuestion()

  const handleSearchQuestion = async () => {
    const data = {
      query: itemTitle,
      size: 10,
      start: 0,
    }
    FetchPostAPI(urlSearchQuestion, data).then((data) => {
      console.log('questions', data)
      if (itemTitle !== '' && data.success) {
        return setDataQuestion(data?.data)
      } else {
        setDataQuestion([])
      }
    })
  }

  useEffect(() => {
    handleSearchQuestion()
  }, [itemQuestion])
  // console.log('mawad dat sila', dataQuestion?.hits?.hits)

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

  // if (_.isEmpty(dataQuestion.data)) {
  //   return (
  //     <div className='d-flex align-items-center justify-content-center py-5'>
  //       <Loading />
  //     </div>
  //   )
  // }
  return (
      <TemplateArticle ListBreadcrumb={data} titlePage='سؤال و جواب'>
        <Body
            className={`${styles.TemplateArticleBody} ${styles.QuAnswer} Media d-flex p-4`}
        >
          <div className={`${styles.quesList} px-4 flex-fill`}>
            {itemReponse ? ( <div>
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
              <div
                  className={` ${styles.cardAnswer} card Card-answer1 w-100 my-5`}
                  style={styles.CardAnswer1}
              >
                <div className='card-body '>
                  <p className='p card-text text-justify '>{itemReponse}</p>
                </div>
              </div>
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
          <p className={`${styles.p} ${styles.tiitle}`}>مواد ذات صلة</p>
          <div className={styles.SimpleList}>
            {dataQuestion?.hits?.hits?.map((item, i) => {
                return (
                  <Link
                    key={i}
                    exact
                    className='item d-flex align-items-center py-3 px-1'
                    passHref={true}
                    href={{
                      pathname: '/questions',
                      query: {
                        itemTitle: item?._source?.sujetQuestion,
                        itemQuestion: item?._source?.descriptionQuestion,
                        itemReponse: item?._source?.descriptionReponse,
                      },
                    }}
                    as={'/detailsQuestion'}
                    onClick={() => {
                      if (typeof window != 'undefined') {
                        window.location.reload()
                      }
                    }}
                  >
                    <a
                        className={`${styles.item} d-flex align-items-center py-3 px-1 text-decoration-none`}
                    >
                    {item?._source?.sujetQuestion}
                  </a>
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
