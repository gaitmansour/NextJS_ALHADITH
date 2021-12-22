import React from 'react';
import styles from './downloadAPK.module.css';
import {Icons} from '../../assets';
import Image from "next/image"

const DownloadApk = () => {
    return (
        <div className={`container ${styles.downloadApk}`}>
            <Image src={Icons.icon_mobil} alt="" className={`${styles.mobile}`}/>
            <div className={`${styles.downloadIcon} downloadIcon `}>
                <Image src={Icons.icon_googlPlay} alt="" className={`${styles.dwdApk} dwdApk`}/>
                <Image src={Icons.icon_appStor} alt="" className={`${styles.dwdApk} dwdApk`}/>
            </div>
        </div>
    );
};

export default DownloadApk;
