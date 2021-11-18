/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icons } from "../../../assets";
import useTranslation from "next-translate/useTranslation";

import styles from "./Navbar.module.css";
import _ from "lodash";
import FetchAPI from "../../../API";
import { getMenu, getMenuLinks, base_url } from "../../../endpoints";
import { getMenuLink, handleMenu } from "../../../helpers";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";

const NavBar = (props) => {
  const { t, lang } = useTranslation();

  const [showMenu, setShowMenu] = useState(false);
  const [Menu, setMenu] = useState([]);
  const [MenuGlobal, setMenuGlobal] = useState([]);
  const [MenuLinks, setMenuLinks] = useState([]);

  const url = getMenu();
  const ref = useRef();
  const scroll = () => ref && ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  const styleAlignText = `${lang === "ar" ? "text-lg-end" : "text-lg-start"}`;
  const styleDropdownToggle = `${styles.navLink} ${styles.dropdownToggle} nav-link dropdown-toggle d-flex align-items-center text-dark ${styleAlignText}`;

  const getMenuList = () => {
    FetchAPI(url).then((data) => {
      if (data.success) {
        const Menu = handleMenu(data?.data);
        setMenuGlobal(Menu);
      }
    });
  };

  const handleLinks = () => {
    getMenuLink().then((r) => setMenuLinks(r));
  };

  useEffect(() => {
    handleLinks();
    getMenuList();
  }, []);

  const renderLinksMenu = () => {
    const navLinks =
      MenuLinks &&
      MenuLinks?.map((item, index) => {
        const CustomDropDown = React.forwardRef(({ onClick }, ref) => (
          <a
            className={styleDropdownToggle}
            href=""
            ref={ref}
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}>
            {item?.label}
            {item?.items?.length > 0 && <i className="fas fa-chevron-down text-success mx-2" />}
          </a>
        ));

        // forwardRef again here!
        // Dropdown needs access to the DOM of the Menu to measure it
        const MenuDropDown = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
          if (item?.items?.length > 0) {
            return (
              <ul ref={ref} style={style} className={`${className} ${styles.dropdownMenu} dropdown-menu shadow-card overflow-hidden ${styleAlignText}`} aria-labelledby={labeledBy}>
                {item?.items?.map((data, i) => {
                  return (
                    <Link
                      passHref={true}
                      key={i.toString()}
                      exact
                      activeClassName={styles.navBarActive}
                      href={{
                        pathname: `/${data?.path}`,
                        query: { fromNav: item?.items, selectedItem: data?.title },
                      }}
                      as={`/${data?.path}`}>
                      <a className={styles.navBarActive}>
                        <li className={`btn justify-content-start rounded-0 ${styles.p3}`} onClick={() => console.log("data----", item?.items)}>
                          {data.label}
                        </li>
                      </a>
                    </Link>
                  );
                })}
              </ul>
            );
          } else {
            return null;
          }
        });

        return (
          <li className={`${styles.navItem} ${styles.dropdown} align-self-stretch d-flex dropdown mx-1 nav-item`} key={index.toString()}>
            <Dropdown>
              <Dropdown.Toggle as={CustomDropDown} />
              <Dropdown.Menu as={MenuDropDown} />
            </Dropdown>
          </li>
        );
      });
    return navLinks;
  };

  const clicked = (e) => {
    e.preventDefault();
  };

  const renderGlobalMenu = () => {
    const menuLinks =
      MenuGlobal &&
      MenuGlobal?.map((item, index) => {
        if (item?.label !== "الرئيسية") {
          return (
            <div className={`${styles.navItem} col-md-2 nav-item flex-column my-3`} key={index.toString()} ref={ref}>
              <Link id="clickable" role="button" exact activeClassName={styles.navBarActive} href="#">
                <a className={`${styles.navLink} nav-link d-flex align-items-center text-dark p-0 fw-bold ${styles.titleLink}`}> {item?.label}</a>
              </Link>
              {item?.items?.length > 0 && (
                <ul className={`m-0 p-0 d-flex flex-column align-items-start ${styles.listItems} list-items`}>
                  {item?.items?.map((data, i) => {
                    return (
                      <Link
                        key={i.toString()}
                        exact
                        passHref={true}
                        activeClassName={`${styles.navBarActive} nav-bar-active`}
                        href={{
                          pathname: `/${data?.path}`,
                          query: { fromNav: item?.items, selectedItem: data?.title },
                        }}
                        as={`/${data?.path}`}
                        onClick={() => {
                          setShowMenu(!showMenu);
                        }}>
                        <li key={i} className="btn rounded-0 mx-0 px-0">
                          {data.label}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        }
      });
    return menuLinks;
  };

  return (
    <div className={`${styles.NavBar} NavBar bg-white navbar navbar-expand-lg navbar-light p-0`}>
      <div className="container-fluid p-0">
        <div className={`btn rounded-0 p-0 border-0 align-self-stretch d-flex align-items-center justify-content-center ${styles.menuBtn} menu-btn ${styles.bgGradientGreen}bg-gradient-green`} style={props?.styleBtnBars} onClick={() => setShowMenu(!showMenu)}>
          <div className={`bg-light rounded-pill ${styles.iconBox}icon-box d-flex align-items-center justify-content-center`}>
            <i className="fas fa-bars text-dark" />
          </div>
        </div>

        <div className={`${styles.navbarCollapse} collapse navbar-collapse flex-grow-0 align-self-stretch mx-1`} id="navbarNav">
          <ul className={`${styles.navbarNav} navbar-nav align-items-center p-0 align-self-stretch pt-3`}>{renderLinksMenu()}</ul>
        </div>

        <div className={`bg-white ${styles.globalMenu} position-absolute py-3 px-4 ${showMenu ? styles.globalMenuShow : styles.globalMenuHide} overflow-hidden`}>
          <i className={`fas fa-times-circle text-white ${styles.iconClose} iconClose`} onClick={() => setShowMenu(!showMenu)} />
          <div className="row">{renderGlobalMenu()}</div>
        </div>

        <div className={`btn rounded-0 p-0 border-0 bg-warning ${styles.btnFaq} btn-faq align-self-stretch justify-content-center d-flex`}>
          <Link exact activeClassName="active" href="/pages/404.js">
            <a className="align-items-center d-flex px-4 py-2">
              <Image className={`px-1 `} src={Icons.icon_faq} alt="icon faq" />
              <h4 className="m-0 p-0  text-white">سؤال وجواب</h4>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
