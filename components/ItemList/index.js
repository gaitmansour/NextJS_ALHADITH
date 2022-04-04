import styles from './ItemList.module.css'
import React, { useEffect, useState } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import Cards from '../_UI/Cards'

const ItemList = (props) => {
  const className = props?.className ? props.className : ''
  const params = `${props.content}\n# الحكم : ${props.degree} \n # الراوي : ${
    props.narrator
  } \n# مصدر الحكم : ${
    props.sourceGlobal ? props.sourceGlobal : ''
  } \n# الموضوع : ${props.category} \n# المصدر : ${props.source} \n 
  منصة محمد السادس للحديث النبوي الشريف `

  const toShow = params.substring(0, 251) + ' ...'
  // console.log("toShow",toShow)

  return (
    <Cards
      className={`${styles.ItemList} my-2 w-100 px-0 pb-0 ${className} ${
        styles.result
      } result ${
        props.degree === 'صحيح'
          ? styles.bckg1
          : props.degree === 'ضعيف'
          ? styles.bckg2
          : props.degree === 'موضوع'
          ? styles.bckg3
          : 'bckgCard'
      }`}
    >
      <div className={styles.content}>
        {props.highlight ? (
          <p className='m-0' dangerouslySetInnerHTML={{ __html: props.text }} />
        ) : (
          <p className='m-0'>{props.text}</p>
        )}
        <div className={`${styles.metaData} meta-data mt-3`}>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex text-warning m-0 mb-2'>
              <span
                className={`fw-bold ${styles.output}`}
                style={{ color: '#b17d00' }}
              >
                الحكم
              </span>
              :{' '}
              <span className={`${styles.resultat} fw-bold`}>
                {props.degree}
              </span>
            </p>
          </div>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex text-success m-0 mb-2'>
              <span className={`text-success ${styles.output}`}>الراوي</span>:{' '}
              <span className={styles.resultat}>{props.narrator}</span>
            </p>
          </div>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex m-0 mb-2'>
              <span className={styles.output} style={{ color: '#b17d00' }}>
                المصدر
              </span>
              : <span className={styles.resultat}>{props.source}</span>
            </p>

            {/* <div className="devider" />
            <p className="d-flex text-success m-0">
              <span className="text-success output">باب</span>:{' '}
              <span className="resultat">{props.topic}</span>
            </p> */}
          </div>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex text-success m-0 mb-2'>
              <span className={`text-success ${styles.output}`}>
                مصدر الحكم
              </span>
              :<span className={styles.resultat}>{props.sourceGlobal}</span>
            </p>
          </div>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex m-0 mb-2'>
              <span className={styles.output} style={{ color: '#b17d00' }}>
                الموضوع
              </span>
              : <span className={styles.resultat}>{props.category}</span>
            </p>
          </div>

          {props.comments && (
            <div
              className={`d-flex align-items-center alignItem ${styles.alignItem}`}
            >
              <p className='d-flex text-success m-0 mb-2'>
                {' '}
                <span className={`text-success ${styles.output}`}>
                  {' '}
                  ملاحظات{' '}
                </span>
                : <span className={styles.resultat}>{props.comments}</span>
              </p>
            </div>
          )}
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex m-0 mb-2'>
              {' '}
              <span className={`text-success ${styles.output}`}>
                {' '}
                رقم الحديث{' '}
              </span>
              : <span className={styles.resultat}>{props.numeroHadith}</span>
            </p>
          </div>
          {/*props.tags && props.tags.map((item, index) =>
                        <div key={index} className="p-1 d-inline-flex p-2 bd-highlight">
                                <span className="badge badge-default badge-outlined text-black-50">
                                    {`#${item.name}`}
                                </span>
                        </div>)*/}
        </div>
      </div>
      <hr />
      <div
        className={`sm-icons d-flex align-items-center flex-row mb-2`}
        style={{ alignItems: 'center' }}
      >
        <FacebookShareButton
          url={'https://hadithm6.ma/'}
          quote={params}
          className='justify-content-center mx-2'
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        {/* <LinkedinShareButton
                    url={'www.habouss.com'}
                    quote={params}
                    className="mx-2"
                >
                    <LinkedinIcon size={32} round/>
                </LinkedinShareButton> */}
        <TwitterShareButton
          url={'https://hadithm6.ma/'}
          title={toShow}
          className='mx-2'
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={'https://hadithm6.ma/'}
          title={params}
          separator={'\n'}
          className='mx-2'
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </Cards>
  )
}

export default ItemList
