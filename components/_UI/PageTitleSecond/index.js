import styles from './PageTitleSecond.module.css';

const PageTitleSecond = (props) => {
    const className = props?.className ? props.className : ""
    return (
        <div className={`${styles.PageTitleSecond} PageTitleSecond px-2 ${className}`}>
            <h2 className={`${styles.title} title m-0`}>{props?.title || ""}</h2>
        </div>
    );
}

export default PageTitleSecond
