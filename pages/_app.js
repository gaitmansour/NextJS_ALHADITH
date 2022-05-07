import React, { useEffect } from 'react'
import appWithI18n from 'next-translate/appWithI18n'
import i18nConfig from '../i18n'
import Head from 'next/head'
import Script from 'next/script'
import '../public/css/bootstrap.min.css'
import '../public/css/fonts.css'
import '../public/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/custom.css'
import '../styles/Keyboard.scss'
import '../styles/Tabs.css'
import '../styles/WebTV.css'
import '../styles/CarouselHome.css'
import '../styles/SocialMedia.css'
import '../styles/SearchResult.css'
import '../styles/AllMedia.css'
import '../styles/Modal.css'
import '../styles/QandA.css'
import '../styles/medias.css'
import '../styles/styleFix.css'
import '../styles/DownloadAPK.css'
import '../styles/articleByTags.css'
import '../styles/sliderList.css'
import '../styles/itemList.css'
import $ from 'jquery'
//import 'react-touch-screen-keyboard/lib/Keyboard.css'; // if you just want css
//import 'react-touch-screen-keyboard/lib/Keyboard.scss';
import { SSRProvider } from '@react-aria/ssr'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('../public/js/bootstrap.bundle.min')
  })
  console.log('------------------testttttt')
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NGQL2RC');`}}></script>
        <meta charSet='utf-8' />
        <link rel='icon' href='/static/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#129D59' />
        <meta name='description' content='منصة محمد السادس للحديث الشريف' />
        <meta
          name='keywords'
          content='٫ اوقات الصلاة٫ وزارة الأوقاف والشؤون الإسلامية٫ اسلام٫ المغرب'
        />
        <link rel='apple-touch-icon' href='/static/logo192.png' />
        <link rel='manifest' href='/static/manifest.json' />
        <title>منصة محمد السادس للحديث الشريف</title>
      </Head>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </>
  )
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
