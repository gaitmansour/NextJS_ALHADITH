import React, {useEffect, useState} from "react";
import styles from "./conditionUser.module.css"
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";
import {getArticleById} from "../../endpoints";
import FetchAPI from "../../API";
import _ from "lodash";
import Loading from "../../components/_UI/Loading";

const ConditionUser = (props) => {
    const [dataAPI, setDataAPI] = useState([])
    const data = [
        {
            "title": "الرئيسية",
            "path": "",
        },
        {
            "title": "اتفاقية استخدام الموقع",
            "path": "/اتفاقية استخدام الموقع",
        }
    ]

    const url = getArticleById('اتفاقية استخدام الموقع')
    const getData = async () => {
        FetchAPI(url).then((data) => {
            if (data.success) {
                setDataAPI(data?.data)
            }
        })
        // console.log('data condition', dataAPI?.data[0]?.attributes?.body?.value)
    }
    useEffect(() => {
        getData()
    }, [])

    if (_.isEmpty(dataAPI)) {
        return (
            <div className='d-flex align-items-center justify-content-center py-5'>
                <Loading />
            </div>
        )
    }

    return (
        <TemplateArticle ListBreadcrumb={data} titlePage="اتفاقية استخدام الموقع">
            <Body className="TemplateArticleBody Media d-flex p-4">
                <>
                    <div
                        className={styles.desc}
                        dangerouslySetInnerHTML={{
                            __html: dataAPI?.data[0]?.attributes?.body?.value,
                        }}
                    />
                </>
               </Body>
        </TemplateArticle>
    );
}

export default ConditionUser;
