import styles from './Layout.module.css';
import useTranslation  from 'next-translate/useTranslation';

const Layout = (props) => {
    const { i18n } = useTranslation();
    const isRTL = i18n?.language === "ar"
    const className = props?.className ? props.className : ""

    return (
        <div dir={'rtl'} lang={'ar'}  className={`${styles.layout} d-flex flex-column flex-fill bg-layout ${className}`}>
            {props.children}
        </div>
    );
}

export default Layout
