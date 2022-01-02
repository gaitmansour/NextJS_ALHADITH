import React, {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from 'next/link';
import _ from "lodash"
import {getResourcesData, base_url} from "../../endpoints"
import FetchAPI from "../../API";
import Loading from "../../components/_UI/Loading";
import Cards from "../../components/_UI/Cards";
import SectionTitle from "../../components/_UI/SectionTitle";
import Image from 'next/image'
import styles from './Ressources.module.css'
import {Logos} from "../../assets";
import $ from 'jquery'
const Resources = () => {

    let settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 771,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 495,
                settings: {
                    centerPadding: "10px",
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "35px",
                    className: "center",
                    centerMode: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 380,
                settings: {
                    centerPadding: "10px",
                    className: "center",
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const {t, i18n} = useTranslation('ressource');

    const [dataAPI, setDataAPI] = useState({})
    const getLanguage = i18n?.language === "fr" ? "fr" : "ar"
    const url = getResourcesData(getLanguage)

    const getData = async () => {
        FetchAPI(url).then(data => {
            if (data.success) {
                setDataAPI(data?.data)
            }
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const myLoader = ({src, width, quality}) => {
        return `${base_url}/${src}`;
    };

    const renderContent = () => {
        try {
            if (dataAPI?.data?.length <= 4) {
                settings.slidesToShow = dataAPI?.data?.length
            }
            if (_.isEmpty(dataAPI)) {
                return (
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <Loading/>
                    </div>
                )
            }

            return <div className={`${styles.content}  row my-3 mx-5 justify-content-evenly `}
                        style={{marginRight:50}}>
                <Slider {...settings} className="slide px-2">
                    {dataAPI?.data?.map((item, i) => {
                        const {title, body, field_icone, field_lien} = item?.attributes
                        console.log("title-----------------------", title)
                        const toShow = body?.processed?.substring(0, 80) + '.....';
                        $(document).ready(function () {
                            $('.links').contextmenu(function (event) {
                                localStorage.setItem(
                                    'routeState',
                                    JSON.stringify({
                                        fromNav: {},
                                        selectedItem: title,
                                        from: 'ressources',
                                    }),
                                );
                            });
                        });
                        return (
                            <Cards key={i.toString()}
                                   className={`mx-5 d-flex justify-content-center align-items-center flex-column `}

                            >
                                <div className={`${styles.boxImg}  m-auto`}>
                                    <Image
                                        loader={myLoader}
                                        src={dataAPI?.included[i]?.attributes?.uri?.url}
                                        width={100}
                                        height={100}
                                        alt="book"
                                        className={`${styles.img} img img-responsive`}/>
                                </div>
                                <h5 className={`${styles.title} my-4`}>{title}</h5>
                                <div className={`${styles.desc}`}
                                     dangerouslySetInnerHTML={{__html: body?.processed}}/>
                                <Link
                                    class={"links"}
                                    role="button"
                                    href={{
                                        pathname: field_lien[0]?.uri.slice(9) ==='/المصحف المحمدي' ? '/Almoshaf' : field_lien[0]?.uri.slice(9),
                                        query: {from: 'ressources', selectedItem: title}
                                    }}
                                    as={field_lien[0]?.uri.slice(9) ==='/المصحف المحمدي' ? '/المصحف المحمدي' : field_lien[0]?.uri.slice(9)}
                                >
                                    <a
                                        className={`${styles.action} d-flex justify-content-between ${styles.btn} btn align-items-center mb-2 text-white bg-success-light m-auto py-2 px-3 ${dataAPI?.data.length < 4 ? "flex-row-reverse" : "flex-row"} button`}
                                    >
                                        <i className="fas fa-long-arrow-alt-left text-white"/>
                                        <p className="m-0"
                                           style={{
                                            textAlign: 'justify !important',
                                            textJustify: 'inter-word !important'
                                        }}>{t('btnMore')}</p>
                                    </a>
                                </Link>
                            </Cards>
                        )
                    })}
                </Slider>
            </div>
        } catch (error) {
            console.log(`CATCH OurPartners ${error}`)
        }
    }

    return (
        <div className={`${styles.Resources} py-5 overflow-hidden`}>
            <SectionTitle title={t('title')}/>
            {renderContent()}
        </div>
    )
}

export default Resources;
