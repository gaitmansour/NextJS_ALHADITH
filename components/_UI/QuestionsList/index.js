import Widget from "../Widget"
import styles from './QuestionsList.module.css';
import iicon from './speech-bubblee1.png'
import Link from "next/link";

const QuestionsList = (props) => {
    const className = props?.className ? props.className : ""
    return (
        <Widget>
            <p className="tiitle">مواد ذات صلة</p>
            <div className={`${styles.SimpleList} SimpleList ${className}`}>
                {props?.data && props?.data.map((item, i) => {
                    return (
                        <Link passHref={true} href={`/article/${item.title}`}
                              key={i.toString()} className={`${styles.item}item d-flex align-items-center py-3 px-1`} style={{ borderTop: i === 0 ? "1px solid #D8D8D8" : "" }}>
                            <p className="flex-fill m-0">{item?.title}</p>
                            {props?.image && <img src={item?.image || props?.image} alt="" />}
                            {!props?.hideIcon && <img src={iicon} className="mx-2"/>}
                        </Link>
                    )
                })}
            </div>
        </Widget>
    );
}

export default QuestionsList
