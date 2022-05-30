import React, { useEffect, useRef, useState } from 'react'
import styles from './searchHome.module.css'
//import {useLocation, useHistory} from "next/";
import { useRouter } from 'next/router'

import {
  getCategory,
  getDegree,
  getMenuByName,
  getNarrator,
  getSource,
  getTopic,
} from '../../../endpoints'
import FetchAPI from '../../../API'
import SectionTitle from '../../../components/_UI/SectionTitle'
import SearchInput from '../../../components/Forms/SearchInput'
import Cards from '../../../components/_UI/Cards'
import Input from '../../../components/Forms/Input'
import CustomSelect from '../../../components/Forms/CustomSelect'
import CustomModal from '../../../components/_UI/Modal'
import Link from 'next/link'

const SearchSection = (props) => {
  //const {state} = useLocation();
  let router = useRouter()
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
  const [numberHadith, setNumberHadith] = useState('')
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  let resultsRef = useRef()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const urlDegree = getDegree()
  const urlSource = getSource()
  const urlTopic = getTopic()
  const urlNarrator = getNarrator()
  const urlCategory = getCategory()
  let elementRef = useRef()

  const getDataMenu = async (x) => {
    FetchAPI(getMenuByName(x)).then((data) => {
      if (data.success) {
        localStorage.setItem(
          'categorieTitle',
          JSON.stringify({
            tidChild: data?.data[0]?.tid,
            parent: data?.data[0]?.parent_target_id_1,
            child: data?.data[0]?.name_1,
            contenuArticle:
              data?.data[0]?.field_contenu_default !== ''
                ? data?.data[0]?.field_contenu_default
                : data?.data[0]?.name_1,
          })
        )
        localStorage.setItem(
          'tid',
          JSON.stringify(data?.data[0]?.parent_target_id)
        )
      }
    })
  }

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
    FetchAPI(urlSource).then((data) => {
      if (data.success) {
        const newSource = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataSource(newSource)
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
    await FetchAPI(urlNarrator).then((data) => {
      if (data.success) {
        const newNarrator = data?.data.map((item) => {
          return (item = {
            label: item.label,
            value: item.id,
          })
        })
        setdataNarrator(newNarrator)
      }
    })
  }

  const getDataCategory = async () => {
    return await FetchAPI(urlCategory).then((data) => {
      if (data.success) {
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

  //const history = useHistory()
  let history = useRouter()

  function handleInput(v) {
    if (typeof v == 'string') {
      setInput(v)
    } else {
      setInput(v.target.value)
    }
  }

  const goToSearchPage = () => {
    if (
      !EvaluationSource &&
      !input &&
      !ChoiceTopic &&
      !ChoiceSource &&
      !ChoiceNarrator &&
      !ChoiceDegree &&
      !ChoiceCategory &&
      !numberHadith
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
      router &&
        router.push(
          {
            pathname: '/search',
            search: '',
            query: {
              from: 'section',
              topic: ChoiceCategory?.label,
              content: ChoiceDegree?.label,
              source: ChoiceSource?.label,
              sourceHokm: EvaluationSource.label,
              narrator: ChoiceNarrator?.label,
              word: input,
              numberH: numberHadith,
            },
          },
          '/search'
        )
    }
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      // const x = window.matchMedia('(max-height: 200px)')
      if (event.keyCode === 13) {
        goToSearchPage()
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
    numberHadith,
  ])

  function handleClickSearch() {
    goToSearchPage()
  }

  useEffect(() => {
    getDataDegree()
    getDataSource()
    getDataNarrator()
    getDataTopic()
    getDataCategory()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`${styles.secSearch} container flex-fill secSearch mb-4`}
    >
      <div className={`container ${styles.SearchSection} `}>
        <SectionTitle title='البحث' className='' />
      </div>
      <div
        ref={resultsRef}
        className={`${styles.searchElement} d-flex flex-row align-items-center justify-content-between mt-4`}
      >
        <SearchInput
          styleSerachIcon={{ backgroundColor: '#656e7e' }}
          styleIcon={{ color: '#656e7e', width: 20 }}
          styleDiv={{ position: 'absolute', right: '78%' }}
          styleFilter={{ backgroundColor: '#656e7e', width: 50 }}
          onClickSettings={() => setShowForm(!showForm)}
          input={input}
          onChange={(v) => handleInput(v)}
          placeholder='البحث في منصة محمد السادس للحديث الشريف'
          className='bg-white mx-0'
          clickSearch={() => handleClickSearch()}
        />

        <div
          className='box-icon-setting d-flex align-items-center justify-content-center btn mx-2 mb-2 px-2 py-1'
          onClick={() => handleClickSearch()}
          style={{ backgroundColor: '#157646', borderRadius: 8 }}
        >
          {/* <i className='fas fa-search text-light' /> */}
          <p className='text-white fw-bold my-2 mx-2'>{'ابحث'}</p>
        </div>
      </div>
      {showForm && (
        <Cards
          className={`${styles.formSearch} form-search p-2`}
          style={{ backgroundColor: '#e9fbf1' }}
        >
          <form className='d-flex flex-wrap flex-column'>
            <div className={`${styles.alignsec} d-flex alignIte`}>
              {/*<Input className="col-md-4" label="نص الحديث" placeholder="ابحث نص الحديث"/>
               */}
              <CustomSelect
                className='col-md-4'
                options={dataCategory && dataCategory}
                defaultInputValue={ChoiceCategory ? ChoiceCategory : ''}
                label='موضوع'
                name='ChoiceCategory'
                placeholder='اكتب الموضوع'
                onChange={(v) => setChoiceCategory(v)}
              />

              {/* <Input
                className='col-md-4'
                label='مصدر الحكم'
                placeholder='ابحث بمصدر الحكم'
                value={EvaluationSource && EvaluationSource}
                onChange={(v) => setEvaluationSource(v.target.value)}
              /> */}
              <CustomSelect
                className='col-md-4'
                options={dataNarrator && dataNarrator}
                label='الراوي'
                name='ChoiceNarrator'
                defaultInputValue={ChoiceNarrator ? ChoiceNarrator : ''}
                placeholder='اكتب اسم الراوي'
                onChange={(v) => setChoiceNarrator(v)}
              />
            </div>
            <div className={`${styles.alignsec} d-flex alignIte`}>
              <CustomSelect
                className='col-md-4'
                options={dataSource && dataSource}
                defaultInputValue={ChoiceSource ? ChoiceSource : ''}
                label='المصدر'
                name='ChoiceSource'
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
                name='ChoiceDegree'
                defaultInputValue={ChoiceDegree ? ChoiceDegree : ''}
                placeholder='اكتب الحكم'
                onChange={(v) => setChoiceDegree(v)}
              />
              <Input
                type='number'
                className='col-md-4'
                label='رقم الحديث'
                name='numberHadith'
                placeholder='اكتب رقم الحديث'
                value={numberHadith}
                onChange={(v) => setNumberHadith(v.target.value)}
              />
              {/* <Input
                className='col-md-4'
                label='مصدر الحكم'
                placeholder='ابحث بمصدر الحكم'
                value={EvaluationSource && EvaluationSource}
                onChange={(v) => setEvaluationSource(v.target.value)}
              /> */}

              {/* <CustomSelect
                className='col-md-4'
                options={dataNarrator && dataNarrator}
                label='الراوي'
                defaultInputValue={ChoiceNarrator ? ChoiceNarrator : ''}
                placeholder='اكتب اسم الراوي'
                onChange={(v) => setChoiceNarrator(v)}
              /> */}
            </div>
          </form>
        </Cards>
      )}
      <div className='d-flex justify-content-center'>
        <Link
          exact
          activeClassName='active'
          as={`/article/شرط-المنصة`}
          href={{
            pathname: `/article/شرط-المنصة`,
            search: '',
            hash: '',
          }}
        >
          <button
            onClick={() => {
              getDataMenu('شرط المنصة')
            }}
            className={`${styles.buttonSearch} `}
          >{`شروط البحث`}</button>
        </Link>
      </div>
      <CustomModal
        title={'تنبيه'}
        body={message}
        show={show}
        onHide={handleClose}
        onClick={handleClose}
      />
    </div>
  )
}

export default SearchSection
