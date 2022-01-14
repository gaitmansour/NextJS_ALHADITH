import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import HomeScreen from "./home";

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
/*
export async function getStaticProps(ctx) {
    return {
        props: await loadNamespaces({
            ...ctx,
            pathname: '/',
        }),
    }
}*/
