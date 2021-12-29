import React from "react";
import styles from './Almoshaf.module.css'
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";

const Almoshaf = (props) => {
    const title = "اﻟﻤﺼﺤﻒ اﻟﻤﺤﻤﺪي"

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
                    <iframe src="https://dev.dialy.net/coranM6/Coran/#p=2" className={styles.ifr} title="Iframe Example"/>
            </Body>
        </TemplateArticle>
    )
}

export default Almoshaf
