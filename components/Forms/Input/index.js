import styles from './Input.module.css';

const Input = (props) => {

    const className = props?.className ? props.className : ""
    const {message, label,} = props

    return (
        <div className={`${styles.customInput} custom-input flex-fill ${className}`}>
            <div className="d-flex flex-column flex-fill mb-3 px-2">
                {label && <label className={`${styles.formLabel} form-label`}>{label}</label>}
                <input {...props} className="form-control"/>
                {message && <div className="form-text">{"We'll never share your email with anyone else."}</div>}
            </div>
        </div>
    );
}

export default Input
