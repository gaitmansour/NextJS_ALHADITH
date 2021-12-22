import React, {useEffect, useState} from 'react';
import {Backgrounds} from '../../assets';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import _ from 'lodash';
import {getTopic} from '../../endpoints';
import FetchAPI from '../../API';
import $ from "jquery";
import styles from "./Alahadiths.module.css"
import Loading from "../../components/_UI/Loading";

const HadithTab = ({CodeTopic, Content}) => {
    const url = getTopic();
    const [dataAPI, setDataAPI] = useState([]);
    // const {dataAPI} = props
    useEffect(() => {
        FetchAPI(`${url}/${CodeTopic}`).then(data => {
            //  console.log(`${url}/${CodeTopic}`)
            if (data.success) {
                setDataAPI(data?.data);
            }
        });
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 7,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    //slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    //slidesToScroll: 2,
                    initialSlide: 6,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    //slidesToScroll: 2
                },
            },
            {
                breakpoint: 320,
                settings: {
                    centerPadding: '10px',
                    slidesToShow: 1,
                    //slidesToScroll: 1
                },
            },
        ],
    };
    const renderData = () => {
        try {
            if (_.isEmpty(dataAPI)) {
                return (
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <Loading/>
                    </div>
                );
            } else {
                const dataList = dataAPI?.map((item, i) => {

                    $(document).ready(function () {
                        $(`.${i}`).contextmenu(function (event) {
                            localStorage.setItem('searchData', JSON.stringify({
                                pathname: '/search',
                                search: '',
                                hash: '',
                                state: {
                                    word: '',
                                    topic: item,
                                    content: Content,
                                    codeDegree: CodeTopic,
                                    from: 'home',
                                },
                            }));
                        });
                    });

                    return (
                        <Link
                            key={i.toString()}
                            className={`${i} ${styles["item-link"]}item-link d-flex flex-column  btn align-self-stretch my-5 px-0 p-5 hadithItem`}
                            as={'/search'}

                            href={{
                                pathname: '/search',
                                search: '',
                                hash: '',
                                query: {
                                    word: '',
                                    topic: item,
                                    content: Content,
                                    codeDegree: CodeTopic,
                                    from: 'home',
                                },
                            }}>
                            <a className={`${i} item-link d-flex flex-column  btn align-self-stretch my-5 px-0 p-5 hadithItem`}
                            >
                                <div
                                    style={{justifyContent:'center',alignItems:'center'}}
                                    className={`${
                                        Content === 'صحيح'
                                            ? styles.icon1
                                            : Content === 'ضعيف'
                                            ? styles.icon2
                                            : styles.icon3
                                        } text-center box-logo m-auto d-flex justify-content-center align-items-center`}>
                                    <p className="text-center my-auto text-light font-weight-bold"
                                       style={{textAlign:'justify',alignSelf:'center',fontSize:14}}>
                                        {item?.label}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    );
                });
                return dataList;
            }
        } catch (error) {
            console.log(`CATCH Alhadiths ${error}`);
        }
    };
    return (
        <>
            <div className={`${styles.Alhadiths} Alhadiths overflow-hidden position-relative`}>
                <div className="bg-blue-100 ">
                    <div
                        className="bg-arabic-design h-100 w-100"
                        style={{
                            backgroundImage: `url(${Backgrounds.bg_arabic_design})`,
                            opacity: 0.7,
                        }}
                    />
                    <Slider {...settings} className="slide mb-4">
                        {renderData()}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default HadithTab;
