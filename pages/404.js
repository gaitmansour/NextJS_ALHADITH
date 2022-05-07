import useTranslation from 'next-translate/useTranslation'
import loadNamespaces from 'next-translate/loadNamespaces'
import Layout from "../components/Layout";
import TopBar from "../components/Navs/TopBar";
import NavBar from "../components/Navs/Navbar";
import Body from "../components/Body";
import NotFound404 from "../components/Messages/NotFound404";
import Footer from "../components/Footer";
import React from "react";

export default function Error404(props) {
  const { t, lang } = useTranslation()
  const errorMessage = t`error:404`

  console.log({ lang })

  return ( <Layout>
    <TopBar {...props} />
     <NavBar />
    <Body>
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      <div className="d-flex align-items-center justify-content-center h-100 py-5">
        <NotFound404 />
      </div>
    </Body>
    <Footer />
  </Layout>)
}
/*
export async function getStaticProps(ctx) {
  return {
    props: await loadNamespaces({
      ...ctx,
      pathname: '/404',
    }),
  }
}
*/
