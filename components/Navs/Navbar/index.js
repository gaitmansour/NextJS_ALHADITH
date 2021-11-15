import {useEffect, useRef, useState} from "react"
import Link from 'next/link'
import {Icons} from "../../../assets"

import styles from './Navbar.module.css';
import _ from "lodash";
import FetchAPI from "../../../API";
import {getMenu, getMenuLinks, base_url} from "../../../endpoints";
import {getMenuLink, handleMenu} from "../../../helpers";

const NavBar = (props) => {

    const [showMenu, setShowMenu] = useState(false)
    const [Menu, setMenu] = useState([])
    const [MenuGlobal, setMenuGlobal] = useState([])
    const [MenuLinks, setMenuLinks] = useState([])

    const url = getMenu();

    const getMenuList = () => {
        FetchAPI(url).then(data => {
            if (data.success) {
                const Menu = handleMenu(data?.data)
                setMenuGlobal(Menu)
            }
        })
    }

    const handleLinks = () => {
        getMenuLink().then((r) => setMenuLinks(r))
    }

    useEffect(() => {

        handleLinks()
        getMenuList()
    }, [])


    const ref = useRef();
    const scroll = () =>
        ref && ref.current && ref.current.scrollIntoView({behavior: "smooth"});

    const renderLinksMenu = () => {
        const navLinks = MenuLinks && MenuLinks?.map((item, index) => {
            //console.log('--------menu',item)
            return (
                <li className={`${styles.navItem} ${styles.dropdown} align-self-stretch d-flex dropdown mx-1 nav-item`}
                    key={index.toString()} ref={ref}>
                    <Link
                        className={`${styles.navLink} ${styles.dropdownToggle} nav-link dropdown-toggle d-flex align-items-center text-dark`}
                        id={`menuLink-${index}`} role="button"
                        data-bs-toggle="dropdown" aria-expanded="false" exact href="#">
                        {item?.label}
                        {/*item?.items?.length > 0 && <i className="fas fa-chevron-down text-success"></i>*/}
                    </Link>

                    {item?.items?.length > 0 &&
                    <ul className={`${styles.dropdownMenu} dropdown-menu  shadow-card overflow-hidden`}
                        aria-labelledby={`menuLink-${index}`}>
                        {item?.items?.map((data, i) => {
                            return <Link key={i.toString()} exact activeClassName={styles.navBarActive} href={{
                                pathname: `/${data?.path}`,
                                search: '',
                                hash: '',
                                state: {fromNav: item?.items, selectedItem: data?.title}
                            }}>
                                {/*to={`/${data?.path}`} >*/}
                                <li className={`btn justify-content-start rounded-0 ${styles.p3}`}
                                    onClick={() => console.log('data----', item?.items)}>{data.label}</li>
                            </Link>
                        })}
                    </ul>
                    }
                </li>
            )
        })
        return navLinks
    }

    const clicked = (e) => {
        e.preventDefault()
        // console.log("left < click")
        // var element = document.querySelector("#navbarNav > ul")
        // console.log(element)
        // element.scrollTop -= 10;
        // // element.scroll({
        // //     right: 100,
        // //     behavior: 'smooth'
        // // });
    }

    const renderGlobalMenu = () => {
        const menuLinks = MenuGlobal && MenuGlobal?.map((item, index) => {
            if (item?.label !== "الرئيسية") {
                return (
                    <div className={`${styles.navItem} col-md-2 nav-item flex-column my-3`} key={index.toString()} ref={ref}>
                        <Link
                            className={`${styles.navLink} nav-link d-flex align-items-center text-dark p-0 fw-bold title-link`}
                            id="clickable" role="button" exact activeClassName={styles.navBarActive} href="#">
                            {item?.label}
                        </Link>
                        {item?.items?.length > 0 &&
                        <ul className={`m-0 p-0 d-flex flex-column align-items-start ${styles.listItems} list-items`}>
                            {item?.items?.map((data, i) => {
                                return <Link key={i.toString()} exact activeClassName={`${styles.navBarActive}nav-bar-active`} href={{
                                    pathname: `/${data?.path}`,
                                    search: '',
                                    hash: '',
                                    state: {fromNav: item?.items, selectedItem: data?.title}
                                }}
                                             onClick={() => {
                                                 setShowMenu(!showMenu);
                                             }}>
                                    <li key={i} className="btn rounded-0 mx-0 px-0">{data.label}</li>
                                </Link>
                            })}
                        </ul>
                        }
                    </div>
                )
            }
        })
        return menuLinks
    }

    return (
        <div className={`${styles.NavBar} NavBar bg-white navbar navbar-expand-lg navbar-light p-0`}>
            <div className="container-fluid p-0">
                <div
                    className={`btn rounded-0 p-0 border-0 align-self-stretch d-flex align-items-center justify-content-center ${styles.menuBtn} menu-btn ${styles.bgGradientGreen}bg-gradient-green`}
                    style={props?.styleBtnBars} onClick={() => setShowMenu(!showMenu)}>
                    <div className={`bg-light rounded-pill ${styles.iconBox}icon-box d-flex align-items-center justify-content-center`}>
                        <i className="fas fa-bars text-dark"/>
                    </div>
                </div>

                <div className={`${styles.navbarCollapse} collapse navbar-collapse flex-grow-0 align-self-stretch mx-5`}
                     id="navbarNav">
                    <ul className={`${styles.navbarNav} navbar-nav align-items-center p-0 align-self-stretch`}>
                        {renderLinksMenu()}
                    </ul>
                </div>
                <div
                    className={`bg-white ${styles.globalMenu} position-absolute py-3 px-4 ${showMenu ? styles.globalMenuShow : styles.globalMenuHide} overflow-hidden`}>
                    <i className={`fas fa-times-circle text-white ${styles.iconClose} iconClose`}
                       onClick={() => setShowMenu(!showMenu)}/>
                    <div className="row">
                        {/*renderGlobalMenu()*/}
                    </div>
                </div>

                {/*  <div className="d-flex px-8 navBtnSwitch">
                    <p>  </p>
                   <div className="btn border-0 p-1" onClick={(e) => scroll(e)}>
                        <i className="fas fa-chevron-right text-disable"></i>
                    </div>
                        <div className="btn border-0 p-1" onClick={(e) => clicked(e)}>
                        <i className="fas fa-chevron-left text-dark"></i>
                        </div>
                </div>*/}

                <div
                    className={`btn rounded-0 p-0 border-0 bg-warning ${styles.btnFaq} btn-faq align-self-stretch justify-content-center d-flex`}>
                    <Link className='align-items-center d-flex px-4 py-2' exact activeClassName="active"
                          href='/pages/404.js'>
                        {/*<img className="logo mx-3" src={Icons.icon_faq.default} alt="icon faq"/>*/}
                        <h4 className="m-0 p-0 text-white">سؤال وجواب</h4>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar
