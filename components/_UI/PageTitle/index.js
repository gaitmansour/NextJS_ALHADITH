import styles from './PageTitle.module.css'

const PageTitle = (props) => {
  const className = props?.className ? props.className : ''
  return (
    <div
      className={`${styles.PageTitle} PageTitle p-4 ${className}`}
      // style={{
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'space-between',
      // }}
    >
      <div>
        <h1
          className={`${styles.title} title m-0`}
          style={{
            color: '#129D59',
            fontWeight: 700,
          }}
        >
          {props?.title}
        </h1>
      </div>
      {/*{props.created && (
        <div
          className={`${styles.dateCreat} w-25`}
          style={{ alignItems: 'center', marginTop: 25 }}
        >
          <p
            className='h-full'
            style={{ alignSelf: 'center', color: '#A1A8AE' }}
          >
            <i className='fa fa-calendar mx-2' />
            {props.dateArticle}
          </p>
        </div>
      )}*/}
    </div>
  )
}

export default PageTitle
