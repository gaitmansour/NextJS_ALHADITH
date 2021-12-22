import React, {useEffect, useState} from "react";
import { TemplateArticle, Body, SimpleListMedia, SearchInput, PageTitleSecond, SliderVideoList, SliderList,Loading ,ScrollButton} from "../../shared/components"
import { useTranslation } from 'react-i18next';
import photo from "./photo.png";
import _ from "lodash"
import $ from 'jquery';
import Recaptcha from "react-recaptcha";
import "./media.module.css";
import VideosList from "./VideosList";
import {base_url, getArticleById, getMenuByName, getSideArticle,getVideo} from "../../shared/endpoints"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FetchAPI from "../home/API";
import {useLocation} from "react-router-dom";
import ReactPlayer from 'react-player'


const Media = (props) => {
    const {state} = useLocation();
    const title = props?.match?.params?.title
    const [start, setStart] =  useState(false)
    const [dataAPI,setDataAPI] = useState({})
    const [dataMenu,setdataMenu] = useState({})
    const [dataSlider,setdataSlider] = useState({})
    const [dataSide,setDataSide] = useState({})

    const { t } = useTranslation();

    const url = getVideo(title)
    const urlMenu = getMenuByName(title)
    const settings = {
        infinite: true,
        slidesToShow: 2,
        rows:2,
        arrows: true,
        responsive: [
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
              }
            },
        ]
    };

    const getData = async () => {
        FetchAPI(url).then(data=>{
            if (data.success) {
                setDataAPI(data?.data)
            }
        })
    }

    const getDataSlider = async (name,tid,parent_target) => {
        const urlSlider =getSideArticle(name,tid,parent_target)
        FetchAPI(urlSlider).then(data=>{
            if (data.success) {
                setdataSlider(data?.data)
            }
        })
    }
    const getDataMenu = async () => {
        FetchAPI(urlMenu).then(data=>{
            if (data.success) {
                setdataMenu(data?.data[0])
                getDataSlider(data?.data[0]?.name_1,data?.data[0]?.tid,data?.data[0]?.parent_target_id_1)

            }
        })
    }

    const handleSideData=(location)=>{
        const data=location?.state?.fromNav;
        setDataSide(data)

    }
    useEffect(() => {
        if(title){
            getDataMenu()
            getData();
            handleSideData(props.location);
        }
    }, [title,props.location])


    const data = [
        {
            "title": "الرئيسية",
            "path": "",
        },
        {
            "title":"البرامج الإعلامية",
            "path": "",
        },
        {
            "title":title,
            "path": 'article/'+title,
        },
    ]
    // console.log("-----datside----,",dataSide)
        const sideData11 = [
        {
            "title": "برامج على الشبكات الاجتماعية",
            "path": "/media/برامج على الشبكات الاجتماعية",
            "parentLabel" :  'البرامج الإعلامية'
        },
        {
            "title":"برامج تلفزية",
            "path": "/media/برامج تلفزية",
            "parentLabel" :  'البرامج الإعلامية'
        },
        {
            "title":"برامج اذاعية",
            "path": "media/برامج اذاعية",
            "parentLabel" :  'البرامج الإعلامية'
        },
        ,
        {
            "title":"الدروس الحسنية",
            "path": "/media/الدروس الحسنية",
            "parentLabel" :  'البرامج الإعلامية'
        },
        {
            "title":"الدروس الحديثية",
            "path": "/media/برامج تلفزية",
            "parentLabel" :  'البرامج الإعلامية'
        },
    ]

    // const dataSlideList = [
    //     { title: "اﻟﺴﺎدس ﻣﺮﻓﻮﻗﺎ ﺑﺎﻟﺄﻣﻴﺮ ﻣﻮﻟﺎي رﺷﻴﺪ ﺗﺮأس أﻣﻴﺮ اﻟﻤﺆﻣﻨﻴﻦ ﺟﻠﺎﻟﺔ اﻟﻤﻠﻚ ﻣﺤﻤﺪ" },
    // ]
    function handleStart(){
        setStart(true)
    }

    console.log('show start------',start)
    const listenerIframe1 = (video) => {
        const exampleModal = document.getElementById("modalVideo1")
        var modalBodyInput = exampleModal.querySelector('.modal-body iframe')
        modalBodyInput.src = video
    }
    const listenerIframe = (video) => {
        const exampleModal = document.getElementById("SliderVideoListModal")
        var modalBodyInput = exampleModal.querySelector('.modal-body iframe')
        modalBodyInput.src = video
    }
    $(document).ready(function(){
        $('.modal').each(function(){
            var src = $(this).find('iframe').attr('src');
            $(this).on('click', function(){
                $(this).find('iframe').attr('src', '');
                $(this).find('iframe').attr('src', src);

            });
        });
    });
    if (_.isEmpty(dataAPI)) {
        return (
          <div className="d-flex align-items-center justify-content-center py-5">
            <Loading />
          </div>
        )
    }
    var leng = dataAPI.included.length


        // const data12 = dataAPI.data
        // if(dataAPI?.data?.length > 0){
        //  var stripedTitle = dataAPI.data[0].attributes.field_description_video.processed.replace(/<[^>]+>/g, '');
        // }
    return (
        <TemplateArticle {...props} ListBreadcrumb={data} titlePage={title}>
            <ScrollButton />
            <Body className="TemplateArticleBody Media d-flex p-4">
            {dataAPI?.data?.length > 0 ?

                <div className="flex-fill" style={{ width: "67%" }}>
                    <div className="box-first-video">
                        <div className="btn-play">
                            <button type="button" className="btn  p-0 position-relative" id="bttn" onClick={() => handleStart()}>
                               <div className="player-wrapper">
                                <ReactPlayer
                                        url={[{src:`${base_url}${dataAPI.included[leng / 2]?.attributes?.uri?.url}`, type: 'video/mp4'}]}
                                        light={`${base_url}/${dataAPI?.included[0]?.attributes?.uri?.url}`}
                                        controls
                                        playing
                                        className="react-player"
                                        width='100%'
                                        height='100%'
                                    />
                                    </div>
                            </button>
                        </div>
                        <PageTitleSecond className="title-video px-0" title={dataAPI.data[0].attributes.title} />
                        {/* <h6>{stripedTitle}</h6> */}
                    </div>
                    <div>
                        {/* <SliderVideoList data={VideosList} className="pt-5" /> */}
                        <div className="SliderVideoList">
                            <Slider {...settings} className="slide my-4">
                                {dataAPI?.data.map((item, i) => {
                                    console.log("-item----",item)

                                        return (
                                            <div key={i.toString()} className="SliderVideoList-data d-flex flex-wrap">
                                                <div key={i.toString()} className="item-card-content position-relative d-flex flex-column mt-4 mb-2">
                                                    {/* {dataAPI && dataAPI.included && <img className="image w-100" src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`} alt="" />}
                                                    <p className="m-0 py-3 description">{item?.attributes?.title}</p>
                                                    {item?.attributes?.field_lien_video.uri && <i className={`fas fa-play`}></i>} */}
                                                    <div className="player-wrapper">
                                                    <ReactPlayer
                                                        url={[{src:`${base_url}${dataAPI?.included[i + (leng / 2)]?.attributes?.uri?.url}`, type: 'video/mp4'}]}
                                                            light={`${base_url}${dataAPI?.included[i]?.attributes?.uri?.url}`}
                                                            controls
                                                            playing
                                                            className="react-player"
                                                            width='100%'
                                                            height='100%'
                                                        />
                                                        </div>
                                                        <p className="m-0 py-3 description">{item?.attributes?.title}</p>
                                                </div>
                                              </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                            <div className="modal fade" id="SliderVideoListModal" tabIndex="-1" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body p-0">
                                            <iframe src="https://www.youtube.com/" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
                : <div className="flex-fill" style={{ width: "67%" }}></div>
            }
                <div className="side-bar" style={{ width: "30%" }}>
                    {<SimpleListMedia data={sideData11}/>}
                </div>
            </Body>
            <div className="modal fade" id="modalVideo1" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div className="modal-body p-0">
                        <iframe src="" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
          </div>
        </div>
        </TemplateArticle>
    );
}

export default Media;
