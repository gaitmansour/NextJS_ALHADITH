import NavBar from '../Navs/Navbar';
import TopBar from '../Navs/TopBar';
import Layout from '../Layout';
import Footer from '../Footer';
import Breadcrumb from '../_UI/Breadcrumb';
import PageTitle from '../_UI/PageTitle';

import { Backgrounds } from "../../../assets"

import "./PrayTimes.module.css"

const TemplateArticle = (props) => {
    return (
        <Layout className="TemplateArticle">
            <TopBar {...props} />
            <NavBar />
            <div className="template-header position-relative pb-2" >
                <div className="bg_dashed h-100 position-absolute w-100" style={{ backgroundImage: `url(${Backgrounds.bg_dashed.default})` }} />
                <Breadcrumb data={props?.ListBreadcrumb} />
                <PageTitle className="pb-0 titre"  title={props?.titlePage}
                           dateArticle={props?.dateArticlePage}
                           created={props?.createdArticle}/>
            </div>
            {props.children}
            <Footer />
        </Layout>
    );
}

export default TemplateArticle;
