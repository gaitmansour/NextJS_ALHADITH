import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { data } from '../../../data/DoroussData'
import DoroussTab from './DoroussTab'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './DoroussHaditha.module.css'
import SectionTitle from '../../../components/_UI/SectionTitle'
import FetchAPI from '../../../API'
import { getSideItems } from '../../../endpoints'

const DoroussHaditha = () => {
  const [key, setKey] = useState('الدروس التمهيدية')
  const [categoryMedia, setCategoryMedia] = useState([])

  const getItemsMenu = async () => {
    return FetchAPI(getSideItems(51)).then((data) => {
      if (data.success) {
        setCategoryMedia(data?.data)
      }
    })
  }

  useEffect(() => {
    getItemsMenu()
  }, [])

  //console.log('categoryMedia ==>', categoryMedia)

  return (
    <div className='mt-5'>
      <SectionTitle title={'الدروس الحديثية'} />
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
          key === 'الدروس البيانية'
            ? 'navTabs2'
            : key === 'الدروس التمهيدية'
            ? 'navTabs'
            : 'navTabs1'
        }
      text-secondary  mt-5`}
        style={{ justifyContent: 'center' }}
      >
        {categoryMedia.map((t, key) => (
          <Tab key={key} eventKey={t.name} title={t.name}>
            <DoroussTab tid={t.tid} title={t.name} />
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

export default DoroussHaditha
