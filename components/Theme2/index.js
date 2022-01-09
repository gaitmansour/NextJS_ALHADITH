import './Theme2.module.css';
import React, {useEffect, useState} from 'react';
import useTranslation from "next-translate/useTranslation";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Link from 'next/link';
import _ from 'lodash';
import {base_url} from '../../endpoints';
import {getNewSectionsData} from '../../helpers';
import Loading from "../_UI/Loading";
import Cards from "../_UI/Cards";
import styles from "./Theme2.module.css";
import Image from "next/image";
import SectionTitle from "../_UI/SectionTitle";

const Theme2 = props => {
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
                    dots: true,
                },
            },
            {
                breakpoint: 771,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 495,
                settings: {
                    centerPadding: '10px',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '35px',
                    className: 'center',
                    centerMode: true,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 380,
                settings: {
                    centerPadding: '10px',
                    className: 'center',
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const {t, i18n} = useTranslation('ressource');

    const [dataAPI, setDataAPI] = useState({});
    const getLanguage = i18n?.language === 'ar' ? 'ar' : 'fr';

    useEffect(() => {
        if (props.title) {
            console.log('props.title', props.title);
            getNewSectionsData(props.title).then(response => {
                setDataAPI(response);
            });
        }
    }, []);

    const renderContent = () => {
        try {
            if (dataAPI?.data?.length <= 4) {
                settings.slidesToShow = dataAPI?.data?.length;
            }
            if (_.isEmpty(dataAPI)) {
                return (
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <Loading/>
                    </div>
                );
            }
            const myLoader = ({src, width, quality}) => {
                return `${base_url}/${src}`;
            };
            return (
                <div className="content container row col-4 my-3 mx-0">
                    <Slider {...settings} className="slide px-2">
                        {dataAPI?.data?.map((item, i) => {
                            const {title, body, field_lien_accueil} = item?.attributes;
                            const toShow = body?.processed?.substring(0, 180) + '..';
                            return (
                                <Cards
                                    key={i.toString()}
                                    className="item-card me-4 ms-1 text-center mt-4 mb-2 child">
                                    <div className="box-img m-auto">
                                        <Image
                                            loader={myLoader}
                                            src={dataAPI?.included[i]?.attributes?.uri?.url}
                                            width={100}
                                            height={100}
                                            alt="book"
                                            className={`img img-responsive`}/>
                                    </div>
                                    <h5 className="title my-4">{title}</h5>
                                    {
                                        <div
                                            className="desc"
                                            dangerouslySetInnerHTML={{__html: toShow}}
                                        />
                                    }
                                    <Link

                                        role="button"
                                        // to={field_lien[0]?.uri.slice(9)}
                                        href={{
                                            pathname: field_lien_accueil
                                                ? field_lien_accueil[0]?.uri.slice(9)
                                                : '',
                                            search: '',
                                            hash: '',
                                            query: {from: 'ressources', selectedItem: title},
                                        }}>
                                        {/* <a className={`action d-flex justify-content-between btn align-items-center mb-2 text-white bg-success-light m-auto py-2 px-3 ${ dataAPI?.data.length <4 ? "flex-row-reverse" :"flex-row"}`} href={`${field_lien[0]?.uri}`} > */}
                                        <a className={`action d-flex justify-content-between btn align-items-center mb-2 text-white bg-success-light m-auto py-2 px-3 ${
                                            dataAPI?.data.length < 4 ? 'flex-row-reverse' : 'flex-row'
                                        } button`}><i className="fas fa-long-arrow-alt-left text-white"/>
                                            <p className="m-0">{t('btnMore')}</p></a>
                                        {/* </a> */}
                                    </Link>
                                </Cards>
                            );
                        })}
                    </Slider>
                </div>
            );
        } catch (error) {
            console.log(`CATCH Theme2 ${error}`);
        }
    };

    return (
        <div className="Resources py-5 overflow-hidden">
            <SectionTitle title={props.title}/>
            {renderContent()}
        </div>
    );
};

export default Theme2;
