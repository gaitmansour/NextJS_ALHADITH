import styles from './Widget.module.css';

const Widget = (props) => {
    const className = props?.className ? props.className : ""
    return (
        <div className={`Widget pb-3 ${className}`}>
            {props?.title && <h4 className={`${styles.WidgetTitle} Widget-title pb-3`}>{props?.title}</h4>}
            {props.children}
        </div>
    );
}

export default Widget
