import TopBar from '../components/Navs/TopBar'
import NavBar from '../components/Navs/Navbar'
import React, { useEffect, useState } from 'react'
import Body from '../components/Body'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import CarouselHome from './homePage/CarouselHome'
import CommanderieCroyants from './homePage/CommanderieCroyants'
import Resources from './homePage/Resources'
import Alahadiths from './homePage/Alahadiths'
import SearchSection from './homePage/searchHome'
import DownloadApk from '../components/downloadApk'
import Videos from './homePage/Videos'
import FetchAPI from '../API'
import { getNewSections } from '../endpoints'
import Theme1 from '../components/Theme1'
import Theme2 from '../components/Theme2'
import ScrollButton from '../components/ScrollButton'
import DoroussHaditha from './homePage/DoroussHaditha'
import { isMobile, isIOS } from 'react-device-detect'

const HomeScreen = (props) => {
  const [sections, setSections] = useState([])
  const [dataSection, setdataSection] = useState([])
  const url = getNewSections()
  const getData = async () => {
    FetchAPI(url).then((data) => {
      //  console.log("data Resources ==> ", data)
      if (data.success) {
        setSections(data?.data)
      }
    })
  }

  // if (isIOS) {
  //   console.log('i am ios ============>><>')
  // }

  const renderSwitch = (theme, data) => {
    switch (theme) {
      case 'theme1':
        return (
          <div style={{ marginTop: 60 }}>
            <Theme1 title={data} />
          </div>
        )
      case 'theme2':
        return (
          <div style={{ marginTop: 60 }}>
            <Theme2 title={data} />
          </div>
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <TopBar />
      <NavBar />
      <Body>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
        {isIOS ? null : <ScrollButton />}

        <CarouselHome />
        <SearchSection />
        <CommanderieCroyants />
        <DoroussHaditha />
        <Resources />
        <Alahadiths />
        <Videos />
        {sections &&
          sections.length > 0 &&
          sections.map((item, index) => {
            // getdataSection(item.term_node_tid)
            return renderSwitch(item.field_theme_accueil, item.term_node_tid)
          })}
        <DownloadApk />
      </Body>
      <Footer />
    </Layout>
  )
}
export default HomeScreen
