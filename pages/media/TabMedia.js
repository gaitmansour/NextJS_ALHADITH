import React, { useEffect, useRef, useState } from 'react'
import styles from './media.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import { getSideItems } from '../../endpoints'
import FetchAPI from '../../API'

const TabMedia = (props) => {
  const router = useRouter()
  //console.log('rouer', router)
  const [showDropdown, setShowDropdown] = useState(false)
  const [dataChildrenTab, setDataChildrenTab] = useState([])
  const [slectElement, setSlectElement] = useState(null)
  const [style, setStyle] = useState({ display: 'none' })
  const [styleNav, setStyleNav] = useState(true)

  const getItemsMenu = async () => {
    if (props?.dataTab?.length > 0) {
      return Promise.all(
        props?.dataTab?.map(
          async (item) =>
            await FetchAPI(getSideItems(item?.tid)).then((res) => {
              return { [item.name]: res?.data, tid: item?.tid }
            })
        )
      ).then((data) => {
        setDataChildrenTab(data)
      })
    }
  }
  // console.log('data promise ALlll \n', dataChildrenTab && dataChildrenTab)

  // console.log(
  //   'dataChildrenTab ==>',
  //   dataChildrenTab &&
  //     dataChildrenTab?.map((item) => {
  //       console.log('item=> ', item[Object.keys(item)[0]])
  //       return item
  //     })
  // )

  useEffect(() => {
    getItemsMenu()
  }, [props.dataTab])

  const checkSizeWindow = () => {
    if (typeof window !== undefined && window.innerWidth <= 600) {
      setStyleNav(false)
    } else {
      // setStyleNav(true)
      setStyleNav(true)
    }
    //var x = document.getElementById("inputdiv");
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
  //console.log('indexTab', slectElement)
  return (
    <div className='mx-2'>
      <div className={styles.container__inner}>
        <div className={styles.container__navbar}>
          <div
            className={`${styles.header} d-flex justify-content-center align-items-center`}
          >
            <h1 className={styles.heading}>{props.titlepage}</h1>
            <IoIosArrowBack
              color='#157646'
              size={25}
              className={styles.iconShowMenu}
              onClick={() => setStyleNav(!styleNav)}
            />
          </div>
          {styleNav && (
            <nav className={styles.navbar} aria-label='قائمة التنقل الثانوية'>
              <ul className={styles.menu}>
                {dataChildrenTab &&
                  dataChildrenTab?.map((item, index) => {
                    return (
                      <li
                        key={item?.tid}
                        className={`${styles.menu__item} ${
                          props?.titlepage == Object.keys(item)[0] ||
                          router?.query?.title?.split('-').join(' ') ==
                            Object.keys(item)[0]
                            ? 'active'
                            : ''
                        } mx-1`}
                        onMouseOver={(e) => {
                          setSlectElement(item?.tid),
                            slectElement &&
                              item[Object.keys(item)[0]]?.length > 0 &&
                              slectElement == item?.tid &&
                              setStyle({ display: 'block' })
                        }}
                        onMouseOut={(e) => {
                          slectElement &&
                            item[Object.keys(item)[0]]?.length > 0 &&
                            slectElement == item?.tid &&
                            setStyle({ display: 'none' })
                        }}
                      >
                        <div
                          onClick={() => {
                            localStorage.setItem(
                              '_id',
                              JSON.stringify(item?.tid)
                            )
                          }}
                        >
                          <Link
                            href={Object.keys(item)[0]?.split(' ').join('-')}
                            as={Object.keys(item)[0]?.split(' ').join('-')}
                          >
                            <a className='text-decoration-none text-black'>
                              {Object.keys(item)[0]}
                            </a>
                          </Link>
                          {item[Object.keys(item)[0]]?.length > 0 && (
                            <i
                              className='fas fa-chevron-down text-success mx-1'
                              //   onClick={() => setShowDropdown(!showDropdown)}
                            ></i>
                          )}
                        </div>

                        {slectElement &&
                          slectElement == item?.tid &&
                          item[Object.keys(item)[0]]?.length > 0 && (
                            <ul
                              className={`${styles.dropdown} shadow-card`}
                              style={style}
                            >
                              {dataChildrenTab &&
                                item[Object.keys(item)[0]]?.map((data, i) => {
                                  return (
                                    <li
                                      //   onClick={() => setShowDropdown(false)}
                                      className={`${styles.dropdown_content} mt-2`}
                                      key={i}
                                      onClick={() => {
                                        localStorage.setItem(
                                          '_id',
                                          JSON.stringify(data?.tid)
                                        )
                                      }}
                                    >
                                      <Link
                                        href={`${data?.name
                                          ?.split(' ')
                                          .join('-')}`}
                                        as={data?.name?.split(' ').join('-')}
                                      >
                                        <a className='text-decoration-none text-black fw-normal'>
                                          {data?.name}
                                        </a>
                                      </Link>
                                    </li>
                                  )
                                })}
                            </ul>
                          )}
                      </li>
                    )
                  })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

export default TabMedia
