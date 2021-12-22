import { useEffect, useState } from 'react';
import styles from './OurPartners.module.css';
// import PartnersList from "./PartnersList"
import useTranslation from "next-translate/useTranslation";

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

import _ from "lodash"
import {getOurPartners, base_url} from "../../endpoints"
import FetchAPI from "../../API";
import SectionTitle from "../../components/_UI/SectionTitle";
import Loading from "../../components/_UI/Loading";
import Cards from "../../components/_UI/Cards";
import React from "react";

const OurPartners = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        },
      },
    ]
  };

  const { t, i18n } = useTranslation();

  const [dataAPI, setDataAPI] = useState({})
  const getLanguage = i18n?.language === "ar" ? "ar" : "fr"
  const url = getOurPartners(getLanguage)

  const getData = async () => {
    FetchAPI(url).then(data=>{
       console.log("data partners ==> ", data)
      if (data.success) {
        setDataAPI(data?.data)
      }
    })
  }

  useEffect(() => {
    getData()
  },[])

  try {
    if (_.isEmpty(dataAPI)) {
      return (
        <div className="d-flex align-items-center justify-content-center py-5">
          <Loading/>
        </div>
      )
    }
  } catch (error) {
    console.log(`CATCH OurPartners ${error}`)
  }


  return (
    <div className={`${styles.OurPartners} OurPartners mb-4`}>
      <SectionTitle title={t('ourPartners')} className="bg-blue-100 partners"/>
      <div className="row bg-blue-100 ">
        <Slider {...settings} className="slide my-4">
          {dataAPI?.data?.map((item, i) => {
            const {title, field_lien } = item?.attributes
            return (
              <div key={i.toString()} className="col-md-3">
                <Cards className="m-2 d-flex justify-content-center align-items-center">
                  <a href={`${field_lien[0]?.uri}`} className="btn text-center box-logo m-auto d-flex justify-content-center align-items-center" target='_blank' rel="noreferrer">
                    <img src={`${base_url}/${dataAPI?.included[i]?.attributes?.uri?.url}`} alt={title} className="img-responsive w-100" />
                  </a>
                </Cards>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  );
}

export default OurPartners
