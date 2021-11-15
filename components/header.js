import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import styles from './header.module.css'

export default function Header() {
    const {t, lang} = useTranslation()
    const title = t('common:title')

    function changeToEn() {
        Router.push('/', undefined, {locale: 'ar'})
    }

    return (
        <>
            <Head>

                <link rel="icon" href="../public/favicon.ico"/>
            </Head>
            <p className={styles.hola}>dkjnskflqskf</p>
            <header className={styles.header} >
                <h1>{title}</h1>
            </header>
        </>
    )
}
