import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import loadNamespaces from 'next-translate/loadNamespaces'
import Header from '../components/header'
import TopBar from "../components/Navs/TopBar";
import NavBar from "../components/Navs/Navbar";
import HomeScreen from "./home";

export default function Home(props) {
    const {t} = useTranslation('home')
    const description = t('description')
    const linkName = t('more-examples')

    return (
        <>
           <HomeScreen/>
            {/*<Link href="./more-examples">
                <a>{linkName}</a>
            </Link>*/}
        </>
    )
}

export async function getStaticProps(ctx) {
    return {
        props: await loadNamespaces({
            ...ctx,
            pathname: '/',
        }),
    }
}
