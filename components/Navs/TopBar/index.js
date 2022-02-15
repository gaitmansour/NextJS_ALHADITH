import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './TopBar.module.css'
import Brand from '../../_UI/Brand'
import SearchInput from '../../Forms/SearchInput'
import { useRouter } from 'next/router'
import CustomModal from '../../_UI/Modal'
import Lottie from 'react-lottie'
import animationData from '../../lotties/live2.json'

const TopBar = (props) => {
  // console.log(props)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  let router = useRouter()
  const { t, i18n } = useTranslation()
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const isRTL = i18n?.language === 'ar'
  const title = 'التواصل'
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const history = []

  function handleInput(v) {
    if (typeof v == 'string') {
      setInput(v)
    } else {
      setInput(v.target.value)
    }
  }

  const goToSearchPage = () => {
    if (input === '') {
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
      // console.log("go to")
      /*history && history.push({
                pathname: '../search',
                search: '',
                state: {from: 'topBar', topic: '', content: "", word: input}
            })*/
    }
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      goToSearchPage()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [input])

  function handleClickSearch() {
    goToSearchPage()
  }

  return (
    <div
      className={`${styles.TopBar} ${styles.bgGradientGreen} navbar navbar-expand-lg navbar-light px-2`}
      style={{}}
    >
      <div className='container-fluid my-2'>
        <Brand />
        <SearchInput
          className={`${styles.search} text-white `}
          styleIcon={{ color: '#fff' }}
          styleDiv={{ position: 'absolute', right: '65%' }}
          {...props}
          inputClassName={'text-white'}
          onChange={(v) => handleInput(v)}
          clickSearch={() => handleClickSearch()}
          input={input}
          placeholder='البحث في منصة الحديث النبوي الشريف'
        />

        <div
          className={`collapse ${styles.navbarCollapse} navbar-collapse flex-grow-0`}
          id='navbarTop'
        >
          <ul className={`${styles.navbarNav} navbar-nav align-items-center`}>
            <li
              className={`${styles.navItem} nav-item mx-3 ${styles.callToAction} call-to-action align-items-center d-flex`}
            >
              <Link
                exact
                activeClassName='active'
                href={`/choroutMinassa`}
                as={'/شرط المنصة'}
              >
                {'شرط المنصة'}
              </Link>
            </li>
            <Lottie options={defaultOptions} height={55} width={55} />
            <li className={`${styles.navItem} nav-item`}>
              <div style={{ marginLeft: 20 }}>
                <Link exact activeClassName='active' href={`/AllMedia`}>
                  {'البث المباشر'}
                </Link>
              </div>
            </li>
            {/*<li
                            className={`${styles.navItem} nav-item mx-3 ${styles.callToAction} call-to-action align-items-center d-flex`}
                        >
                            <Link exact activeClassName='active' href={`/${title}`}>
                                {title}
                            </Link>
                        </li>*/}
          </ul>
        </div>
      </div>

      <CustomModal
        title={'تنبيه'}
        body={'يرجى ملء كلمة البحث '}
        show={show}
        onHide={handleClose}
        onClick={handleClose}
      />
    </div>
  )
}

export default TopBar
