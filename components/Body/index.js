import styles from './Body.module.css';

const Body = (props) => {
    const className = props?.className ? props.className : ""
    return (
        <div id={props.id} className={`${styles.m6Body} m6-Body flex-fill ${className}`}>
            {props.children}
        </div>
    );
}

export default Body
