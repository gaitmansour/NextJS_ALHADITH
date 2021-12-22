import {Icons} from "../../../assets"
import styles from './NotFound404.module.css';
import Image from 'next/image'
import Link from 'next/link'
import React from "react";

const NotFound404 = (props) => {
    return (
        <div
            className={`${styles.NotFound404} NotFound404 d-flex flex-column align-items-center justify-content-center mt-lg-11`}>
            <Link passHref={true} href="/">
                <Image src={props?.icon || Icons.icon_not_found_404} alt=""/>
            </Link>
            <h4>{props?.title || "الصفحة المطلوبة غير متوفرة الان"}</h4>
            <p className="fw-100">{props?.message || "يرجي التأكد من الرابط المطلوب أو محاولة البحث في الموقع"}</p>
        </div>
    );
}

export default NotFound404
