import React from 'react'
import Link from 'next/link'
import styles from './CommanderieCroyants.module.css'
import _ from 'lodash'
import { getMenuByName } from '../../../endpoints'
import FetchAPI from '../../../API'
import Loading from '../../../components/_UI/Loading'
import Cards from '../../../components/_UI/Cards'
import SectionTitle from '../../../components/_UI/SectionTitle'
import { getAllCommanderie } from '../../../lib/home/commanderieCroyants'

const CommanderieCroyants = (props) => {
  const getDataMenu = async (x) => {
    FetchAPI(getMenuByName(x)).then((data) => {
      if (data.success) {
        localStorage.setItem(
          'categorieTitle',
          JSON.stringify({
            tidChild: data?.data[0]?.tid,
            parent: data?.data[0]?.parent_target_id_1,
            child: data?.data[0]?.name_1,
            contenuArticle:
              data?.data[0]?.field_contenu_default !== ''
                ? data?.data[0]?.field_contenu_default
                : data?.data[0]?.name_1,
          })
        )
        localStorage.setItem(
          'tid',
          JSON.stringify(data?.data[0]?.parent_target_id)
        )
      }
    })
  }

  const renderContent = () => {
    try {
      if (_.isEmpty(props.dataAPI)) {
        return (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        )
      }
      return (
        <div className='row my-4'>
          {props.dataAPI &&
            props.dataAPI?.data?.map((item, i) => {
              const { title, body, field_code_couleur, field_lien } =
                item?.attributes

              return (
                <div
                  key={i}
                  className={`${styles.groupCard} col col-12 col-lg-3 col-md-6 col-sm-1`}
                >
                  <Cards
                    key={i.toString()}
                    className={`${styles.CardCommanderieCroyants}  m-auto d-flex justify-content-right align-items-right flex-column`}
                    style={{
                      justifyContent: 'flex-end',
                      flex: 1,
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}
                  >
                    <Link
                      role='button'
                      href={{
                        pathname: field_lien[0].uri.includes('internal:')
                          ? field_lien[0].uri
                              .replace('internal:', '')
                              .split(' ')
                              .join('-')
                          : field_lien[0].uri.split(' ').join('-'),
                        search: '',
                        hash: '',
                        query: {
                          fromNav: {},
                          title: title,
                          selectedItem: title,
                          from: 'Croyants',
                          contenuArticle: '',
                        },
                      }}
                      as={
                        field_lien[0].uri.includes('internal:')
                          ? field_lien[0].uri
                              .replace('internal:', '')
                              .split(' ')
                              .join('-')
                          : field_lien[0].uri.split(' ').join('-')
                      }
                    >
                      <a
                        className='text-decoration-none text-black'
                        role='button'
                        onClick={() => getDataMenu(title)}
                      >
                        <h5
                          className={`${styles.title}  mt-3`}
                          style={{ color: `#${field_code_couleur}` }}
                        >
                          {title}
                        </h5>
                        {body?.processed && (
                          <div
                            className={`${styles.description} pt-3 pb-2`}
                            dangerouslySetInnerHTML={{
                              __html: body?.processed,
                            }}
                          />
                        )}

                        <button
                          className={`${styles.shadowSm} linksCroyants  d-flex justify-content-between ${styles.btn} btn align-items-center mb-2 text-white`}
                          style={{ background: `#${field_code_couleur}` }}
                          onClick={() => getDataMenu(title)}
                        >
                          <i
                            className='fas fa-long-arrow-alt-left text-white'
                            style={{
                              marginRight: '1em',
                              transform: 'rotate(0deg )',
                            }}
                          />
                          <p
                            className='m-0'
                            style={{ textAlign: 'justify !important' }}
                          >
                            {'لمعرفة المزيد'}
                          </p>
                        </button>
                      </a>
                    </Link>
                  </Cards>
                </div>
              )
            })}
        </div>
      )
    } catch (error) {
      console.log(`CATCH CommanderieCroyants ${error}`)
    }
  }

  return (
    <div className={`container ${styles.CommanderieCroyants} `}>
      <SectionTitle title={'عناية أمير المؤمنين'} />
      {renderContent()}
    </div>
  )
}

export const getServerSideProps = async () => {
  const dataAPI = await getAllCommanderie()
  return {
    props: JSON.parse(JSON.stringify({ dataAPI })),
  }
}
export default CommanderieCroyants
