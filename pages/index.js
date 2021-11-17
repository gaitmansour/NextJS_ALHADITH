import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import loadNamespaces from 'next-translate/loadNamespaces'
import HomeScreen from "./home";

export default function Home(props) {
    const {t} = useTranslation()
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
