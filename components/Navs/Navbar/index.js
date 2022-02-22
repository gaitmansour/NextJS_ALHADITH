import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Icons, Logos } from '../../../assets'

import styles from './Navbar.module.css'
import _ from 'lodash'
import FetchAPI from '../../../API'
import { getMenu, getMenuLinks, base_url } from '../../../endpoints'
import { getMenuLink, handleMenu } from '../../../helpers'
import Contact from '../../Contact'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'
import $ from 'jquery'
import SearchInput from '../../Forms/SearchInput'
import CustomModal from '../../_UI/Modal'
import { useRouter } from 'next/router'

const NavBar = (props) => {
  const { t, lang } = useTranslation()
  let router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const [Menu, setMenu] = useState([])
  const [MenuGlobal, setMenuGlobal] = useState([])
  const [MenuLinks, setMenuLinks] = useState([])
  const [shownavLink, setShownavlink] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [InputShow, setInputShow] = useState(false)
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //const scroll = () => ref && ref.current && ref.current.scrollIntoView({behavior: "smooth"});
  const styleAlignText = `${lang === 'ar' ? 'text-lg-end' : 'text-lg-start'}`
  const styleDropdownToggle = `${styles.navLink} ${styles.menuLinks} ${styles.dropdownToggle} nav-link dropdown-toggle d-flex align-items-center text-dark ${styleAlignText}`
  const url = getMenu()

  const checkSizeWindow = () => {
    if (typeof window != 'undefined') {
      if (window.innerWidth <= 450) {
        setShowLogo(defaultShow)
      } else {
        setShowLogo(false)
      }
    }
  }

  const getMenuList = () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        const Menu = handleMenu(data?.data)
        setMenuGlobal(Menu)
      }
    })
  }

  const handleLinks = () => {
    getMenuLink().then((r) => setMenuLinks(r))
  }

  useEffect(() => {
    handleLinks()
    getMenuList()
  }, [])

  const ref = useRef()
  const scroll = () =>
    ref && ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })

  const renderLinksMenu = () => {
    const navLinks =
      MenuLinks &&
      MenuLinks?.map((item, index) => {
        const CustomDropDown = React.forwardRef(({ onClick }, ref) => (
          <a
            className={styleDropdownToggle}
            href=''
            ref={ref}
            onClick={(e) => {
              e.preventDefault()
              onClick(e)
            }}
          >
            {item?.label}
            {item?.items?.length > 0 && (
              <i className='fas fa-chevron-down text-success mx-2' />
            )}
          </a>
        ))

        // forwardRef again here!
        // Dropdown needs access to the DOM of the Menu to measure it
        const MenuDropDown = React.forwardRef(
          (
            { children, style, className, 'aria-labelledby': labeledBy },
            ref
          ) => {
            if (item?.items?.length > 0) {
              return (
                <ul
                  ref={ref}
                  style={{ ...style, transform: 'none', top: '100%' }}
                  className={`${className} shadow-card ${styles.contentDropdown}  ${styleAlignText}`}
                  aria-labelledby={labeledBy}
                >
                  {item?.items?.map((data, i) => {
                    return (
                      <Link
                        passHref={true}
                        key={i.toString()}
                        exact
                        activeClassName={styles.navBarActive}
                        href={{
                          pathname: `/${data?.path}`,
                          query: {
                            fromNav: item?.items,
                            selectedItem: data?.title,
                          },
                        }}
                        as={
                          data?.path === '/Almoshaf'
                            ? `/${data?.as}`
                            : `/${data?.path}`
                        }
                      >
                        <a
                          className={`${styles.navBarActive} ${styles.listMenu}`}
                        >
                          <li
                            className={`btn justify-content-start rounded-0 ${styles.p3}`}
                            onClick={() => {
                              setShownavlink(!shownavLink),
                                localStorage.setItem(
                                  'categorieTitle',
                                  JSON.stringify({
                                    parent: item?.label,
                                    child: data?.title,
                                  })
                                )
                            }}
                          >
                            {/*onClick = {() => console.log("data----", item?.items)}>*/}
                            {data.label}
                          </li>
                        </a>
                      </Link>
                    )
                  })}
                </ul>
              )
            } else {
              return null
            }
          }
        )

        return (
          // <li
          //   className={`${styles.navItem}  align-self-stretch d-flex  mx-1 nav-item`}
          //   key={index.toString()}
          // >
          <Dropdown key={index.toString()}>
            <Dropdown.Toggle as={CustomDropDown} id='dropdown-basic' />

            <React.Fragment
              onClick={() => {
                document.body.click()
              }}
            >
              <Dropdown.Menu as={MenuDropDown} />
            </React.Fragment>
          </Dropdown>
        )
      })
    return navLinks
  }

  const clicked = (e) => {
    e.preventDefault()
    // console.log("left < click")
    // var element = document.querySelector("#navbarNav > ul")
    // console.log(element)
    // element.scrollTop -= 10;
    // // element.scroll({
    // //     right: 100,
    // //     behavior: 'smooth'
    // // });
  }

  const renderGlobalMenu = () => {
    const menuLinks =
      MenuGlobal &&
      MenuGlobal?.map((item, index) => {
        if (item?.label !== 'الرئيسية') {
          return (
            <div
              className='col-md-2 nav-item flex-column pt-4'
              key={index.toString()}
              ref={ref}
            >
              <Link
                //className="nav-link d-flex align-items-center text-dark p-0 fw-bold title-link"
                id='clickable'
                role='button'
                exact
                activeClassName='nav-bar-active'
                href='#'
              >
                <a
                  className={`nav-link d-flex align-items-center text-dark p-0 fw-bold title-link`}
                >
                  {item?.label}
                </a>
              </Link>
              {item?.items?.length > 0 && (
                <ul className='m-0 p-0 d-flex flex-column align-items-start list-items'>
                  {item?.items?.map((data, i) => {
                    return (
                      <Link
                        passHref={true}
                        key={i.toString()}
                        exact
                        activeClassName='nav-bar-active'
                        as={`/${data?.path}`}
                        href={{
                          pathname: `/${data?.path}`,
                          search: '',
                          hash: '',
                          query: {
                            fromNav: item?.items,
                            selectedItem: data?.title,
                          },
                        }}
                        onClick={() => {
                          // console.log('---------------------------')
                          // console.log({
                          //   pathname: `/${data?.path}`,
                          //   search: '',
                          //   hash: '',
                          //   state: {
                          //     fromNav: item?.items,
                          //     selectedItem: data?.title,
                          //   },
                          // })
                          setShowMenu(!showMenu)
                        }}
                      >
                        <li
                          key={i}
                          className='btn rounded-0 mx-0 px-0'
                          onClick={() => {
                            setShowMenu(!showMenu),
                              localStorage.setItem(
                                'categorieTitle',
                                JSON.stringify({
                                  parent: item?.label,
                                  child: data?.title,
                                })
                              )
                          }}
                        >
                          {data.label}
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        }
      })
    return menuLinks
  }
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 100) {
      setVisible(true)
    } else if (scrolled <= 100) {
      setVisible(false)
    }
  }
  // console.log(visible)
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', toggleVisible)
  }

  useEffect(() => {
    checkSize()
    if (typeof window !== undefined) {
      window.addEventListener('resize', checkSize)
      // Remove event listener on cleanup
      return () => {
        if (typeof window !== undefined) {
          window.removeEventListener('resize', checkSize)
        }
      }
    }
  }, [])

  const checkSize = () => {
    if (typeof window !== undefined && window.innerWidth <= 450) {
      setInputShow(true)
    } else {
      setInputShow(false)
    }
    //var x = document.getElementById("inputdiv");
  }
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
      router.push({
        pathname: '/search',
        search: '',
        query: { from: 'topBar', topic: '', content: '', word: input },
      })
    }
  }

  function handleClickSearch() {
    goToSearchPage()
  }
  return (
    <div className='NavBar bg-white navbar navbar-expand-lg sticky-top navbar-light p-0'>
      <div className='container-fluid p-0'>
        <div
          className={`${
            visible ? styles.menuBlog : styles.menuAl
          } btn rounded-0 p-0 border-0 align-self-stretch d-flex align-items-center justify-content-center menu-btn bg-gradient-green`}
          style={props?.styleBtnBars}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className='bg-light rounded-pill icon-box d-flex align-items-center justify-content-center'>
            <i className='fas fa-bars text-dark' />
          </div>
        </div>
        {!showLogo ? (
          <>
            <div
              className={`${
                visible ? 'd-block' : 'd-none'
              } d-flex align-items-center btn m-0 p-0 searchSticky`}
            >
              <Link className='my-2' href='/'>
                <Image
                  className='logoNav'
                  src={Logos.logo_web}
                  alt='logo-Al-hadith-Mohammed-VI'
                  title='logo Al hadith Mohammed VI'
                />
              </Link>
            </div>
          </>
        ) : null}
        <div
          className={`collapse navbar-collapse flex-grow-0 align-self-center w-auto itemNav`}
          id='navbarNav'
        >
          <ul className='menu-principal navbar-nav align-items-center pr-4 align-self-stretch '>
            {renderLinksMenu()}
          </ul>
        </div>
        <div
          className={`bg-white global-menu position-absolute px-4 ${
            showMenu ? 'global-menu-show' : 'global-menu-hide'
          } overflow-hidden`}
        >
          <i
            className='fas fa-times-circle text-white icon-close'
            onClick={() => setShowMenu(!showMenu)}
          />
          <div className='row'>{renderGlobalMenu()}</div>
          <Contact title='الشبكات الاجتماعية' className='social-media' />
        </div>

        <div className={`${visible ? 'd-block' : 'd-none'}`}>
          {InputShow ? (
            <div className={styles.responsiveSearch} style={{ width: '60vw' }}>
              <SearchInput
                styleIcon={{ color: '#157646', width: 20 }}
                styleFilter={{ backgroundColor: '#157646', width: 50 }}
                styleSerachIcon={{ backgroundColor: '#157646' }}
                {...props}
                input={input}
                onChange={(v) => handleInput(v)}
                clickSearch={() => handleClickSearch()}
                placeholder='البحث في منصة الحديث النبوي الشريف'
                className={`${styles.searchSection} text-black bg-white mx-0 shadow-card`}
              />
            </div>
          ) : (
            <Link href={'/search'}>
              <a
                onClick={props.onClickSettings}
                className={` d-flex align-items-center btn m-0 p-0 searchSticky`}
              >
                <i
                  className='fas fa-search p-3 fa-2x iconSearch'
                  style={{ color: '#ADABAB' }}
                />
              </a>
            </Link>
          )}
        </div>
        <div
          className={`${visible ? styles.quesAnserImg : styles.quesAnser} 
           btn rounded-0 p-0 border-0 bg-warning btn-faq align-self-stretch justify-content-center d-flex ${
             styles.secQa
           }`}
        >
          <Link
            exact
            activeClassName='active'
            href='/listQuestions'
            as={'سؤال وجواب/'}
          >
            <a
              className={` align-items-center d-flex px-4 py-2 ${styles.linkQa}`}
            >
              <Image
                className={`logo mx-0 px-1`}
                src={Icons.icon_faq}
                alt='icon faq'
              />
              <h4 className='m-0 p-0 text-white'>سؤال وجواب</h4>
            </a>
          </Link>
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

export default NavBar
