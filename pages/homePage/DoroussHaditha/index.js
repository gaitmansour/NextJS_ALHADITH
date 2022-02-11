import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { data } from '../../../data/DoroussData'
import DoroussTab from './DoroussTab'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './DoroussHaditha.module.css'

const DoroussHaditha = () => {
  const [key, setKey] = useState('الصحيحة')

  return (
    <Tabs
      //defaultActiveKey={key}
      transition={false}
      id='noanim-tab-example'
      // className={`text-secondary nav-tabs nav-tabs ${styles.navTabs}`}
      onSelect={(key) => {
        setKey(key)
      }}
      variant={'tabs'}
      activeKey={key}
      className={`${
        key === 'البيانية'
          ? 'navTabs'
          : key === 'التمهيدية'
          ? 'navTabs1'
          : 'navTabs2'
      }
      text-secondary  mt-5`}
      style={{ justifyContent: 'center' }}
    >
      {data.map((t, key) => (
        <Tab key={key} {...t}>
          <DoroussTab title={t.title} />
        </Tab>
      ))}
    </Tabs>
  )
}

export default DoroussHaditha
