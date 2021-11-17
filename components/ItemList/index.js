import styles from './ItemList.module.css';
import React, {useEffect, useState} from "react";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton, WhatsappIcon, WhatsappShareButton
} from "react-share";
import Cards from "../_UI/Cards";
const ItemList = (props) => {

    const className = props?.className ? props.className : ""
    const params = `${props.content}\n  # الباب : ${props.topic} \n# الموضوع : ${props.category} \n# المصدر : ${props.source} \n # الراوي : ${props.narrator} \n# درجة الصحة : ${props.degree} \n# مصدر الحكم : ${props.sourceGlobal ? props.sourceGlobal : ""}`

    const toShow = params.substring(0, 251) + " ...";

    return (
        <Cards className={`${styles.ItemList} my-2 px-0 pb-0 ${className} ${styles.result}result`}>
            <div className={styles.content}>
                {props.highlight ?
                    <p className="m-0" dangerouslySetInnerHTML={{__html: props.text}}/>
                    : <p className="m-0">{props.text}</p>
                }
                <div className={`${styles.metaData} meta-data mt-3`}>
                    <div className={`d-flex align-items-center alignItem ${styles.alignItem}`}>
                        <p className="d-flex text-warning m-0">الراوي : <span>{props.narrator}</span></p>
                        <div className={styles.devider}/>
                        <p className="d-flex text-warning m-0">المصدر : <span>{props.source}</span></p>
                        <div className={styles.devider}/>
                        <p className="d-flex text-success m-0">الموضوع : <span>{props.category}</span></p>
                    </div>
                    <div className={`d-flex align-items-center alignItem${styles.alignItem}`}>
                        <p className="d-flex text-success m-0">باب : <span>{props.topic}</span></p>
                        <div className={styles.devider}/>
                        <p className="d-flex text-warning m-0">درجة الصحة : <span>{props.degree}</span></p>
                        <div className={styles.devider}/>
                        <p className="d-flex text-success m-0">
                            مصدر الحكم :
                            <span>{props.sourceGlobal}</span></p>
                    </div>
                    <div className={`d-flex align-items-center alignItem${styles.alignItem}`}>
                        <p className="d-flex text-success m-0">ملاحظات : <span
                            dangerouslySetInnerHTML={{__html: props.description}}/></p>
                    </div>
                </div>
            </div>
            <div className={`${styles.smIcons}sm-icons d-flex align-items-center flex-row-reverse py-2 mt-4`}
            style={{justifyContent:'flex-end'}}>
                <FacebookShareButton
                    url={'www.habouss.com'}
                    quote={params}
                    className="justify-content-center mx-2"
                >
                    <FacebookIcon size={32} round/>
                </FacebookShareButton>
                <LinkedinShareButton
                    url={'www.habouss.com'}
                    quote={params}
                    className="mx-2"
                >
                    <LinkedinIcon size={32} round/>
                </LinkedinShareButton>
                <TwitterShareButton
                    url={'www.habouss.com'}
                    title={toShow}
                    className="mx-2"
                >
                    <TwitterIcon size={32} round/>
                </TwitterShareButton>
                <WhatsappShareButton
                    url={'www.habouss.com'}
                    title={params}
                    separator=":: "
                    className="mx-2"
                >
                    <WhatsappIcon size={32} round/>
                </WhatsappShareButton>
            </div>
        </Cards>
    );
}

export default ItemList
