import React from "react";
import styles from './Almoshaf.module.css'
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";

const Almoshaf = (props) => {
    const title = "المصحف المحمدي"

    const data = [
        {
            "title": "الرئيسية",
            "path": "",
        },
        {
            "title": "موارد",
            "path": "",
        },
        {
            "title": title,
            "path":title,
        },
    ]

    return (
        <TemplateArticle {...props} ListBreadcrumb={data} titlePage={title}>
            <Body className="TemplateArticleBody d-flex p-4" id='bdy'>
                <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
                    <iframe src="https://coran.7adith.ma:8000/#p=2" className={styles.ifr} title="Iframe Example"/>
            </Body>
        </TemplateArticle>
    )
}

export default Almoshaf
