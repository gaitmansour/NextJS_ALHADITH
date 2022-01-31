import React from "react";
import styles from "./conditionUser.module.css"
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";

const ConditionUser = (props) => {
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


    return (
        <TemplateArticle ListBreadcrumb={data} titlePage="اتفاقية استخدام الموقع">
            <Body className="TemplateArticleBody Media d-flex p-4">
                <div className={'p-5'}>
                    <p>لا توجد معلومات متوفرة الآن</p>
                </div>
               </Body>
        </TemplateArticle>
    );
}

export default ConditionUser;
