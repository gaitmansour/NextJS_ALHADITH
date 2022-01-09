import TopBar from "./TopBar";
import NavBar from "./Navbar";
import React, {useEffect,useState} from "react";
import Body from "../components/Body";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import CarouselHome from "./CarouselHome";
import CommanderieCroyants from "./CommanderieCroyants";
import Resources from "./Resources";
import Alahadiths from "./Alahadiths";
import SearchSection from "./searchHome";
import OurPartners from "./OurPartners";
import DownloadApk from "../components/downloadApk";
import Videos from "./Videos";
import FetchAPI from "../API";
import {getNewSections} from "../endpoints";
import Theme1 from "../components/Theme1";
import Theme2 from "../components/Theme2";

const HomeScreen = (props) => {
    const [sections, setSections] = useState([]);
    const [dataSection, setdataSection] = useState([]);
    const url = getNewSections();
    const getData = async () => {
        FetchAPI(url).then(data => {
            //  console.log("data Resources ==> ", data)
            if (data.success) {
                setSections(data?.data);
            }
        });
    };

    const renderSwitch = (theme, data) => {
        switch (theme) {
            case 'theme1':
                return (
                    <div style={{marginTop: 60}}>
                        <Theme1 title={data} />
                    </div>
                );
            case 'theme2':
                return (
                    <div style={{marginTop: 60}}>
                        <Theme2 title={data} />
                    </div>
                );
            default:
                return <></>;
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <Layout>
            <TopBar/>
            <NavBar/>
            <Body>
                <CarouselHome/>
                <CommanderieCroyants/>
                <SearchSection/>
                <Resources/>
                <Alahadiths/>
                <Videos />
                {sections &&
                    sections.length > 0 &&
                    sections.map((item, index) => {
                        // getdataSection(item.term_node_tid)
                        return renderSwitch(item.field_theme_accueil, item.term_node_tid);
                    })}
                <DownloadApk/>
            </Body>
            <Footer/>
        </Layout>
    )
}
export default HomeScreen;
