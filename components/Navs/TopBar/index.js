import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from './TopBar.module.css'
import Brand from '../../_UI/Brand'
import SearchInput from '../../Forms/SearchInput'
import { useRouter } from 'next/router'
import CustomModal from '../../_UI/Modal'
import Lottie from 'react-lottie'
import animationData from '../../lotties/live2.json'
import { getMenuByName } from '../../../endpoints'
import FetchAPI from '../../../API'

const TopBar = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  let router = useRouter()
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const [elementShow, setElementShow] = useState(true)
  const [message, setMessage] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const elementRef = useRef()

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

  function handleInput(v) {
    if (typeof v == 'string') {
      setInput(v)
    } else {
      setInput(v.target.value)
    }
  }

  const goToSearchPage = () => {
    if (!input) {
      setMessage('يرجى ملء كلمة البحث ')
      handleShow()
    } else if (input && input.trim().length < 2) {
      setMessage('يرجى كتابة كلمة تتكون من حرفين فما فوق')
      handleShow()
    } else if (input && input.length >= 100) {
      setMessage('يرجى كتابة جملة لا تتعدى مائة حرف')
      handleShow()
    } else {
      localStorage.removeItem('searchData')
      router.push(
        {
          pathname: '../search',
          search: '',
          query: { from: 'topBar', topic: '', content: '', word: input },
        },
        '/search',
        { shallow: true }
      )

      /*history && history.push({
                pathname: '../search',
                search: '',
                state: {from: 'topBar', topic: '', content: "", word: input}
            })*/
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
  }, [input])

  function handleClickSearch() {
    goToSearchPage()
  }

  useEffect(() => {
    checkSizeWindow()
    if (typeof window !== undefined) {
      window.addEventListener('resize', checkSizeWindow)
      // Remove event listener on cleanup
      return () => {
        if (typeof window !== undefined) {
          window.removeEventListener('resize', checkSizeWindow)
        }
      }
    }
  }, [])

  const checkSizeWindow = () => {
    if (typeof window !== undefined && window.innerWidth <= 480) {
      setElementShow(false)
    } else {
      setElementShow(true)
    }
    //var x = document.getElementById("inputdiv");
  }

  return (
    <div
      className={`${styles.TopBar} ${styles.bgGradientGreen} navbar navbar-expand-lg navbar-light px-2`}
      style={{}}
      ref={elementRef}
    >
      <div className={`${styles.sectionHeader} container-fluid my-2`}>
        <Link href='/' passHref>
          <Brand className={styles.SecBrand} />
        </Link>
        {elementShow && (
          <SearchInput
            className={`${styles.search} text-white `}
            styleIcon={{ color: '#fff' }}
            styleDiv={{ position: 'absolute', right: '65%' }}
            {...props}
            inputClassName={'text-white'}
            onChange={(v) => handleInput(v)}
            clickSearch={() => handleClickSearch()}
            input={input}
            placeholder='البحث في منصة الحديث الشريف'
          />
        )}

        <div
          className={`collapse  ${styles.navbarCollapse} navbar-collapse flex-grow-0`}
          id='navbarTop'
        >
          <ul className={`${styles.navbarNav} navbar-nav align-items-center`}>
            <li
              onClick={() => {
                getDataMenu('شرط المنصة')
              }}
              className={`${styles.navItem} nav-item mx-3 ${styles.callToAction} call-to-action align-items-center d-flex`}
            >
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
                {'شرط المنصة'}
              </Link>
            </li>
            {/* <li
              className={`${styles.navItem} nav-item mx-3 ${styles.callToAction} call-to-action align-items-center d-flex`}
            >
              <Link exact activeClassName='active' href={`/${title}`}>
                {title}
              </Link>
            </li> */}
            <Lottie options={defaultOptions} height={55} width={55} />
            <li className={`${styles.navItem} nav-item`}>
              <Link
                style={{ marginLeft: 20 }}
                exact
                activeClassName='active'
                href={{
                  pathname: '/AllMedia',
                  query: { title: 'التلفزة الرقمية' },
                }}
                as='/AllMedia'
              >
                {'البث المباشر'}
              </Link>
            </li>
          </ul>
        </div>
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

export default TopBar
