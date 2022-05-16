import React from 'react'
import Image from 'next/image'
import { Logos } from '../../../assets'
import styles from './News.module.css'
import { base_url } from '../../../endpoints'

const NewsCard = (props) => {
  const { title, description, image, category_news } = props
  let strippedString = title?.replace(/(<([^>]+)>)/gi, '')
  //   console.log('title', strippedString)

  const myLoader = ({ src, width, quality }) => {
    return `${base_url}/${src}`
  }
  return (
    <div className={`${styles.CardNews} card m-2`}>
      <div class={styles.ribbon}>
        <span>{category_news}</span>
      </div>
      {image?.trim() ? (
        <Image
          className='card-img-top p-2 pt-3'
          objectFit='cover'
          width={16}
          height={9}
          layout='responsive'
          quality={65}
          loader={myLoader}
          src={image}
          alt='Card image cap'
        />
      ) : (
        <Image
          className={`card-img-top  p-2 pt-3`}
          src={Logos.logo_hadith_m6}
          objectFit='cover'
          width={16}
          height={9}
          layout='responsive'
          quality={65}
          alt='logo-Al-hadith-Mohammed-VI'
          title='logo Al hadith Mohammed VI'
        />
      )}

      <div className={`${styles.cardBody} card-body`}>
        <h5 className='card-title'>{strippedString}</h5>
        <p className='card-text'>{description}</p>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-md mt-3' type='submit'>
            {'لمعرفة المزيد'}
            <i
              className='fas fa-long-arrow-alt-left'
              style={{
                marginRight: '1em',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
