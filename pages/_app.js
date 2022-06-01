import React, { useEffect } from 'react'
import appWithI18n from 'next-translate/appWithI18n'
// import i18nConfig from '../i18n'
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

import { SSRProvider } from '@react-aria/ssr'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('../public/js/bootstrap.bundle.min')
  })

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NGQL2RC');`,
          }}
        ></script>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        {/* <meta name='viewport' content='width=device-width, initial-scale=1' /> */}
        <meta name='theme-color' content='#129D59' />
        <meta name='description' content='منصة محمد السادس للحديث الشريف' />
        <meta
          name='keywords'
          content='٫ اوقات الصلاة٫ وزارة الأوقاف والشؤون الإسلامية٫ اسلام٫ المغرب'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='preconnect' href='https://backend.hadithm6.com' />
        <link rel='preconnect' href='https://apisearch.hadithm6.com' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Almarai:wght@300&display=swap'
          rel='stylesheet'
        />
        <title>منصة محمد السادس للحديث الشريف</title>
      </Head>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </>
  )
}

export default MyApp
