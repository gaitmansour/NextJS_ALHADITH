import React, { useEffect, useRef, useState } from 'react'
import styles from './media.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'

const TabMedia = (props) => {
  const router = useRouter()
  console.log('rouer', router)
  const [showDropdown, setShowDropdown] = useState(false)
  const [style, setStyle] = useState({ display: 'none' })
  const [styleNav, setStyleNav] = useState(true)

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
                {props?.dataTab?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${styles.menu__item} ${
                        props.titlepage == item?.title ||
                        router.query.title.split('-').join(' ') == item?.title
                          ? 'active'
                          : ''
                      } mx-1`}
                      onMouseOver={(e) => {
                        item?.items?.length > 0 &&
                          setStyle({ display: 'block' })
                      }}
                      onMouseOut={(e) => {
                        item?.items?.length > 0 && setStyle({ display: 'none' })
                      }}
                    >
                      <div>
                        <Link
                          href={item?.title.split(' ').join('-')}
                          as={item?.title.split(' ').join('-')}
                        >
                          <a className='text-decoration-none text-black'>
                            {item?.title}
                          </a>
                        </Link>
                        {item?.items?.length > 0 && (
                          <i
                            className='fas fa-chevron-down text-success mx-1'
                            //   onClick={() => setShowDropdown(!showDropdown)}
                          ></i>
                        )}
                      </div>
                      {item?.items?.length > 0 && (
                        <ul
                          className={`${styles.dropdown} shadow-card`}
                          style={style}
                        >
                          {item.items.map((data, i) => {
                            return (
                              <li
                                //   onClick={() => setShowDropdown(false)}
                                className={`${styles.dropdown_content} mt-2`}
                              >
                                <Link
                                  href={data?.title.split(' ').join('-')}
                                  as={data?.title.split(' ').join('-')}
                                >
                                  <a className='text-decoration-none text-black fw-normal'>
                                    {data.title}
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
