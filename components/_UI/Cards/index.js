import styles from './Cards.module.css';

const Cards = (props) => {
    return (
        <div className={`my-4 overflow-hidden p-4 rounded-3 shadow-card ${props?.className ? props.className : ""}`}
             style={{
                 backgroundColor: '#FFFFFF',
                 borderRadius: 17
             }}>
            {props?.children}
        </div>
    );
}

export default Cards
