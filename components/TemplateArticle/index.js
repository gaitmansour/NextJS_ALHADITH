import NavBar from '../../pages/Navbar';
import TopBar from '../Navs/TopBar';
import Layout from '../Layout';
import Footer from '../Footer';
import Breadcrumb from '../_UI/Breadcrumb';
import PageTitle from '../_UI/PageTitle';
import styles from './TemplateArticle.module.css'
import { Backgrounds } from "../../assets"
import Image from 'next/image'
import React from "react";

const TemplateArticle = (props) => {
    return (
        <Layout className={`${styles.TemplateArticle}TemplateArticle`}>
            <TopBar {...props} />
            <NavBar />
            <div className={`${styles.templateHeader}template-header position-relative pb-2`} >
                <div className={'p-1 flex-row-reverse position-absolute flex-row'} style={{marginRight:"90%"}}>
                    <Image src={Backgrounds.bg_dashed}
                           className={`${styles.bg_dashed} bg_dashed h-100 position-absolute w-100`}/>
                </div>
                <Breadcrumb data={props?.ListBreadcrumb} />
                <PageTitle className={`${styles.pb0} pb-0 titre`}  title={props?.titlePage}
                           dateArticle={props?.dateArticlePage}
                           created={props?.createdArticle}/>
            </div>
            {props.children}
            <Footer />
        </Layout>
    );
}

export default TemplateArticle;
