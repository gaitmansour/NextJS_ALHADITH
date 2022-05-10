import Widget from '../Widget'
import styles from './SimpleList.module.css'
import Link from 'next/link'
import $ from 'jquery'

const SimpleList = (props) => {
  const className = props?.className ? props.className : ''

  return (
    <Widget>
      <div className={`${styles.SimpleList} SimpleList ${className}`}>
        {props.data &&
          props.data?.length > 0 &&
          props.data.map((item, i) => {
            // console.log('this data to show ------>', item)

            if (item?.title == 'المصحف المحمدي') {
              var path1 = { path: '/Almoshaf', as: '/المصحف-المحمدي' }
            } else if (item?.parentLabel == 'التلفزة الرقمية') {
              var path1 = {
                path: `/media/${item?.title}`,
                as: `/media/${item?.title}`,
              }
            } else if (
              item?.parentID == 'التواصل' &&
              item?.title == 'تواصل معنا'
            ) {
              var path1 = {
                path: `/ContactUs`,
                as: `/article/${item?.title}`,
              }
            } else {
              var path1 = {
                path: `/article/${item?.title}`,
                as: `/article/${item?.title}`,
              }
            }
            /* $(document).ready(function () {
                             $('.categorieTitle').contextmenu(function (event) {
                                 console.log('item.title')
                                 console.log(item?.title)
                                 localStorage.setItem(
                                     'categorieTitle',
                                     JSON.stringify({
                                         parent: item?.parentID,
                                         child: item?.title
                                     })
                                 )
                             })
                         })*/

            return (
              <Link
                href={{
                  pathname:
                    path1.path === 'ContactUs'
                      ? path1.path
                      : path1.path?.split(' ').join('-'),
                  query: {
                    fromNav: props.data,
                    selectedItem: item?.title,
                    contenuArticle:
                      item?.field_contenu_default !== ''
                        ? item?.field_contenu_default
                        : item?.title,
                  },
                }}
                as={
                  path1.path === 'ContactUs'
                    ? path1.path
                    : path1.as?.split(' ').join('-')
                }
                key={i.toString()}
                style={{ borderTop: i === 0 ? '1px solid #D8D8D8' : '' }}
              >
                <a
                  className={`${styles.item} categorieTitle item d-flex align-items-center py-3 px-1`}
                  onClick={() => {
                    //console.log('items--------------------selected')
                    // console.log(item)
                    localStorage.setItem(
                      'categorieTitle',
                      JSON.stringify({
                        parent: item.parentID,
                        child: item?.title,
                        contenuArticle:
                          item?.field_contenu_default !== ''
                            ? item?.field_contenu_default
                            : item?.title,
                      })
                    )
                  }}
                >
                  <p
                    className='flex-fill m-0'
                    onClick={() =>
                      localStorage.setItem(
                        'categorieTitle',
                        JSON.stringify({
                          parent: item?.parentID,
                          child: item?.title,
                        })
                      )
                    }
                  >
                    {item?.title}
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

export default SimpleList
