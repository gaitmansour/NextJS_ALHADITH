import TopBar from "../components/Navs/TopBar";
import NavBar from "../components/Navs/Navbar";
import React from "react";
import Body from "../components/Body";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

const HomeScreen = (props) => {
    return (
        <Layout >
            <TopBar/>
            <NavBar/>
            <Body>

            </Body>
            <Footer/>
        </Layout>
    )
}
export default HomeScreen;
