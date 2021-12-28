import React, {useState, useEffect} from 'react'
import {Tabs, Tab} from 'react-bootstrap';
import HadithTab from './HadithTab';
import styles from './Alahadiths.module.css'
import {data} from "./tabData"
import "bootstrap/dist/css/bootstrap.min.css";

const Alahadiths = (props) => {

    return (
        <Tabs
            defaultActiveKey="الصحيحة"
            transition={false}
            id="noanim-tab-example"
            // className={`text-secondary nav-tabs nav-tabs ${styles.navTabs}`}
            className={'text-secondary navTabs '}
            style={{justifyContent: 'center'}}
        >
            {data.map((t, key) => (
                <Tab key={key} {...t}>
                    <HadithTab CodeTopic={t.CodeTopic} Content={t.content}/>
                </Tab>
            ))}
        </Tabs>
    )
}

export default Alahadiths
