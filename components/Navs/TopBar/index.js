import useTranslation from 'next-translate/useTranslation';
import Link from "next/link"
import React, {useState} from "react";
import styles from './TopBar.module.css'
import Brand from "../../_UI/Brand";
import SearchInput from "../../Forms/SearchInput";

const TopBar = (props) => {
    // console.log(props)
    const {t, i18n} = useTranslation();
    const [input, setInput] = useState('')
    const [show, setShow] = useState(false);
    const isRTL = i18n?.language === "ar"
    const title = 'التواصل'
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = []

    function handleInput(v) {
        if (typeof v == "string") {
            setInput(v)
        } else {
            setInput(v.target.value)
        }
    }

    const goToSearchPage = () => {
        if (input === '') {
            handleShow()
        } else {
            // console.log("go to")
            history && history.push({
                pathname: '/search',
                search: '',
                state: {from: 'topBar', topic: '', content: "", word: input}
            })
        }

    }

    function handleClickSearch() {
        goToSearchPage()
    }

    return (
        <div className={`${styles.TopBar} ${styles.bgGradientGreen} navbar navbar-expand-lg navbar-light px-2`}
             style={{}}>
            <div className="container-fluid">
                <Brand/>
                <SearchInput className={`${styles.search} text-white`}
                             styleIcon={{color: '#fff'}}
                             {...props}
                             onChange={(v) => handleInput(v)}
                             clickSearch={() => handleClickSearch()}
                             input={input}
                             placeholder="البحث في منصة محمد السادس للحديث النبوي الشريف"
                />

                <div className={`collapse ${styles.navbarCollapse} navbar-collapse flex-grow-0`}
                     id="navbarTop">
                    <ul className={`${styles.navbarNav} navbar-nav align-items-center`}>
                        <li className={`${styles.navItem} nav-item mx-3`}>
                            <Link exact
                                  activeClassName="active"
                                  href={`/روابط`}>{'روابط'}</Link>
                        </li>
                        <li
                            className={`${styles.navItem} nav-item mx-3 ${styles.callToAction} call-to-action align-items-center d-flex`}>
                            <Link exact
                                  activeClassName="active"
                                  href={`/${title}`}>{title}</Link>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    );
}

export default TopBar
