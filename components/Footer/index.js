import Contact from '../Contact/index'
import Brand from '../_UI/Brand'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import FetchAPIData from '../../data/API_Newsletter'
import { getMenu, newsletter } from '../../endpoints'
import CustomModal from '../_UI/Modal'
import styles from './Footer.module.css'
import { getMenuLink, handleMenu } from '../../helpers'
import FetchAPI from '../../API'

const Footer = () => {
  const [MenuLinks, setMenuLinks] = useState([])
  const [MenuGlobal, setMenuGlobal] = useState([])
  const [inputEmail, setInputEmail] = useState('')
  const [contentMessage, setContentMessage] = useState('')
  const [show, setShow] = useState(false)
  const [sendSuccess, setsendSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const urlSubscribe = newsletter()
  const { t } = useTranslation()
  const url = getMenu()

  // const handleLinks = () => {
  //   getMenuLink().then((r) => {
  //     setMenuLinks(r)
  //     // console.log('rrrr-------------------------',r)
  //   })
  // }

  const subscribed = async () => {
    const data = {
      email_address: inputEmail,
    }
    setIsLoading(true)
    return FetchAPIData(urlSubscribe, data).then((data) => {
      if (data.success === true) {
        handleShow()
        setContentMessage('شكرا لإشتراكك في القائمة البريدية')
      } else if (data.success === false) {
        handleShow()
        setContentMessage(
          'يرجى ملء الإستمارة ببريد إلكتروني غير مشترك أو التحقق من بريدك الإلكتروني'
        )
      }
      setInputEmail('')
      setIsLoading(false)
    })
  }

  const handleSubscribe = () => {
    if (!inputEmail) {
      setContentMessage('يرجى ملء الإستمارة')
      handleShow()
    } else {
      subscribed()
    }
  }

  useEffect(() => {
    // handleLinks()
    getMenuList()
  }, [])

  const getMenuList = () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        const Menu = handleMenu(data?.data)
        setMenuGlobal(Menu)
      }
    })
  }
  //console.log('MenuGlobal =>', MenuGlobal)

  const renderItemMenu = () => {
    const menuLinks =
      MenuGlobal &&
      MenuGlobal?.map((item, index) => {
        if (item?.label !== 'الرئيسية') {
          return item?.label === 'روابط مهمة' ? (
            <>
              {item?.items?.length > 0 && (
                <ul
                  className={`${styles.FooterLink}  m-0 p-0 d-flex flex-column align-items-start`}
                >
                  {item?.items?.map((data, i) => {
                    return (
                      <Link
                        passHref={true}
                        key={i.toString()}
                        exact
                        activeClassName=''
                        as={`/${data?.path.split(' ').join('-')}`}
                        href={{
                          pathname: `/${data?.path.split(' ').join('-')}`,
                          search: '',
                          hash: '',
                          query: {
                            fromNav: item?.items,
                            selectedItem: data?.title,
                            contenuArticle: data?.field_contenu_default,
                            _id: data?.tID,
                          },
                        }}
                        // onClick={() => {
                        //   setShowMenu(!showMenu)
                        // }}
                      >
                        <li
                          key={i}
                          className={` mx-0 px-0 text-white`}
                          onClick={() => {
                            // setShowMenu(!showMenu),
                            localStorage.setItem(
                              'categorieTitle',
                              JSON.stringify({
                                parent: item?.label,
                                child: data?.title,
                                contenuArticle:
                                  data?.field_contenu_default !== ''
                                    ? data?.field_contenu_default
                                    : data?.title,
                              })
                            )
                            localStorage.setItem(
                              'tid',
                              JSON.stringify(data.tID)
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
            </>
          ) : null
        }
      })
    return menuLinks
  }

  return (
    <div className={`${styles.Footer} Footer bg-app overflow-hidden`}>
      <Contact />
      <div
        className={`${styles.footerContainer} footer-container overflow-hidden w-100`}
      >
        <div className={`${styles.bgFooter} bgFooter w-100 h-100`} />
        <div className={`${styles.footer} footer w-100 h-100`}>
          <div className='row p-3'>
            <div
              className={`col col-lg-3 col-md-12 col-sm-1 d-flex justify-content-center align-items-center brd`}
            >
              <Brand className={` ${styles.brand} brand`} />
            </div>
            <div
              className={`${styles.gridsection} col col-12 col-lg-3 col-md-4 col-sm-1 mt-5 mb-3`}
            >
              <h5 className='text-white pb-3'>{'روابط مهمة'}</h5>
              <div className='p-0'>
                {renderItemMenu()}
                {/* <p className={`${styles.FooterLink}`}>
                  <Link href={`/روابط`}>{'روابط'}</Link>
                </p>

                <p className={`${styles.FooterLink}`}>
                  <Link
                    exact
                    activeClassName='active'
                    href={`/ContactUs`}
                    as={`/ContactUs`}
                  >
                    {'التواصل'}
                  </Link>
                </p>
                <p className={`${styles.FooterLink}`}>
                  <Link href={`/choroutMinassa`} as={'/choroutMinassa'}>
                    {'شرط المنصة'}
                  </Link>
                </p>
                <p className={`${styles.FooterLink}`}>
                  <Link href={`/conditionUser`} as={'/conditionUser'}>
                    {'اتفاقية استخدام الموقع'}
                  </Link>
                </p> */}
              </div>
            </div>
            <div
              className={`${styles.gridsection} col col-12 col-lg-3 col-md-4 col-sm-1 mt-5 mb-3`}
            >
              <h5 className='text-white pb-3'>{'تواصلوا معنا عبر'}</h5>
              <ul className='p-0'>
                <p
                  className={`${styles.FooterLink}`}
                  style={{
                    color: '#FEB400',
                    marginBottom: '20%',
                  }}
                >
                  {'الهاتف'}
                </p>
                <p
                  className={styles.FooterLink}
                  style={{
                    color: '#FFF',
                  }}
                >
                  {'212-0537766812+'}
                </p>
                <p
                  className={`${styles.FooterLink}`}
                  style={{
                    color: '#FEB400',
                    marginBottom: '20%',
                  }}
                >
                  {'البريد الالكتروني'}
                </p>
                {/* <p
                  className={`${styles.FooterLink}FooterLink email`}
                  style={{ color: '#fff' }}
                >
                  {'contact@hadithm6.ma'}
                </p> */}
                <a
                  className={`${styles.FooterLink}FooterLink email`}
                  style={{ color: '#fff' }}
                  href='mailto:contact@hadithm6.ma'
                >
                  {'contact@hadithm6.ma'}
                </a>
              </ul>
            </div>
            <div
              className={`${styles.newsletter} ${styles.gridsection} col col-12 col-lg-3 col-md-4 col-sm-1 mt-5 mb-3 newsletter`}
            >
              <h5 className='text-white pb-3 mb-4'>
                {'التسجيل في النشرة البريدية'}
              </h5>
              <div className='p-0 form'>
                <div className='form-group'>
                  {/* <label
                    form='exampleInputEmail1'
                    className='form-label text-white '
                  >
                    {'البريد الالكتروني'}
                  </label> */}
                  <input
                    type='email'
                    className={`form-control w-75`}
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder={'البريد الالكتروني'}
                    value={inputEmail}
                    onChange={(v) => setInputEmail(v.target.value)}
                    style={{ borderRadius: 30 }}
                  />
                </div>
                <div className='d-grid w-75 my-3'>
                  <button
                    className={`${styles.send} btn btn-lg  send`}
                    type='button'
                    style={{
                      backgroundColor: '#FBBF31',
                      boxShadow: 10,
                      borderRadius: 30,
                      color: '#fff',
                    }}
                    onClick={handleSubscribe}
                  >
                    {'أرسل'}
                    {isLoading && (
                      <span
                        className='spinner-grow spinner-grow-sm mx-2'
                        role='status'
                        aria-hidden='true'
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.copyright} copyright text-center p-3`}>
            <p className={`${styles.copyr} copyr text-white m-0`}>
              منصة محمد السادس للحديث الشريف- وزارة الأوقاف و الشؤون الإسلامية{' '}
            </p>
            <p className={`${styles.copyr} copyr text-white m-0`}>
              جميع الحقوق محفوظة- 2022 ©
            </p>
          </div>
        </div>
      </div>
      <CustomModal
        title={'تنبيه'}
        body={contentMessage}
        show={show}
        onHide={handleClose}
        onClick={handleClose}
      />
    </div>
  )
}

export default Footer
