import Contact from '../Contact/index'
import Brand from '../_UI/Brand'
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import {getMenuLink} from "../../helpers";
import {useEffect, useState} from "react";
import FetchAPIData from './API'
import {newsletter} from '../../endpoints'
import CustomModal from '../_UI/Modal'
import styles from './Footer.module.css'

const Footer = () => {
    const [MenuLinks, setMenuLinks] = useState([])
    const [inputEmail, setInputEmail] = useState('')
    const [show, setShow] = useState(false);
    const [sendSuccess, setsendSuccess] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const urlSubscribe = newsletter()
    const {t} = useTranslation('footer');
    const title = t('importantLinks')
    const handleLinks = () => {
        getMenuLink().then((r) => {
            setMenuLinks(r)
            // console.log('rrrr-------------------------',r)
        })
    }

    const subscribed = async () => {
        const data =
            {
                "apikey": "d38b503de172d45b4d194857cbe16d19-us5",
                "email_address": inputEmail,
                "status": "subscribed"
            }
        return FetchAPIData(urlSubscribe, data).then(data => {
            // console.log('data-------|-------',data)
            if (data.success) {
                // console.log('submit-------------',data.success)

                setsendSuccess(true)


            } else {
                console.log('else', data.success)
                handleShow()
            }
        })
    }

    const handleSubscribe = () => {
        if (!inputEmail) {
            handleShow()
        } else {
            subscribed()
        }
    }

    useEffect(() => {
        handleLinks()
    }, [])

    return (
        <div className={`${styles.Footer} Footer bg-app overflow-hidden`}>
            <Contact/>
            <div className={`${styles.footerContainer} footer-container overflow-hidden w-100`}>
                <div className={`${styles.bgFooter} bgFooter w-100 h-100`}/>
                <div className={`${styles.footer} footer w-100 h-100`}>
                    <div className="row p-3">
                        <div className={`col col-lg-3 col-md-12 col-sm-1 d-flex justify-content-center brd`}>
                            <Brand className={` ${styles.brand}brand`}/>
                        </div>
                        <div className="col col-12 col-lg-3 col-md-4 col-sm-1 mt-5 mb-3">
                            <h5 className="text-white pb-3">{title}</h5>
                            <ul className="p-0">
                                <p className={`${styles.FooterLink}`}>
                                    <Link href={`/${t('footer:links')}`} >{t('links')}</Link>
                                </p>
                                <p className={`${styles.FooterLink}`}>
                                    <Link href={`/${t('footer:contact')}`}>{t('contact')}</Link>
                                </p>
                                <p className={`${styles.FooterLink}`}>
                                    <Link href={`/${t('footer:Conditions_utilisation')}`}>{t('footer:Conditions_utilisation')}</Link>
                                </p>
                            </ul>
                        </div>
                        <div className="col col-12 col-lg-3 col-md-4 col-sm-1 mt-5 mb-3">
                            <h5 className="text-white pb-3">{t('footer:contactVia')}</h5>
                            <ul className="p-0">
                                <p className={`${styles.FooterLink}`}
                                   style={{
                                       color: '#FEB400',
                                       marginBottom: '20%'
                                   }}>{t('footer:phone')}
                                </p>
                                <p className={styles.FooterLink}>
                                    <Link href='/'>{t('footer:phone1')}</Link>
                                </p>
                                <p className={`${styles.FooterLink}`}
                                   style={{
                                       color: '#FEB400',
                                       marginBottom: '20%'
                                   }}>
                                    {t('footer:email')}
                                </p>
                                <p className={`${styles.FooterLink}FooterLink email`} style={{color:'#fff'}}>
                                    {'contact@hadithnabawicharif.gov.ma'}
                                </p>
                            </ul>
                        </div>
                        <div
                            className={`${styles.newsletter}col col-12 col-lg-3 col-md-4 col-sm-1 mt-5 mb-3 newsletter`}>
                            {sendSuccess && (<div className="mb-3 border-success"
                                                  style={{
                                                      borderColor: '#fff',
                                                      borderRadius: 5,
                                                      backgroundColor: '#44b27c',
                                                      width: '80%'
                                                  }}>
                                <div className="card-body text-white">
                                    شكرا لإشتراكك في القائمة البريدية
                                </div>
                            </div>)
                            }
                            <h5 className="text-white pb-3">{t('footer:Newsletter')}</h5>
                            <div className="p-0 form">
                                <div className="form-group">
                                    <label form="exampleInputEmail1"
                                           className="form-label text-white ">{t('footer:email')}</label>
                                    <input type="email"
                                           className="form-control"
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           placeholder={t('footer:email')}
                                           onChange={(v) => setInputEmail(v.target.value)}/>
                                </div>
                                <div className="d-grid my-3">
                                    <button className={`${styles.send} btn btn-lg send`}
                                            type="button"
                                            style={{backgroundColor: "#129D59",
                                                boxShadow: 10,
                                                borderRadius: 30,
                                                color: "#fff"}}
                                            onClick={handleSubscribe}>{t('footer:send')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.copyright} copyright text-center p-3`}>
                        <p className={`${styles.copyr} copyr text-white m-0`}>منصة محمد السادس للحديث النبوي الشريف-
                            جميع الحقوق محفوظة - 2021 © </p>
                    </div>
                </div>
            </div>
            <CustomModal title={'تنبيه'}
                         body={' يرجى ملء الإستمارة ببريد إلكتروني غير مشترك أو التحقق من بريدك الإلكتروني '}
                         show={show} onHide={handleClose} onClick={handleClose}/>
        </div>
    );
}

export default Footer
