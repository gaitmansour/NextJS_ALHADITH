import styles from './SMLinks.module.css'

const SMLinks = (props) => {
  return (
    <div
      className={`${
        styles.SMLinks
      } SMLinks d-flex align-items-center justify-content-center ${
        props?.row ? 'flex-row' : 'flex-column'
      } ${props?.className ? props.className : ''}`}
    >
      <a
        // href='https://www.facebook.com/%D9%85%D9%86%D8%B5%D8%A9-%D9%85%D8%AD%D9%85%D8%AF-%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3-%D9%84%D9%84%D8%AD%D8%AF%D9%8A%D8%AB-105512518570960'
        href='https://www.facebook.com/Hadithm6/'
        target='_blank'
        aria-label='facebook'
      >
        <i className='fab fa-facebook-f' id='fb'></i>
      </a>
      <a
        // href='https://www.youtube.com/channel/UCOjv6HfVD2oCaJ4FGqXIEkQ'
        href='https://www.youtube.com/channel/UCI2lj4KvJZK4gbAy8vG1HOA'
        aria-label='youtube'
        target='_blank'
      >
        <i className='fab fa-youtube' id='yt'></i>
      </a>
      <a
        // href='https://www.instagram.com/minasathadithm6/'
        href='https://www.instagram.com/hadithm6/'
        aria-label='instagram'
        target='_blank'
      >
        <i className='fab fa-instagram' id='ig'></i>
      </a>
      <a
        // href='https://twitter.com/MinasatH '
        href='https://twitter.com/Hadithm6'
        aria-label='twitter'
        target='_blank'
      >
        <i className='fab fa-twitter' id='tw'></i>
      </a>
      <a
        // href='https://www.linkedin.com/company/minasat-hadith/?viewAsMember=true'
        href='https://www.linkedin.com/company/%D9%85%D9%86%D8%B5%D8%A9-%D9%85%D8%AD%D9%85%D8%AF-%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3-%D9%84%D9%84%D8%AD%D8%AF%D9%8A%D8%AB-%D8%A7%D9%84%D9%86%D8%A8%D9%88%D9%8A-%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D9%81/about/'
        aria-label='linkedin'
        target='_blank'
      >
        <i className='fab fa-linkedin-in' id='in' target='_blank'></i>
      </a>
      <a
        // href='https://www.tiktok.com/@minasathadithm6?lang=fr'
        href='https://www.tiktok.com/@hadithm6.ma'
        aria-label='tiktok'
        target='_blank'
      >
        <i className='fab fa-tiktok' id='tik' target='_blank'></i>
      </a>
      {/* <a href='/' aria-label='whatsapp' target='_blank'>
        <i class='fab fa-whatsapp' id='wp' target='_blank'></i>
      </a> */}
    </div>
  )
}

export default SMLinks
