import styles from './ItemList.module.css'
import React, {useEffect, useState} from 'react'
import {
    FacebookIcon,
    FacebookShareButton, FacebookShareCount,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share'
import Cards from '../_UI/Cards'

const ItemList = (props) => {
    const params = props.content + `\n# الحكم : ${props.degree} \n # الراوي : ${
        props.narrator
    } \n# المصدر : ${props.source} \n# مصدر الحكم : ${
        props.sourceGlobal ? props.sourceGlobal : ''
    } \n# الموضوع : ${props.category}  \n 
  منصة محمد السادس للحديث النبوي الشريف `
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [content, setContent] = useState(params)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function handleWhatsappshare() {
        if (props.content.length > 5510) {
            handleShow()
            setMessage('hello')
            return true
        }
        return false
    }

    const className = props?.className ? props.className : ''

    const regex = /(<([^>]+)>)/ig;

    const text = props?.content.length <=5110 ? props?.content : props?.content?.substring(0, 5110).replace('\n', '').replace(regex, '').replace(/(\r\n|\n|\r)/gm, " ") + '...';
    const params2 = `${text}\n# الحكم : ${props.degree} \n # الراوي : ${
        props.narrator
    } \n# المصدر : ${props.source} \n# مصدر الحكم : ${
        props.sourceGlobal ? props.sourceGlobal : ''
    } \n# الموضوع : ${props.category}  \n 
  منصة محمد السادس للحديث النبوي الشريف `

    const toShow = params.substring(0, 251) + ' ...'
    // console.log("toShow",toShow)

    return (
        <Cards
            className={`${styles.ItemList} my-2 w-100 px-0 pb-0 ${className} ${
                styles.result
            } result ${
                props.degree === 'صحيح'
                    ? styles.bckg1
                    : props.degree === 'ضعيف'
                        ? styles.bckg2
                        : props.degree === 'موضوع'
                            ? 'bckgCard'
                            : ''
            }`}
        >
            <div className={styles.content}>
                {props.highlight ? (
                    <p className='m-0 content-hadith' dangerouslySetInnerHTML={{__html: props.text}}/>
                ) : (
                    <p className='m-0 content-hadith'>{props.text}</p>
                )}
                <div className={`${styles.metaData} meta-data mt-3`}>
                    <div
                        className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                    >
                        <p className='d-flex text-warning m-0 mb-2'>
              <span
                  className={`fw-bold ${styles.output}`}
                  style={{color: '#b17d00'}}
              >
                الحكم
              </span>
                            :{' '}
                            <span className={`${styles.resultat} fw-bold`}>
                {props.degree}
              </span>
                        </p>
                    </div>
                    <div
                        className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                    >
                        <p className='d-flex text-success m-0 mb-2'>
                            <span className={`text-success ${styles.output}`}>الراوي</span>:{' '}
                            <span className={styles.resultat}>{props.narrator}</span>
                        </p>
                    </div>
                    <div
                        className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                    >
                        <p className='d-flex m-0 mb-2'>
              <span className={styles.output} style={{color: '#b17d00'}}>
                المصدر
              </span>
                            : <span className={styles.resultat}>{props.source}</span>
                        </p>

                        {/* <div className="devider" />
            <p className="d-flex text-success m-0">
              <span className="text-success output">باب</span>:{' '}
              <span className="resultat">{props.topic}</span>
            </p> */}
                    </div>
                    <div
                        className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                    >
                        <p className='d-flex text-success m-0 mb-2'>
              <span className={`text-success ${styles.output}`}>
                مصدر الحكم
              </span>
                            :<span className={styles.resultat}>{props.sourceGlobal}</span>
                        </p>
                    </div>
                    <div
                        className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                    >
                        <p className='d-flex m-0 mb-2'>
              <span className={styles.output} style={{color: '#b17d00'}}>
                الموضوع
              </span>
                            : <span className={styles.resultat}>{props.category}</span>
                        </p>
                    </div>

                    {props.comments && (
                        <div
                            className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                        >
                            <p className='d-flex text-success m-0 mb-2'>
                                {' '}
                                <span className={`text-success ${styles.output}`}>
                  {' '}
                                    ملاحظات{' '}
                </span>
                                : <span className={styles.resultat}>{props.comments}</span>
                            </p>
                        </div>
                    )}
                    <div
                        className={`d-flex align-items-center alignItem ${styles.alignItem}`}
                    >
                        <p className='d-flex m-0 mb-2'>
                            {' '}
                            <span className={`text-success ${styles.output}`}>
                {' '}
                                رقم الحديث{' '}
              </span>
                            : <span className={styles.resultat}>{props.numeroHadith}</span>
                        </p>
                    </div>
                </div>
            </div>
            <hr/>
            <div
                className={`sm-icons d-flex align-items-center flex-row mb-2`}
                style={{alignItems: 'center'}}
            >

                <FacebookShareButton
                    openShareDialogOnClick={props.showDialog}
                    beforeOnClick={props.onSubmit}
                    url={'https://hadithm6.ma/'}
                    quote={params}
                    className='justify-content-center mx-2'
                >

                    <FacebookIcon size={32} round/>
                </FacebookShareButton>
                <FacebookShareCount url={'https://hadithm6.ma/'}/>
                <TwitterShareButton
                    url={'https://hadithm6.ma/'}
                    title={toShow}
                    className='mx-2'
                >
                    <TwitterIcon size={32} round/>
                </TwitterShareButton>
                <WhatsappShareButton
                    openShareDialogOnClick={props.showDialog}
                    beforeOnClick={props.onSubmitWTSP}
                    url={'https://hadithm6.ma/'}
                    title={params2}
                    separator={'\n'}
                    className='mx-2'
                >
                    <WhatsappIcon size={32} round/>
                </WhatsappShareButton>
            </div>


        </Cards>
    )
}

export default ItemList
