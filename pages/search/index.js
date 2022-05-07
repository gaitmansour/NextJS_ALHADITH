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
import * as VscIcons from 'react-icons/vsc'
import { isMobile, isIOS } from 'react-device-detect'

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
  const codeDegree = state?.codeDegree

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
  const [showDialog, setshowDialog] = useState(false)
  const [showDialogModal, setshowDialogModal] = useState(false)
  const [message, setMessage] = useState('')
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
  let BodyRef = useRef()
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
          // console.log('data?.data========================>', data?.data)
          return (item = {
            label: item.label,
            value: item.id,
            code: item.code,
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
  // console.log('ChoiceCategory', ChoiceCategory)
  const handleSearch = async (
    word,
    topic,
    evSrc,
    src,
    degree,
    codeDegree,
    nrs
  ) => {
    const data = {
      content: word?.replace(/[-_,;.&:!?،؟]/g, ''),
      evaluationSource: evSrc
        ? evSrc
        : EvaluationSource
        ? EvaluationSource
        : '',
      idDegree: degree ? degree.value : ChoiceDegree ? ChoiceDegree.value : '',
      codeDegree: codeDegree ? codeDegree : '',
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

    if (from === 'home') {
      const ArrayCategory =
        res && res.length > 0 && res?.filter((item) => item.label === topic)
      // const ArrayDegree =
      //   r && r.length > 0 && r?.filter((item) => item.label === content)
      const ArrayDegree =
        r && r.length > 0 && r?.filter((item) => item.code === codeDegree)
      setChoiceCategory(ArrayCategory[0])
      setChoiceDegree(ArrayDegree[0])
      await handleSearch(
        word,
        ArrayCategory[0],
        undefined,
        undefined,
        undefined,
        codeDegree,
        undefined
      )
      setShowForm(false)
    }
    if (from === 'topBar') {
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
        undefined,
        ArrayNars[0]
      )
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
        onSubmitWTSP={() => {
          if (item?._source?.content.length > 5110) {
            //handleShow();
            setMessage('هذا الحديث طويل, لن يتم مشاركته بالكامل')
            setshowDialog(false)
            setshowDialogModal(true)
          } else {
            setshowDialog(true)
            setshowDialogModal(false)
          }
        }}
        onSubmit={() => {
          if (item?._source?.content.length > 750) {
            //handleShow();
            setMessage('هذا الحديث طويل, لن يتم مشاركته بالكامل')
            setshowDialog(false)
            setshowDialogModal(true)
          } else {
            setshowDialog(true)
            setshowDialogModal(false)
          }
        }}
        showDialog={true}
        text={
          item?.highlight ? item?.highlight?.content[0] : item?._source?.content
        }
        narrator={item?._source?.narrator?.label}
        source={item?._source?.source?.label}
        degree={item?._source?.degree}
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
    resultsRef.current.scrollIntoView()
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
      setMessage('يرجى ملء كلمة البحث ')
      handleShow()
    } else if (input && input.trim().length < 2) {
      setMessage('يرجى كتابة كلمة تتكون من حرفين فما فوق')
      handleShow()
    } else if (input && input.length >= 100) {
      setMessage('يرجى كتابة جملة لا تتعدى مائة حرف')
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
    const word = router?.word
    const from = router?.from
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
      getDataDegree()
    }

    if (
      (input ||
        ChoiceTopic ||
        EvaluationSource ||
        ChoiceSource ||
        ChoiceNarrator ||
        ChoiceDegree ||
        ChoiceCategory) &&
      from !== 'home'
    ) {
      handleSearch(input)
    }

    // if (typeof window != 'undefined') {
    //       window.scrollTo({
    //         behavior: 'smooth',
    //         top: resultsRef?.current?.offsetTop,
    //       })
    //     }
  }, [pageNum, StartPage, router])

  useEffect(() => {
    const word = router?.word
    const from = router?.from
    if (from === 'home' && StartPage !== 0) {
      handleSearch(
        word,
        ChoiceCategory,
        undefined,
        undefined,
        undefined,
        codeDegree,
        undefined
      )
      setShowForm(false)
    }
  }, [StartPage, pageNum, topic, codeDegree])
  return (
    <TemplateArticle {...props} ListBreadcrumb={data} titlePage='البحث'>
      <Body
        ref={BodyRef}
        className={`${styles.SearchPage} TemplateArticleBody SearchPage  p-4`}
      >
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
        {isIOS ? null : <ScrollButton />}
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
            {!input &&
            !ChoiceTopic &&
            !EvaluationSource &&
            !ChoiceSource &&
            !ChoiceNarrator &&
            !ChoiceDegree &&
            !ChoiceCategory ? (
              <div
                className={`${styles.boxIconEpingle} d-flex justify-content-center align-items-center`}
                style={{
                  backgroundColor: '#fde5ac',
                  height: '45px',
                  width: '46px',
                }}
              >
                <VscIcons.VscPinned color='#fff' size={24} />
              </div>
            ) : (
              <div
                className={`${styles.boxIconEpingle} d-flex justify-content-center align-items-center`}
                style={{
                  backgroundColor: '#FBBF31',
                  height: '45px',
                  width: '46px',
                }}
              >
                <VscIcons.VscPinnedDirty color='#fff' size={24} />
              </div>
            )}
            <div
              className={`${styles.boxIconSetting} box-icon-setting d-flex align-items-center align-self-center btn mx-2  px-2 py-1`}
              onClick={() => handleClickSearch()}
              style={{
                backgroundColor: '#157646',
                height: '46px',
              }}
            >
              {/* <i className='fas fa-search ' style={{ color: '#fff' }} /> */}
              <p className='text-white fw-bold my-2 mx-2'>{'ابحث'}</p>
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

                  {/* <Input
                    className='col-md-4'
                    label='مصدر الحكم'
                    placeholder='ابحث بمصدر الحكم'
                    value={EvaluationSource}
                    onChange={(v) => setEvaluationSource(v.target.value)}
                  /> */}
                  <CustomSelect
                    className='col-md-4'
                    options={dataNarrator && dataNarrator}
                    label='الراوي'
                    defaultInputValue={ChoiceNarrator ? ChoiceNarrator : ''}
                    placeholder='اكتب اسم الراوي'
                    onChange={(v) => setChoiceNarrator(v)}
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
                  {/* <div className='col-md-6'></div> */}
                  <CustomSelect
                    className='col-md-4'
                    options={dataDegree && dataDegree}
                    label='الحكم'
                    defaultInputValue={ChoiceDegree ? ChoiceDegree : ''}
                    placeholder='اكتب الحكم'
                    onChange={(v) => setChoiceDegree(v)}
                  />
                  {/* <Input
                    className='col-md-4'
                    label='مصدر الحكم'
                    placeholder='ابحث بمصدر الحكم'
                    value={EvaluationSource}
                    onChange={(v) => setEvaluationSource(v.target.value)}
                  /> */}
                </div>
                {/* <div className={`d-flex alignIte ${styles.alignIte}`}>
                 <CustomSelect
                    className='col-md-4'
                    options={dataNarrator && dataNarrator}
                    label='الراوي'
                    defaultInputValue={ChoiceNarrator ? ChoiceNarrator : ''}
                    placeholder='اكتب اسم الراوي'
                    onChange={(v) => setChoiceNarrator(v)}
                  />
                  <div className='col-md-6'></div>
                </div> */}
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
                  <i
                    id='paginationn'
                    className={`fa fa-chevron-right text-success`}
                  />
                }
                nextLabel={
                  <i
                    id='paginationn'
                    className='fa fa-chevron-left text-success'
                  />
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
                  <a className='pe-auto text-decoration-none'>
                    <p className='fw-100 link-primary '>
                      {'يرجى طرح سؤالك أو محاولة البحث في الموقع'}
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className='side-bar' />
        <CustomModal
          title={'تنبيه'}
          body={message}
          show={show}
          onHide={handleClose}
          onClick={handleClose}
        />
        {showDialogModal && (
          <CustomModal
            title={'تنبيه'}
            body={message}
            show={showDialogModal}
            onHide={() => {
              setshowDialog(false)
              setshowDialogModal(false)
            }}
            onClick={() => {
              setshowDialog(true)
              setshowDialogModal(false)
            }}
          />
        )}
      </Body>
    </TemplateArticle>
  )
}

export default SearchPage
