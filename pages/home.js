import TopBar from "../components/Navs/TopBar";
import NavBar from "../components/Navs/Navbar";
import React from "react";
import Body from "../components/Body";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import CarouselHome from "./CarouselHome";
import CommanderieCroyants from "./CommanderieCroyants";
import Resources from "./Resources";

const HomeScreen = (props) => {
    return (
        <Layout>
            <TopBar/>
            <NavBar/>
            <Body>
                <CarouselHome/>
                <CommanderieCroyants/>
                <Resources/>
            </Body>
            <Footer/>
        </Layout>
    )
}
export default HomeScreen;
