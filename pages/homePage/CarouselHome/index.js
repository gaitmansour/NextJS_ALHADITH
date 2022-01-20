import React, {useEffect, useState} from 'react';
import styles from './CarouselHome.module.css';
import {Backgrounds} from "../../../assets"
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import _ from "lodash"
import {getCarousel, base_url, getSlider} from "../../../endpoints"
import FetchAPI from "../../../API";
import {Carousel} from "react-bootstrap"
import Loading from "../../../components/_UI/Loading";
import SMLinks from "../../../components/_UI/SMLinks";
import Image from 'next/image'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CarouselHome = (props) => {
    let settings = {
        dotsClass: "vertical-dots",
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 771,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dotsClass: 'vertical-dots',
                    dots: true,
                },
            },
            {
                breakpoint: 495,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dotsClass: 'vertical-dots',
                    dots: true,
                },
            },
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dotsClass: 'vertical-dots',
                    dots: true,
                    // centerMode: true,
                    // centerPadding: '60px',
                    // className: 'center',
                },
            },
            {
                breakpoint: 380,
                settings: {
                    //   centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dotsClass: 'vertical-dots',
                    dots: true,
                },
            },
        ],
    }

    const [dataAPI, setDataAPI] = useState([])
    const {t, i18n} = useTranslation("home");
    const isRTL = i18n?.language === "ar"
    const getLanguage = isRTL ? "ar" : "fr"
    const more = "اقرأ المزيد"
    const url = getCarousel()
    const urlSlider = getSlider()

    const getDataSliderHome = () => {
        FetchAPI(urlSlider).then(data => {
            // console.log("data CarouselHome ==> ", data)
            if (data.success) {
                setDataAPI(data?.data)
            }
        })
    }
    useEffect(() => {
        getDataSliderHome()
    }, [])
    if (_.isEmpty(dataAPI)) {
        return (
            <div className="d-flex align-items-center justify-content-center py-5">
                <Loading/>
            </div>
        )
    }

    const myLoader = ({src, width, quality}) => {
        return `${base_url}/${src}`;
    };

    return (
        <div
            className={`${styles.CarouselHome} ${styles.carouselIndicators} CarouselHome d-flex`}
        >
            <div
                className={`${styles.carouselControlBox} position-relative carousel-control-box ${styles.wpx100} wpx-100 d-flex flex-column justify-content-end py-5`}
            >
                <SMLinks className='smLinks'/>
            </div>
                <Slider {...settings} className={`w-100 slide`}>
                    {dataAPI?.map((item, index) => {
                        const toShow = item?.body?.substring(0, 251) + '..'
                        if (item.field_image.includes('src=')) {
                            var str = item.field_image
                                .substr(item.field_image.lastIndexOf('src='))
                                .split(' ')[0]
                                .slice(5)
                            var element2 = str.slice(0, -1)
                        }

                        return (
                            <Carousel.Item key={index.toString()} className={`${styles.ImgSlide} w-100`}>
                                <Image
                                    src={element2}
                                    loader={myLoader}
                                    alt={''}
                                    height={1850}
                                    width={5000}
                                />


                                <div className={`${styles.carouselCaption} carousel-caption d-md-block`}
                                     style={{
                                         backgroundColor: 'white',
                                         opacity: 0.8,
                                         marginLeft: 150
                                     }}>
                                    <p style={{fontSize: 12}}>{toShow}</p>
                                    <Link
                                        role="button"
                                        href={{
                                            pathname: "/article/" + item?.title,
                                            query: {from: 'CarouselHome', selectedItem: item?.term_node_tid}
                                        }}
                                        as={"/article/" + item?.title}
                                    >
                                        <a role={'button'} className={`${styles.btn} btn bg-success rounded-0 text-white d-flex align-items-center p-0 ${styles.carouselItem} itemCarousel`}><i
                                            className={`fas ${isRTL ? "fa-caret-right" : "fa-caret-left"} align-items-center d-flex align-self-stretch`}/>
                                            <h6 className="m-0 px-4">{more}</h6>
                                        </a>
                                    </Link>
                                </div>
                            </Carousel.Item>
                        )
                    })}

                </Slider>

            <div className={`${styles.bg_dashed}bg_dashed h-100 position-absolute w-100`}
                 style={{backgroundImage: `url(${Backgrounds.bg_dashed})`}}/>
            {/* <div className="bg_arabic_design_slide h-100 position-absolute w-100" style={{ backgroundImage: `url(${Backgrounds.bg_arabic_design_slide.default})`, opacity: .7 }} /> */
            }
        </div>
    )
        ;
}

export default CarouselHome
