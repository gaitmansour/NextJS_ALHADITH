import React, {useEffect, useState} from "react";
import useTranslation from 'next-translate/useTranslation';
import {Icons} from "../../../assets";
import Cards from "../../_UI/Cards";
import Loading from "../../_UI/Loading";
import CustomSelect from "../../Forms/CustomSelect";
import styles from './PrayTimes.module.css';
import axios from "axios"
import _ from 'lodash'
// import moment from 'moment'
import 'moment/locale/fr';
import 'moment/locale/ar-ma';
import {api_search} from "../../../endpoints";
import Image from 'next/image'
const PrayTimes = () => {
    const [data, setData] = useState({})
    const [date, setDate] = useState("")
    const [dataCities, setDataCities] = useState([])
    const [currentCity, setCurrentCity] = useState(1)

    const {t, i18n} = useTranslation('PrayTimes');
    // const isRTL = i18n?.language === "ar"

    const fetchAPI = async () => {

        // const url_all_pray = "https://api.pray.zone/v2/times/day.json?city=rabat&date=2021-07-23&school=8"
        const url_date_hijri = `${api_search}/api/hijridate`
        const url_get_cities = `${api_search}/api/prieres/villes`
        const url_get_times = `${api_search}/api/prieres/ville/${currentCity}/${new Date().getMonth() + 1}/${new Date().getDate()}`

        axios.all([
            // axios.get(url_all_pray),
            axios.get(url_date_hijri),
            axios.get(url_get_cities),
            axios.get(url_get_times)
        ])
            .then(axios.spread((data_date_hijri, data_get_cities, data_get_times) => {

                if (!_.isEmpty(data_get_times?.data)) {
                    const dataTimes = data_get_times?.data[0]
                    setData(dataTimes)
                }

                if (!_.isEmpty(data_get_cities?.data)) {
                    const orderData = data_get_cities?.data.sort(function (a, b) {
                        return a.nom.localeCompare(b.nom, ["ar"]);
                    });
                    // console.log(orderData)
                    const formatDataCities = data_get_cities?.data.map(item => {
                            return {label: item?.nom, value: item?.code_ville}
                        }
                    )
                    setDataCities(formatDataCities)
                }

                if (data_date_hijri.status === 200 && data_date_hijri.data !== undefined) {
                    setDate(data_date_hijri.data)
                }
            })).catch(function (error) {
            console.log(error);
            setData(null)
        })
    }


    useEffect(() => {
        fetchAPI()
    }, [currentCity])

    const renderListPrayTime = () => {
        try {
            // console.log("data => ", data)
            if (data === null) {
                return (
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <Loading/>
                    </div>
                )
            } else {
                return (
                    <div className="mt-4">
                        <div
                            className={`${styles.boxPray} box-pray d-flex bg-success-100 rounded-9 align-items-center px-4 my-2`}>
                            <p className="flex-fill m-0 text-success">{'الفجر'}</p>
                            <p className="m-0 text-success mx-4">{data?.Fajr}</p>
                            <i className="far fa-clock"/>
                        </div>
                        <div
                            className={`${styles.boxPray} box-pray d-flex bg-success-100 rounded-9 align-items-center px-4 my-2`}>
                            <p className="flex-fill m-0 text-success">{'الشروق'}</p>
                            <p className="m-0 text-success mx-4">{data?.Chorouq}</p>
                            <i className="far fa-clock"/>
                        </div>
                        <div className={`${styles.boxPray} box-pray d-flex bg-success-100 rounded-9 align-items-center px-4 my-2`}>
                            <p className="flex-fill m-0 text-success">{"الظهر"}</p>
                            <p className="m-0 text-success mx-4">{data?.Dhuhr}</p>
                            <i className="far fa-clock"/>
                        </div>
                        <div
                            className={`${styles.boxPray} box-pray d-flex bg-success-100 rounded-9 align-items-center px-4 my-2`}>
                            <p className="flex-fill m-0 text-success">{"ﺍﻟﻌﺼﺮ"}</p>
                            <p className="m-0 text-success mx-4">{data?.Asr}</p>
                            <i className="far fa-clock"/>
                        </div>
                        <div
                            className={`${styles.boxPray} box-pray d-flex bg-success-100 rounded-9 align-items-center px-4 my-2`}>
                            <p className="flex-fill m-0 text-success">{"ﺍﻟﻤﻐﺮﺏ"}</p>
                            <p className="m-0 text-success mx-4">{data?.Maghrib}</p>
                            <i className="far fa-clock"/>
                        </div>
                        <div
                            className={`${styles.boxPray} box-pray d-flex bg-success-100 rounded-9 align-items-center px-4 my-2`}>
                            <p className="flex-fill m-0 text-success">{"ﺍﻟﻌﺸﺎء"}</p>
                            <p className="m-0 text-success mx-4">{data?.Ishae}</p>
                            <i className="far fa-clock"/>
                        </div>
                    </div>
                )
            }
        } catch (error) {
            console.log(`CATCH OurPartners ${error}`)
        }
    }

    return (
        <Cards className={styles.praytimes}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-column align-self-stretch justify-content-between">
                    <h3 className={`${styles.title} title text-success m-0`}>{'مواقيت الصلاة'}</h3>
                    {date && <p className={`${styles.date} date m-0`}>{date}</p>}
                </div>
                <Image alt={""} src={Icons.mosque_icon} width={150} height={200} className="img img-responsive"/>
            </div>
            {dataCities?.length > 0 &&
            <CustomSelect options={dataCities} placeholder="الرباط" onChange={city => setCurrentCity(city.value)}/>}
            {renderListPrayTime()}
        </Cards>
    )
}

// {t("prayTimes.chooseCity")}

export default PrayTimes
