import Widget from '../Widget'
import styles from './ListAhadith.module.css'
import Link from 'next/link'

const ListAhadith = (props) => {
  const className = props?.className ? props.className : ''

  return (
    <Widget>
      <div className={`${styles.SimpleList} ${className}`}>
        {props.data &&
          props.data?.length > 0 &&
          props.data.map((item, i) => {
            return (
              <Link
                as={'/search'}
                href={{
                  pathname: '/search',
                  search: '',
                  hash: '',
                  query: {
                    word: '',
                    topic: item,
                    content: 'موضوع',
                    from: 'home',
                  },
                }}
                passHref={true}
                key={i.toString()}
                style={{ borderTop: i === 0 ? '1px solid #D8D8D8' : '' }}
              >
                <a
                  className={`${styles.item} d-flex align-items-center py-3 px-1`}
                >
                  <p
                    className='flex-fill m-0'
                    onClick={() => console.log(item?.label)}
                  >
                    {item?.label}
                  </p>
                  {props?.image && (
                    <img src={item?.image || props?.image} alt='' />
                  )}
                  {!props?.hideIcon && (
                    <i className='fas fa-chevron-left mx-2' />
                  )}
                </a>
              </Link>
            )
          })}
      </div>
    </Widget>
  )
}

export default ListAhadith
