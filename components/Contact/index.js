import styles from './Contact.module.css';
import useTranslation from 'next-translate/useTranslation';
import SMLinks from "../_UI/SMLinks"

const Contact = (props) => {
    const {t} = useTranslation();
    const className = props?.className ? props.className : ""
    const title = props?.title ? props.title : t('footer:contactVia')
    return (
        <div
            className={`${styles.Contact} Contact bg-success-light d-flex align-items-center py-2 px-5 justify-content-around flex-wrap ${className}`}>
            <h2 className="text-white">{title}</h2>
            <div className={`${styles.devider} devider bg-white`}/>
            <SMLinks row={true} className={`${styles.SMLinks} flex-row-reverse`}/>
        </div>
    )
}

export default Contact
