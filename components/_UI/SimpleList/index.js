import Widget from "../Widget"
import styles from './SimpleList.module.css';
import Link from "next/link";

const SimpleList = (props) => {
    const className = props?.className ? props.className : ""

    return (
        <Widget>
            <div className={`${styles.SimpleList} SimpleList ${className}`}>
                {props.data && props.data?.length > 0 && props.data.map((item, i) => {
                    //  console.log('this data to show ------>',item)
                    if (item?.title == 'المصحف المحمدي') {
                        var path1 = {path: '/Almoshaf', as: '/المصحف المحمدي'}
                    } else if (item?.parentLabel == 'البرامج الإعلامية') {
                        var path1 = {path: `/media/${item?.title}`, as: `/media/${item?.title}`}
                    } else {
                        var path1 = {path: `/article/${item?.title}`, as: `/article/${item?.title}`}
                    }
                    return (
                        <Link href={{
                            pathname: path1.path,
                            query: {fromNav: props.data, selectedItem: item?.title}
                        }}
                              as={path1.as}
                              key={i.toString()}

                              style={{borderTop: i === 0 ? "1px solid #D8D8D8" : ""}}>
                            <a className={`${styles.item} item d-flex align-items-center py-3 px-1`}>
                                <p className="flex-fill m-0" onClick={() => console.log(item?.title)}>{item?.title}</p>
                                {props?.image && <img src={item?.image || props?.image} alt=""/>}
                                {!props?.hideIcon && <i className="fas fa-chevron-left mx-2"/>}
                            </a>
                        </Link>
                    )
                })}
            </div>
        </Widget>
    );
}

export default SimpleList
