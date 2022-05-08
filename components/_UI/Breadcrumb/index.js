import React from 'react'
import styles from './BreadCrumb.module.css'
import Link from 'next/link'
import _ from 'lodash'

const Breadcrumb = (props) => {
  //console.log('props?.data => breadcrumb =>', props?.data)
  const renderData = () => {
    try {
      if (props?.data) {
        const lastItem = _.last(props.data)

        const renderData = props?.data?.map((item, index) => {
         // console.log('breadcrumb______________', item)
          const isLenght = props?.data.length !== index + 1
          //console.log('title is isLenght', isLenght)
          if (item !== lastItem) {
            return (
              <Link
                passHref={true}
                href={`/${item?.path}`}
                as={`/${item?.path}`}
                key={index.toString()}
              >
                <a className='btn d-flex align-items-center p-0'>
                  {' '}
                  <p
                    className={`mb-0 ${styles.title}`}
                    style={{
                      color: isLenght ? '#000000' : '#A1A8AE',
                    }}
                  >
                    {item?.title || 'عنوان'}
                  </p>
                  {isLenght && <i className='fas fa-chevron-left mx-4' />}
                </a>
              </Link>
            )
          } else if (item.title === 'سؤال و جواب') {
            return (
              <Link
                passHref={true}
                href={`/${item?.path}`}
                as={`/${item?.path}`}
                key={index.toString()}
              >
                <a className='btn d-flex align-items-center p-0'>
                  {' '}
                  <p
                    className={`mb-0 ${styles.title}`}
                    style={{
                      color: '#000000',
                    }}
                  >
                    {item?.title || 'عنوان'}
                  </p>
                  {isLenght && <i className='fas fa-chevron-left mx-4' />}
                </a>
              </Link>
            )
          } else {
            return (
              <div key={index.toString()}>
                <p
                  className={`mb-0 ${styles.title}`}
                  style={{
                    color: isLenght ? '#000000' : '#A1A8AE',
                  }}
                >
                  {item?.title || 'عنوان'}
                </p>
                {isLenght && <i className='fas fa-chevron-left mx-4' />}
              </div>
            )
          }
        })
        return renderData
      }
    } catch (error) {
      console.log('CATCH Breadcrumb')
    }
  }

  return (
    <div
      className={`${styles.Breadcrumb} d-flex p-4`}
      style={{ marginRight: -5 }}
    >
      {renderData()}
    </div>
  )
}

export default Breadcrumb
