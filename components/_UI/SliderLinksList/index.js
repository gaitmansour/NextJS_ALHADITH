import Widget from "../Widget";
import React, {useEffect, useState} from "react";
import _ from "lodash";
import {useTranslation} from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './SliderLinksList.module.css';

const SliderVideoList = (props) => {

    const {i18n} = useTranslation();
    const isRTL = i18n?.language === "ar"
    const className = props?.className ? props.className : ""
    const _data = _.chunk(props?.data, 2);
    const data = isRTL ? _.reverse(_data) : _data
    const [yearVal, setYearVal] = useState('2017')
    return (
        <Widget className={`${className}`}>
            <div className="custom-select">
                <h5>إختيار السنة</h5>
                <select className="selectbox-scrollbar" onChange={event => {
                    setYearVal(event.target.value)
                }}>
                    <option disabled="disabled">إختيار السنة</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                    <option>2010</option>
                    <option>2009</option>
                    <option>2008</option>
                    <option>2007</option>
                    <option>2006</option>
                    <option>2005</option>
                    <option>2004</option>
                    <option>2003</option>
                    <option>2002</option>
                </select>
            </div>
            <div className={`${styles.SliderVideoList1} SliderVideoList1 row`}>
                {data?.map((item, i) => {
                    const newData = item.filter(item => item.year == yearVal).map((data, index) => {
                        return (
                            <div key={index} className="col col-lg-6">
                                <a href={data?.link}>
                                    <div key={index.toString()}
                                         className={`${styles.itemCardContent} item-card-content position-relative d-flex flex-column mt-4 mb-2`}
                                         data-bs-toggle="modal" data-bs-target="#SliderVideoListModal">
                                        {data?.source && <img className="image " src={data?.source} alt=""/>}
                                        <p className="m-0 py-3">{data.title} ({data.year})</p>
                                    </div>
                                </a>
                            </div>
                        )
                    })
                    return <div key={i.toString()}
                                className={`${styles.SliderVideoListData1} SliderVideoList-data1 d-flex flex-wrap`}>
                        {newData}
                    </div>
                })}
            </div>
        </Widget>
    );
}

export default SliderVideoList
