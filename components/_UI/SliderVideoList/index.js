import Widget from "../Widget";

import _ from "lodash";
import useTranslation  from 'next-translate/useTranslation';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import styles from './SliderVideoList.module.css';

const SliderVideoList = (props) => {

    const { i18n } = useTranslation();
    const isRTL = i18n?.language === "ar"

    const settings = {
        infinite: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    const className = props?.className ? props.className : ""
    const _data = _.chunk(props?.data, 4);
    const data = isRTL ? _.reverse(_data) : _data

    const listenerIframe = (video) => {
        const exampleModal = document.getElementById("SliderVideoListModal")
        var modalBodyInput = exampleModal.querySelector('.modal-body iframe')
        modalBodyInput.src = video
    }

    return (
        <Widget className={`${className}`}>
            <div className={`${styles.SliderVideoList} SliderVideoList`}>
                <Slider {...settings} className="slide my-4">
                    {data?.map((item, i) => {
                        const newData = item.map((data, index) => {
                            return (
                                <div key={index.toString()} className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`} data-bs-toggle="modal" data-bs-target="#SliderVideoListModal" onClick={() => listenerIframe(data?.video)}>
                                    {data?.source && <img className="image w-100" src={data?.source} alt="" />}
                                    <p className="m-0 py-3">{data.title}</p>
                                    {data?.source && <i className={`fas fa-play`}></i>}
                                </div>
                            )
                        })
                        return <div key={i.toString()} className="SliderVideoList-data d-flex flex-wrap">
                            {newData}
                        </div>
                    })}
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
        </Widget >
    );
}

export default SliderVideoList
