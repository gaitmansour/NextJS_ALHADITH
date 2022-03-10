import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './search.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ReactPaginate from 'react-paginate'
import {
  getCategory,
  getDegree,
  getNarrator,
  getSource,
  getTopic,
  Search,
} from '../../endpoints'
import FetchAPI from '../../API'
import { FetchPostAPI } from '../../data/API_Search/API'
import ItemList from '../../components/ItemList'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import SearchInput from '../../components/Forms/SearchInput'
import Cards from '../../components/_UI/Cards'
import Input from '../../components/Forms/Input'
import CustomSelect from '../../components/Forms/CustomSelect'
import PageTitleSecond from '../../components/_UI/PageTitleSecond'
import CustomModal from '../../components/_UI/Modal'
import _ from 'lodash'
import ScrollButton from '../../components/ScrollButton'

const SearchPage = (props) => {
  let router = ''
  if (typeof window !== 'undefined') {
    var params = JSON.parse(localStorage.getItem('searchData'))
  }

  let varRouter = useRouter()?.query

  router = params ? params?.query : varRouter

  const state = router
  const content = state?.content
  const topic = state?.topic

  const degree = state?.degree
  const door = state?.content
  const source = state?.source
  const narrator = state?.narrator
  const hokm = state?.sourceHokm

  const [showForm, setShowForm] = useState(true)
  const [dataDegree, setdataDegree] = useState([])
  const [ChoiceDegree, setChoiceDegree] = useState('')
  const [dataSource, setdataSource] = useState([])
  const [ChoiceSource, setChoiceSource] = useState('')
  const [dataTopic, setdataTopic] = useState([])
  const [ChoiceTopic, setChoiceTopic] = useState('')
  const [dataNarrator, setdataNarrator] = useState([])
  const [dataCategory, setdataCategory] = useState([])
  const [ChoiceCategory, setChoiceCategory] = useState('')
  const [ChoiceNarrator, setChoiceNarrator] = useState('')
  const [EvaluationSource, setEvaluationSource] = useState('')
  const [dataSearch, setdataSearch] = useState([])
  const [input, setInput] = useState('')
  const [pageNum, setPageNum] = useState(0)
  const [pagePagination, setPagePagination] = useState(1)
  const [StartPage, setStartPage] = useState(0)
  const [success, setSuccess] = useState(false)
  const dataPerPage = dataSearch?.hits?.hits?.length
  const pagevisited = pageNum * dataPerPage
  const [show, setShow] = useState(false)
  const { t } = useTranslation()
  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'البحث',
      path: '/search',
    },
  ]
  const searchSpacific = dataSearch?.hits?.total?.value
  const searchNotSpacific = 336
  let resultsRef = useRef()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const urlDegree = getDegree()
  const urlSource = getSource()
  const urlTopic = getTopic()
  const urlNarrator = getNarrator()
  const urlCategory = getCategory()
  const urlSearch = Search()
  let elementRef = useRef()

  const getDataDegree = async () => {
    return FetchAPI(urlDegree).then((data) => {
      if (data.success) {
        const newDegree = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataDegree(newDegree)
        return newDegree
      }
    })
  }
  const getDataSource = async () => {
    return FetchAPI(urlSource).then((data) => {
      if (data.success) {
        const newSource = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataSource(newSource)
        return newSource
      }
    })
  }

  const getDataTopic = async () => {
    return FetchAPI(urlTopic).then((data) => {
      if (data.success) {
        const newTopic = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataTopic(newTopic)
        return newTopic
      }
    })
  }

  const getDataNarrator = async () => {
    return FetchAPI(urlNarrator).then((data) => {
      if (data.success) {
        // console.log('dataNarrator-------------',data?.data)
        const newNarrator = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataNarrator(newNarrator)
        return newNarrator
      }
    })
  }

  const getDataCategory = async () => {
    return await FetchAPI(urlCategory).then((data) => {
      if (data.success) {
        // console.log('dataNarrator-------------',data?.data)
        const newCategory = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataCategory(newCategory)
        return newCategory
      }
    })
  }
  console.log('ChoiceCategory', ChoiceCategory)
  const handleSearch = async (word, topic, evSrc, src, degree, nrs) => {
    console.log('evalua_source', evSrc)
    console.log('choice_source', ChoiceSource)
    console.log('EvaluationSource', EvaluationSource)
    console.log('id_source', src)
    const data = {
      content: word,
      evaluationSource: evSrc
        ? evSrc
        : EvaluationSource
        ? EvaluationSource
        : '',
      idDegree: degree ? degree.value : ChoiceDegree ? ChoiceDegree.value : '',
      idNarrator: nrs
        ? nrs.value
        : ChoiceNarrator
        ? JSON.stringify(ChoiceNarrator.value)
        : '',
      idSource: src ? src : ChoiceSource ? ChoiceSource.value : '',
      idTopic: '',
      idCategorie: topic
        ? JSON.stringify(topic.value)
        : ChoiceCategory
        ? ChoiceCategory.value
        : '',
      numeroHadith: '',
      size: 10,
      start: StartPage < 1 ? 0 : StartPage,
      tags: '',
    }
    console.log('data---------------------------')
    console.log(
      src?.label != '' ? src?.value : ChoiceSource ? ChoiceSource.value : ''
    )

    FetchPostAPI(urlSearch, data).then((data) => {
      if (data.success) {
        setdataSearch(data?.data)
        setSuccess(true)
        setPagePagination(data?.data?.hits?.total?.value)
      }
    })
  }

  const handleTopicFrom = async (res, r, router, narList, sourceList) => {
    const word = router?.word
    const from = router?.from
    console.log(
      'from-----------------------------------------------------------------',
      from
    )
    if (from === 'home') {
      const ArrayCategory =
        res && res.length > 0 && res?.filter((item) => item.label === topic)
      const ArrayDegree =
        r && r.length > 0 && r?.filter((item) => item.label === content)
      setChoiceCategory(ArrayCategory[0])
      setChoiceDegree(ArrayDegree[0])
      await handleSearch(
        word,
        ArrayCategory[0],
        undefined,
        undefined,
        ArrayDegree[0],
        undefined
      )
      setShowForm(false)
    }
    if (from === 'topBar') {
      console.log('wordddddddddddddddddddddd')
      console.log(word)
      setInput(word)
      setShowForm(false)
      handleSearch(word)
    }
    if (from === 'section') {
      setInput(word)
      const ArrayCategory =
        res && res.length > 0 && res?.filter((item) => item.label === topic)
      const ArrayNars =
        narList &&
        narList.length > 0 &&
        narList?.filter((item) => item.label === narrator)
      const ArraySource =
        sourceList &&
        sourceList.length > 0 &&
        sourceList?.filter((item) => item.label === source)
      const ArrayDegree =
        r && r.length > 0 && r?.filter((item) => item.label === content)
      setChoiceCategory(ArrayCategory[0])
      setChoiceDegree(ArrayDegree[0])
      setChoiceSource(ArraySource && ArraySource[0])
      setChoiceNarrator(ArrayNars && ArrayNars[0])
      setEvaluationSource(hokm)
      handleSearch(
        word,
        ArrayCategory[0],
        hokm,
        ArraySource[0]?.label != '' ? ArraySource[0]?.value : '',
        ArrayDegree[0],
        ArrayNars[0]
      )
      console.log('arry_so =>>', ArrayCategory[0])
      console.log('source =>', source)
    }
  }

  const displayData = dataSearch?.hits?.hits?.map((item, index) => {
    return (
      <ItemList
        key={index}
        topic={item?._source?.topic?.label}
        category={item?._source?.categorie?.label}
        content={item?._source?.content}
        highlight={!!item.highlight}
        text={
          item?.highlight
            ? item?.highlight['content.multi_words'].join(' ')
            : item?._source?.content
        }
        narrator={item?._source?.narrator?.label}
        source={item?._source?.source?.label}
        degree={item?._source?.degree?.label}
        sourceGlobal={item?._source?.evaluationSource}
        comments={item?._source?.comments}
        tags={item?._source?.tags}
        numeroHadith={item?._source?.numeroHadith}
      />
    )
  })

  const pageCount = Math.ceil(dataSearch?.hits?.total?.value / 10)
  const changePage = (v) => {
    setPageNum(v.selected)
    setStartPage(10 * v.selected)
  }

  function handleInput(v) {
    if (typeof v == 'string') {
      setInput(v)
    } else {
      setInput(v.target.value)
    }
  }

  const handleClickSearch = (e) => {
    if (
      !input &&
      !ChoiceTopic &&
      !EvaluationSource &&
      !ChoiceSource &&
      !ChoiceNarrator &&
      !ChoiceDegree &&
      !ChoiceCategory
    ) {
      handleShow()
    } else {
      setShowForm(false)
      setPageNum(0)
      setStartPage(0)
      handleSearch(input)
      handleClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      // const x = window.matchMedia('(max-height: 200px)')
      if (event.keyCode === 13) {
        handleClickSearch()
      }
    }
    if (elementRef && elementRef?.current) {
      elementRef?.current?.addEventListener('keydown', handleKeyDown, false)

      // cleanup this component
      return function cleanup() {
        elementRef?.current?.removeEventListener(
          'keydown',
          handleKeyDown,
          false
        )
      }
    }
  }, [
    input,
    EvaluationSource,
    ChoiceTopic,
    ChoiceSource,
    ChoiceNarrator,
    ChoiceDegree,
    ChoiceCategory,
  ])

  let route = useRouter()

  useEffect(() => {
    if (StartPage === 0) {
      getDataDegree().then((r) =>
        getDataCategory().then((res) =>
          getDataNarrator().then((narList) =>
            getDataSource().then((sources) =>
              handleTopicFrom(res, r, router, narList, sources)
            )
          )
        )
      )
      getDataSource()
      getDataNarrator()
      getDataTopic()
    }

    if (
      input ||
      ChoiceTopic ||
      EvaluationSource ||
      ChoiceSource ||
      ChoiceNarrator ||
      ChoiceDegree ||
      ChoiceCategory
    ) {
      handleSearch(input)
    }
    if (typeof window != 'undefined') {
      window.scrollTo({
        behavior: 'smooth',
        top: resultsRef.current.offsetTop,
      })
    }
    route.isReady &&
      console.log('route----------------------------------', route)
  }, [pageNum, StartPage, route])

  return (
    <TemplateArticle {...props} ListBreadcrumb={data} titlePage='البحث'>
      <Body
        className={`${styles.SearchPage} TemplateArticleBody SearchPage  p-4`}
      >
        <ScrollButton />
        <div ref={elementRef} className={`${styles.SearchBox} `}>
          <div
            ref={resultsRef}
            className={`${styles.searchElement} search-element d-flex flex-row align-items-center justify-content-between mt-4`}
          >
            <SearchInput
              styleIcon={{ color: '#656e7e', width: 20 }}
              styleFilter={{ backgroundColor: '#656e7e', width: 50 }}
              // styleDiv={{position:'absolute',right:"55%"}}
              styleSerachIcon={{ backgroundColor: '#656e7e' }}
              onClickSettings={() => setShowForm(!showForm)}
              input={input}
              inputClassName={'h-25'}
              onChange={(v) => handleInput(v)}
              placeholder='البحث في منصة الحديث النبوي الشريف'
              className='bg-white mx-0 shadow-card'
              clickSearch={() => handleClickSearch()}
            />

            <div
              className={`${styles.boxIconSetting} box-icon-setting d-flex align-items-center align-self-center btn mx-2  p-0`}
              onClick={() => handleClickSearch()}
              style={{
                backgroundColor: '#157646',
                height: '46px',
              }}
            >
              <i className='fas fa-search p-3' style={{ color: '#fff' }} />
            </div>
          </div>
          {showForm && (
            <Cards className={`${styles.formSearch} form-search p-2`}>
              <div className='d-flex flex-wrap flex-column'>
                <div className={`d-flex alignIte ${styles.alignIte}`}>
                  <CustomSelect
                    className='col-md-4'
                    options={dataCategory && dataCategory}
                    defaultInputValue={ChoiceCategory ? ChoiceCategory : ''}
                    label='موضوع'
                    placeholder='اكتب الموضوع'
                    onChange={(v) => setChoiceCategory(v)}
                  />

                  <Input
                    className='col-md-4'
                    label='مصدر الحكم'
                    placeholder='ابحث بمصدر الحكم'
                    value={EvaluationSource}
                    onChange={(v) => setEvaluationSource(v.target.value)}
                  />
                </div>
                <div className={`d-flex alignIte ${styles.alignIte}`}>
                  <CustomSelect
                    className='col-md-4'
                    options={dataSource && dataSource}
                    defaultInputValue={ChoiceSource ? ChoiceSource : ''}
                    label='المصدر'
                    placeholder='اكتب اسم المصدر'
                    onChange={(v) => {
                      setChoiceSource(v)
                    }}
                  />
                  <CustomSelect
                    className='col-md-4'
                    options={dataDegree && dataDegree}
                    label='الحكم'
                    defaultInputValue={ChoiceDegree ? ChoiceDegree : ''}
                    placeholder='اكتب الحكم'
                    onChange={(v) => setChoiceDegree(v)}
                  />
                  <CustomSelect
                    className='col-md-4'
                    options={dataNarrator && dataNarrator}
                    label='الراوي'
                    defaultInputValue={ChoiceNarrator ? ChoiceNarrator : ''}
                    placeholder='اكتب اسم الراوي'
                    onChange={(v) => setChoiceNarrator(v)}
                  />
                </div>
              </div>
            </Cards>
          )}
          {dataSearch && dataSearch?.hits?.hits?.length > 0 && (
            <div>
              <PageTitleSecond
                className={`${styles.pageTitleSecond} page-title-second pb-2 mt-5`}
                title={`نتائج البحث (${searchSpacific ? searchSpacific : '0'})`}
              />
              {displayData}
              <ReactPaginate
                previousLabel={
                  <i id='paginationn' className={`fa fa-chevron-right`} />
                }
                nextLabel={
                  <i id='paginationn' className='fa fa-chevron-left' />
                }
                pageCount={pageCount}
                forcePage={pageNum}
                onPageChange={changePage}
                // containerClassName={styles.paginationButtons}
                containerClassName={`pagination justify-content-evenly align-content-around w-50 py-2 ${styles.paginationButtons}`}
                //previousLinkClassName={"prevbtn"}
                //nextLinkClassName={"nextbtn"}
                activeClassName={styles.activebtn}
              />
            </div>
          )}
          {dataSearch?.hits?.hits?.length === 0 && (
            <div className='d-flex align-items-center justify-content-center'>
              <div className='NotFound404 d-flex flex-column align-items-center justify-content-center mt-lg-11'>
                <br />
                <h4>{'لا توجد نتائج توافق معايير البحث'}</h4>
                <Link
                  role='button'
                  href={'/QuestionsReponses'}
                  as={'/QuestionsReponses'}
                  style={{ color: 'black' }}
                >
                  <p className='fw-100 link-primary'>
                    {'يرجى طرح سؤالك أو محاولة البحث في الموقع'}
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className='side-bar' />
        <CustomModal
          title={'تنبيه'}
          body={'يرجى ملء كلمة البحث '}
          show={show}
          onHide={handleClose}
          onClick={handleClose}
        />
      </Body>
    </TemplateArticle>
  )
}

export default SearchPage
