import React, {useState, useEffect} from 'react'
import {Tabs, Tab} from 'react-bootstrap';
import HadithTab from './HadithTab';
import styles from './Alahadiths.module.css'
import {data} from "../../../data/tabData"
import "bootstrap/dist/css/bootstrap.min.css";

const Alahadiths = (props) => {
    const {i} = ['الصحيحة', 'الضعيفة', 'الضعيفة']
    const [key, setKey] = useState('الصحيحة');

    //const obj = data.reduce((obj, cur) => ({...obj, ["name"]: cur}), {})
    return (
        <Tabs
            //defaultActiveKey={key}
            transition={false}
            id='noanim-tab-example'
            // className={`text-secondary nav-tabs nav-tabs ${styles.navTabs}`}
            onSelect={key => {
                setKey(key);
                console.log('key------------------------------')
                console.log(key)
            }}
            variant={"tabs"}
            activeKey={key}
            className={`${key === 'الصحيحة'
              ? 'navTabs' :
              key === 'الضعيفة'
                  ? 'navTabs1'
                  : 'navTabs2'}
      text-secondary  mt-5`}

            style={{justifyContent: 'center'}}
        >
            {data.map((t, key) => (
                <Tab key={key} {...t} eventKey={t.eventKey}>
                    <HadithTab CodeTopic={t.CodeTopic} Content={t.content}/>
                </Tab>
            ))}
        </Tabs>
    )
}

export default Alahadiths
