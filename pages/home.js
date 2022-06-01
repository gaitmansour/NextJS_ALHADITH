import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import FetchAPI from '../API'
import { getNewSections } from '../endpoints'
import TopBar from '../components/Navs/TopBar'
import NavBar from '../components/Navs/Navbar'
import Body from '../components/Body'
import Layout from '../components/Layout'
const Footer = dynamic(() => import('../components/Footer'))
const CarouselHome = dynamic(() => import('./homePage/CarouselHome'))
const CommanderieCroyants = dynamic(() =>
  import('./homePage/CommanderieCroyants')
)
const Resources = dynamic(() => import('./homePage/Resources'))
const Alahadiths = dynamic(() => import('./homePage/Alahadiths'))
const SearchSection = dynamic(() => import('./homePage/searchHome'))
const DownloadApk = dynamic(() => import('../components/downloadApk'))
const Videos = dynamic(() => import('./homePage/Videos'))
const Theme1 = dynamic(() => import('../components/Theme1'))
const Theme2 = dynamic(() => import('../components/Theme2'))
const ScrollButton = dynamic(() => import('../components/ScrollButton'))
const DoroussHaditha = dynamic(() => import('./homePage/DoroussHaditha'))
const News = dynamic(() => import('./homePage/News'))

// import Footer from '../components/Footer'
// import CarouselHome from './homePage/CarouselHome'
// import CommanderieCroyants from './homePage/CommanderieCroyants'
// import Resources from './homePage/Resources'
// import Alahadiths from './homePage/Alahadiths'
// import SearchSection from './homePage/searchHome'
// import DownloadApk from '../components/downloadApk'
// import Videos from './homePage/Videos'
// import Theme1 from '../components/Theme1'
// import Theme2 from '../components/Theme2'
// import ScrollButton from '../components/ScrollButton'
// import DoroussHaditha from './homePage/DoroussHaditha'
// import News from './homePage/News'

const HomeScreen = (props) => {
  const [sections, setSections] = useState([])
  const [dataSection, setdataSection] = useState([])
  const url = getNewSections()
  const getData = async () => {
    FetchAPI(url).then((data) => {
      if (data?.success) {
        setSections(data?.data)
      }
    })
  }

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
      <NavBar {...props} />
      <Body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        {/* {isIOS ? null : <ScrollButton />} */}
        <ScrollButton />
        <CarouselHome />
        <SearchSection />
        <News />
        <CommanderieCroyants {...props} />
        <DoroussHaditha />
        <Resources />
        <Alahadiths {...props} />
        <Videos />
        {sections &&
          sections?.length > 0 &&
          sections?.map((item, index) => {
            // getdataSection(item.term_node_tid)
            return renderSwitch(item?.field_theme_accueil, item?.term_node_tid)
          })}
        <DownloadApk />
      </Body>
      <Footer />
    </Layout>
  )
}
export default HomeScreen
