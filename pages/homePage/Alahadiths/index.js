import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import HadithTab from './HadithTab'
import SectionTitle from '../../../components/_UI/SectionTitle'
import 'bootstrap/dist/css/bootstrap.min.css'

const Alahadiths = (props) => {
  const { i } = ['الصحيحة', 'الضعيفة', 'الضعيفة']
  const [key, setKey] = useState('صحيح')

  return (
    <>
      <SectionTitle title={'مواضيع الحديث'} />
      <Tabs
        transition={false}
        id='noanim-tab-example'
        onSelect={(key) => {
          setKey(key)
        }}
        variant={'tabs'}
        activeKey={key}
        className={`${
          key === 'صحيح' ? 'navTabs' : key === 'ضعيف' ? 'navTabs1' : 'navTabs2'
        }
      text-secondary  mt-5`}
        style={{ justifyContent: 'center' }}
      >
        {props?.dataAhadith?.map((t, key) => {
          return (
            <Tab key={key} {...t} eventKey={t?.content}>
              <HadithTab
                {...props}
                CodeTopic={t?.codeTopic}
                dtatttt={t[Object.keys(t)[0]]}
                Content={t?.content}
              />
            </Tab>
          )
        })}
      </Tabs>
    </>
  )
}

export default Alahadiths
