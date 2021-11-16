import NavBar from '../Navs/Navbar';
import TopBar from '../Navs/TopBar';
import Layout from '../Layout';
import Footer from '../Footer';
import Breadcrumb from '../_UI/Breadcrumb';
import PageTitle from '../_UI/PageTitle';
import styles from './TemplateArticle.module.css'
import { Backgrounds } from "../../assets"


const TemplateArticle = (props) => {
    return (
        <Layout className={`${styles.TemplateArticle}TemplateArticle`}>
            <TopBar {...props} />
            <NavBar />
            <div className={`${styles.templateHeader}template-header position-relative pb-2`} >
                <div className={`${styles.bg_dashed} bg_dashed h-100 position-absolute w-100`}
                     style={{ backgroundImage: `url(${Backgrounds.bg_dashed})` }} />
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
