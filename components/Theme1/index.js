import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Theme1.module.css'
import _ from 'lodash'
import { getNewSectionsData } from '../../helpers'
import Loading from '../_UI/Loading'
import Cards from '../_UI/Cards'
import SectionTitle from '../_UI/SectionTitle'

const Theme1 = (props) => {
  const [dataAPI, setDataAPI] = useState({})

  useEffect(() => {
    if (props.title) {
      getNewSectionsData(props.title).then((response) => {
        setDataAPI(response)
      })
    }
  }, [])

  const renderContent = () => {
    try {
      if (_.isEmpty(dataAPI)) {
        return (
          <div className='d-flex align-items-center justify-content-center py-5'>
            <Loading />
          </div>
        )
      }

      return (
        <div className='row my-4'>
          {dataAPI?.data?.map((item, i) => {
            const {
              title,
              body,
              field_code_couleur_accueil,
              field_lien_accueil,
            } = item?.attributes

            return (
              <div key={i.toString()} className='col-md-3'>
                <Cards className='CardCommanderieCroyants m-auto d-flex justify-content-right align-items-right flex-column'>
                  {/* <img className="img-responsive my-1" src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`} alt={title} /> */}
                  <h5
                    className='title mt-3'
                    style={{
                      color: field_code_couleur_accueil
                        ? `#${field_code_couleur_accueil}`
                        : '#129d59',
                    }}
                  >
                    {title}
                  </h5>
                  {/* <p className="description pt-3 pb-2">{item.description}</p> */}
                  {
                    <div
                      className='description pt-3 pb-2'
                      dangerouslySetInnerHTML={{ __html: body?.processed }}
                    />
                  }
                  <Link
                    role='button'
                    //to={field_lien[0]?.uri.slice(9)}
                    href={{
                      pathname: field_lien_accueil
                        ? field_lien_accueil[0]?.uri.slice(9)
                        : '',
                      search: '',
                      hash: '',
                      query: { from: 'Croyants', selectedItem: title },
                    }}
                  >
                    <a
                      className='shadow-sm d-flex justify-content-between btn align-items-center mb-2 text-white'
                      style={{
                        background: field_code_couleur_accueil
                          ? `#${field_code_couleur_accueil}`
                          : '#129d59',
                      }}
                    >
                      <i className='fas fa-long-arrow-alt-left text-white' />
                      <p className='m-0'>{'لمعرفة المزيد'}</p>
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
    <div className='container CommanderieCroyants'>
      <SectionTitle title={props.title} />
      {renderContent()}
    </div>
  )
}

export default Theme1
