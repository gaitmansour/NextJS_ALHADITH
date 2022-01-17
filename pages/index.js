import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import HomeScreen from "./home";
import loadNamespaces from "next-translate/loadNamespaces";

export default function Home(props) {
    const {t} = useTranslation()
    const description = t('description')
    const linkName = t('more-examples')

    return (
        <>
            <HomeScreen/>
        </>
    )
}

export async function getStaticProps(ctx) {
    const props = await loadNamespaces({
        ...ctx,
        pathname: '/',
    })

    return {props:JSON.parse(JSON.stringify(props))}


}
