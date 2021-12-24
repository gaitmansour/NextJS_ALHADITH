import TopBar from "../components/Navs/TopBar";
import NavBar from "./Navbar";
import React from "react";
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

const HomeScreen = (props) => {
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
                <DownloadApk/>
            </Body>
            <Footer/>
        </Layout>
    )
}
export default HomeScreen;
