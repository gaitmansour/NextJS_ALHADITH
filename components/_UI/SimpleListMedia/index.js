import Widget from "../Widget"
import styles from './SimpleListMedia.module.css';
import Image from 'next/image'

const SimpleListMedia = (props) => {
    const className = props?.className ? props.className : ""
    return (
        <Widget>
            <div className={`SimpleList ${className}`}>
                {props.data && props.data?.length > 0 && props.data.sort((a, b) => a.weight < b.weight ? 1 : -1).map((item, i) => {
                    var path1 = `/media/${item?.title}`
                    return (
                        <a href={path1}
                           key={i.toString()}
                           className={`${styles.item} item  d-flex align-items-center py-3 px-1`}
                           style={{borderTop: i === 0 ? "1px solid #D8D8D8" : ""}}>
                            <p className="paragraph text-decoration-none text-black flex-fill m-0"
                               onClick={() => console.log(item?.title)}>{item?.title}</p>
                            {props?.image && <Image
                                src={item?.image || props?.image} alt=""/>}
                            {!props?.hideIcon && <i className="fas text-black fa-chevron-left mx-2"/>}
                        </a>
                    )
                })}
                <hr className={'text-black'}/>
            </div>
        </Widget>
    );
}

export default SimpleListMedia
