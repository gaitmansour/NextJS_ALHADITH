import React from 'react';
import styles from './downloadAPK.module.css';
import {Icons} from '../../assets';
import Image from "next/image"

const DownloadApk = () => {
    return (
        <div className={`container ${styles.downloadApk}`}
             style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{}}>
                <Image  src={Icons.icon_mobil} alt="" className={styles.mobile}/>
            </div>
            <div style={{marginRight:350,marginTop:-290}}><Image src={Icons.icon_googlPlay} alt="" className={styles.dwdApk}/>
                <Image src={Icons.icon_appStor} alt="" className={styles.dwdApk}/>
            </div>
        </div>
    );
};

export default DownloadApk;
