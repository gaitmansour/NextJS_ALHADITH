import React, {useEffect, useState} from 'react';
import styles from './CarouselHome.module.css';
import {Backgrounds} from "../../assets"
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import _ from "lodash"
import {getCarousel, base_url, getSlider} from "../../endpoints"
import FetchAPI from "../../API";
import {Carousel} from "react-bootstrap"
import Loading from "../../components/_UI/Loading";
import SMLinks from "../../components/_UI/SMLinks";
import Image from 'next/image'

const CarouselHome = (props) => {

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
        <div className={`${styles.CarouselHome} ${styles.carouselIndicators} CarouselHome d-flex`}>
            <div
                className={`${styles.carouselControlBox} carousel-control-box ${styles.wpx100} wpx-100 d-flex flex-column justify-content-end py-5`}>
                <ol className="carousel-indicators"
                    style={{marginBottom: 200,marginRight:45}}>
                    <li data-target="#carouselExampleIndicators" data-slide-to="0"
                        className="active"/>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"/>
                </ol>
                <SMLinks className='smLinks'/>
            </div>
            <div className={`${styles.CarouselHome} carouselHome position-relative`}>
                <Carousel controls={false} indicators={true}>
                    {dataAPI?.map((item, index) => {
                        const toShow = item?.body?.substring(0, 251) + "..";
                        if (item.field_image.includes("src=")) {
                            var str = item.field_image.substr(item.field_image.lastIndexOf("src=")).split(' ')[0].slice(5)
                            var element2 = str.slice(0, -1);

                        }
                        let element = item.field_image.replace(str, base_url + str).replace(/height=\".*"/gm, '')
                        let image_filed = element.replace(/width=\".*"/gm, `className={${styles.imgCarousel} imgCarousel} style={{width:'100%'}} alt="First slide"`)
                        console.log("image*---------------------", element2)

                        return (
                            <Carousel.Item key={index.toString()} className={'carouselCustom'}>
                                <Image src={element2} className={styles.imgCarousel} loader={myLoader} alt={""}
                                       height={740} width={1400}/>


                                <Carousel.Caption className={`${styles.carouselCaption} carousel-caption d-md-block`}
                                                  style={{backgroundColor: 'white', opacity: 0.8}}>
                                    <p style={{fontSize: 12}}>{toShow}</p>
                                    <Link
                                        role="button"
                                        href={{
                                            pathname: "/article/" + item?.title,
                                            query: {from: 'CarouselHome', selectedItem: item?.term_node_tid}
                                        }}
                                        as={"/article/" + item?.title}
                                    >
                                        <a className={`${styles.btn} btn bg-success rounded-0 text-white d-flex align-items-center p-0 ${styles.carouselItem} itemCarousel`}><i
                                            className={`fas ${isRTL ? "fa-caret-right" : "fa-caret-left"} align-items-center d-flex align-self-stretch`}/>
                                            <h6 className="m-0 px-4">{more}</h6>
                                        </a>
                                    </Link>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}

                </Carousel>
                <div className={`${styles.bg_dashed}bg_dashed h-100 position-absolute w-100`}
                     style={{backgroundImage: `url(${Backgrounds.bg_dashed})`}}/>
                {/* <div className="bg_arabic_design_slide h-100 position-absolute w-100" style={{ backgroundImage: `url(${Backgrounds.bg_arabic_design_slide.default})`, opacity: .7 }} /> */}
            </div>
        </div>
    );
}

export default CarouselHome
