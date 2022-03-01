import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import styles from './CommanderieCroyants.module.css'
import _ from 'lodash'
import {getCommanderieCroyantsData, base_url, getMenuByName} from '../../../endpoints'
import FetchAPI from '../../../API'
import Loading from '../../../components/_UI/Loading'
import Cards from '../../../components/_UI/Cards'
import SectionTitle from '../../../components/_UI/SectionTitle'
import React, {useEffect, useState} from 'react'
import $ from 'jquery'

const CommanderieCroyants = () => {
    const {t, i18n} = useTranslation('CommanderieCroyants')
    const [dataAPI, setDataAPI] = useState({})
    const getLanguage = i18n?.language === 'ar' ? 'ar' : 'fr'
    const url = getCommanderieCroyantsData('ar', 'عناية أمير المؤمنين')
    const getDataMenu = async (x) => {
        console.log('xxxxxxxxxxxxxxxxxxxxxx', x)
        FetchAPI(getMenuByName(x)).then((data) => {
            if (data.success) {
                console.log('dataSuccess')
                console.log(data?.data[0])
                localStorage.setItem(
                    'categorieTitle',
                    JSON.stringify({
                        tidChild:data?.data[0]?.tid,
                        parent: data?.data[0]?.parent_target_id_1,
                        child: data?.data[0]?.name_1,
                        contenuArticle: data?.data[0]?.field_contenu_default !== ''
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
    const getData = async () => {
        // console.log("fi khitab data  ==> ", data)
        FetchAPI(url).then((data) => {
            console.log('fi khitab data  ==> ', data)
            if (data.success) {
                setDataAPI(data?.data)
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const renderContent = () => {
        try {
            if (_.isEmpty(dataAPI)) {
                return (
                    <div className='d-flex align-items-center justify-content-center py-5'>
                        <Loading/>
                    </div>
                )
            }
            return (
                <div className='row my-4'>
                    {dataAPI?.data?.map((item, i) => {
                        const {title, body, field_code_couleur, field_lien} =
                            item?.attributes
                        console.log(dataAPI?.data)
                        $(document).ready(function () {
                            $('.linksCroyants').contextmenu(function (event) {
                                localStorage.setItem(
                                    'routeState',
                                    JSON.stringify({
                                        fromNav: {},
                                        selectedItem: title,
                                        title: title,
                                        from: 'Croyants',
                                        contenuArticle: ""
                                    })
                                )
                            })
                        })

                        $(document).ready(function () {
                            $('.linksCroyants').bind('click', function (e) {
                                //console.log("hello ctrl")
                                localStorage.setItem(
                                    'routeState',
                                    JSON.stringify({
                                        pathname: field_lien[0]?.uri.slice(9),
                                        search: '',
                                        hash: '',
                                        query: {
                                            fromNav: {},
                                            title: title,
                                            selectedItem: title,
                                            from: 'Croyants',
                                            contenuArticle: ""
                                        },
                                    })
                                )
                            })
                        })
                        const toShow = body?.processed?.substring(0, 50) + '...'

                        return (
                            <div
                                key={i.toString()}
                                className={`${styles.groupCard} col-md-3`}
                            >
                                <Cards
                                    className={`${styles.CardCommanderieCroyants}  m-auto d-flex justify-content-right align-items-right flex-column`}
                                    style={{
                                        justifyContent: 'flex-end',
                                        flex: 1,
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <h5
                                        className={`${styles.title}  mt-3`}
                                        style={{color: `#${field_code_couleur}`}}
                                    >
                                        {title}
                                    </h5>
                                    {
                                        <div
                                            className={`${styles.description} pt-3 pb-2`}
                                            dangerouslySetInnerHTML={{__html: body?.processed}}
                                        />
                                    }
                                    <Link
                                        role='button'
                                        href={{
                                            pathname: field_lien[0]?.uri.slice(9),
                                            search: '',
                                            hash: '',
                                            query: {
                                                fromNav: {},
                                                title: title,
                                                selectedItem: title,
                                                from: 'Croyants',
                                                contenuArticle: ""
                                            },
                                        }}
                                        as={field_lien[0]?.uri.slice(9)}
                                    >
                                        <a
                                            className={`${styles.shadowSm} linksCroyants  d-flex justify-content-between ${styles.btn} btn align-items-center mb-2 text-white`}
                                            style={{background: `#${field_code_couleur}`}}
                                            onClick={() => getDataMenu(title)

                                            }
                                        >
                                            < i
                                                className='fas fa-long-arrow-alt-left text-white'
                                                style={{
                                                    marginRight: '1em',
                                                    transform: 'rotate(0deg )',
                                                }}
                                            />
                                            <p
                                                className='m-0'
                                                style={{textAlign: 'justify !important'}}
                                            >
                                                {'لمعرفة المزيد'}
                                            </p>
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
            <SectionTitle title={'عناية أمير المؤمنين'}/>
            {renderContent()}
        </div>
    )
}

export default CommanderieCroyants
