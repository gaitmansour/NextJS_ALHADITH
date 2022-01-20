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
  const params = `${props.content}\n  # الباب : ${props.topic} \n# الموضوع : ${
    props.category
  } \n# المصدر : ${props.source} \n # الراوي : ${props.narrator} \n# الحكم : ${
    props.degree
  } \n# مصدر الحكم : ${props.sourceGlobal ? props.sourceGlobal : ''}`

  const toShow = params.substring(0, 251) + ' ...'
  // console.log("toShow",toShow)

  return (
    <Cards
      className={`${styles.ItemList} my-2 px-0 pb-0 ${className} ${
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
            <p className='d-flex m-0'>
              <span className={`text-warning ${styles.output}`}>الحكم</span>:{' '}
              <span className={styles.resultat}>{props.degree}</span>
            </p>
            <div className={styles.devider} />
            <p className='d-flex m-0'>
              <span className={`text-warning ${styles.output}`}>الراوي</span>:{' '}
              <span className={styles.resultat}>{props.narrator}</span>
            </p>
            <div className={styles.devider} />
            <p className='d-flex m-0'>
              <span className={`text-warning ${styles.output}`}>المصدر</span>:{' '}
              <span className={styles.resultat}>{props.source}</span>
            </p>
          </div>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex m-0'>
              <span className={`text-success ${styles.output}`}>
                مصدر الحكم
              </span>
              :<span className={styles.resultat}>{props.sourceGlobal}</span>
            </p>
            <div className={styles.devider} />
            <p className='d-flex m-0'>
              <span className={`text-success ${styles.output}`}>الموضوع</span>:{' '}
              <span className={styles.resultat} color={'black'}>
                {props.category}
              </span>
            </p>
            <div className={styles.devider} />
            <p className='d-flex m-0'>
              <span className={`text-success ${styles.output}`}>باب</span>:{' '}
              <span className={styles.resultat}>{props.topic}</span>
            </p>
          </div>
          <div
            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
          >
            <p className='d-flex text-success m-0'>
              {' '}
              <span className={`text-success ${styles.output}`}> ملاحظات </span>
              :{' '}
              <span
                className={styles.resultat}
                dangerouslySetInnerHTML={{ __html: props.description }}
              />
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
        {/*<a href='https://www.facebook.com/' alt="facebook">
                    <i className="fab fa-facebook-f mx-2"></i>
                </a>
                    <a href='https://www.youtube.com/' alt="youtube">
                    <i className="fab fa-youtube mx-2"></i>
                    </a>
                    <a href='https://www.instagram.com/' alt="instagram">
                    <i className="fab fa-instagram mx-2"></i>
                    </a>
                    <a href='https://www.linkedin.com/' alt="linkedin">
                    <i className="fab fa-linkedin-in mx-2"></i>
                    </a>*/}

        <FacebookShareButton
          url={'www.habouss.com'}
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
          url={'www.habouss.com'}
          title={toShow}
          className='mx-2'
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={'www.habouss.com'}
          title={params}
          separator=':: '
          className='mx-2'
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </Cards>
  )
}

export default ItemList
