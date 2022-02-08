import React from "react";
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";

const ChoroutMinassa = (props) => {
    const data = [
        {
            "title": "الرئيسية",
            "path": "",
        },
        {
            "title": "شروط المنصة",
            "path": "/شروط المنصة",
        }
    ]


    return (
        <TemplateArticle ListBreadcrumb={data} titlePage="شروط المنصة">
            <Body className="TemplateArticleBody Media d-flex p-4">
                <div className={'p-5'}>
                    <p>لا توجد معلومات متوفرة الآن</p>
                </div>
            </Body>
        </TemplateArticle>
    );
}

export default ChoroutMinassa;
