import React, {useEffect} from 'react'
import appWithI18n from 'next-translate/appWithI18n'
import i18nConfig from '../i18n'
import Head from "next/head";
import '../public/css/bootstrap.min.css';
import '../public/css/fonts.css';
import '../public/css/all.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
function MyApp({Component, pageProps}) {
    useEffect(()=>{
        import('../public/js/bootstrap.bundle.min');
    })
    return (<>
        <Head>
            <meta charSet="utf-8"/>
            <link rel="icon" href="../public/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#129D59"/>
            <meta name="description" content="منصة محمد السادس للحديث النبوي الشريف"/>
            <meta
                name="keywords"
                content="٫ اوقات الصلاة٫ وزارة الأوقاف والشؤون الإسلامية٫ اسلام٫ المغرب"
            />
            <link rel="apple-touch-icon" href="../public/logo192.png"/>
            <link rel="manifest" href="../public/manifest.json"/>
            <title>منصة محمد السادس للحديث النبوي الشريف</title>
        </Head>
        <Component {...pageProps} />
    </>)
}

export default appWithI18n(MyApp, {
    ...i18nConfig,
    //
    // If you remove the "skipInitialProps", then all the namespaces
    // will be downloaded in the getInitialProps of the app.js and you
    // won't need to have any helper loadNamespaces on each page.
    //
    // skipInitialProps=false (default):
    // 🟢 Easy to configure
    // 🔴 All your pages are behind a server. No automatic page optimization.
    //
    // skipInitialProps=true:
    // 🔴 Hard to configure
    // 🟢 Better performance with automatic page optimization.
    //
    skipInitialProps: true,
})
