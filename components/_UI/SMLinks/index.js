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
        href='https://www.facebook.com/%D9%85%D9%86%D8%B5%D8%A9-%D9%85%D8%AD%D9%85%D8%AF-%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3-%D9%84%D9%84%D8%AD%D8%AF%D9%8A%D8%AB-105512518570960'
        alt='facebook'
        target='_blank'
      >
        <i className='fab fa-facebook-f mx-2' id='fb'></i>
      </a>
      <a
        href='https://www.youtube.com/channel/UCOjv6HfVD2oCaJ4FGqXIEkQ'
        alt='youtube'
        target='_blank'
      >
        <i className='fab fa-youtube mx-2' id='yt'></i>
      </a>
      <a
        href='https://www.instagram.com/minasathadithm6/'
        alt='instagram'
        target='_blank'
      >
        <i className='fab fa-instagram mx-2' id='ig'></i>
      </a>
      <a href='https://twitter.com/MinasatH ' alt='twitter' target='_blank'>
        <i className='fab fa-twitter mx-2' id='tw'></i>
      </a>
      <a
        href='https://www.linkedin.com/company/minasat-hadith/?viewAsMember=true'
        alt='linkedin'
        target='_blank'
      >
        <i className='fab fa-linkedin-in mx-2' id='in' target='_blank'></i>
      </a>
      <a
        href='https://www.tiktok.com/@minasathadithm6?lang=fr'
        alt='tiktok'
        target='_blank'
      >
        <i className='fab fa-tiktok mx-2' id='tik' target='_blank'></i>
      </a>
      <a href='/' alt='whatsapp' target='_blank'>
        <i class='fab fa-whatsapp mx-2' id='tik' target='_blank'></i>
      </a>
    </div>
  )
}

export default SMLinks
