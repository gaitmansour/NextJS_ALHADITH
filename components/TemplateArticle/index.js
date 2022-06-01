import NavBar from '../Navs/Navbar'
import TopBar from '../Navs/TopBar'
import Layout from '../Layout'
import Footer from '../Footer'
import Breadcrumb from '../_UI/Breadcrumb'
import PageTitle from '../_UI/PageTitle'
import styles from './TemplateArticle.module.css'
import { Backgrounds } from '../../assets'
import Image from 'next/image'
import React from 'react'

const TemplateArticle = (props) => {
  return (
    <Layout className={`${styles.TemplateArticle}TemplateArticle`}>
      <TopBar {...props} />
      <NavBar {...props}/>
      <div className={styles.bodyTemplate}>
        <div
          className={`${styles.templateHeader} template-header position-relative pb-2`}
        >
          <div
            className={` ${styles.bgDashed} p-1 flex-row-reverse position-absolute flex-row`}
            style={{ left: 10, marginTop: 10 }}
          >
            <Image
              alt={''}
              src={Backgrounds.bg_dashed}
              width={100}
              height={100}
              className={` bg_dashed h-100 position-absolute w-100`}
            />
          </div>
          <Breadcrumb data={props?.ListBreadcrumb} />
          {props.title === 't' ? null : (
            <PageTitle
              className={`${styles.pb0} pb-0 titre`}
              title={props?.titlePage}
              dateArticle={props?.dateArticlePage}
              created={props?.createdArticle}
            />
          )}
        </div>
        {props.children}
      </div>
      <Footer />
    </Layout>
  )
}

export default TemplateArticle
