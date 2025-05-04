import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import "./Navbar.css";
import Flag from "react-world-flags";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Navbar() {
  const [t, i18n] = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const handleLangChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };
  return (
    <>
      {/* offcanvas */}
      <button
        className="btn offCanvTrigger"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            <Link to={"/"}>
              <img src="imgs/Ofilan_Watches_Logo_Enlarged_v1.avif" alt="" />
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="offcanvasList">
            <li className="offCanvItem">
              <Link className="offcanvLink" to={"/"}>
                {t("home")}
              </Link>
            </li>
            <li className="offCanvItem">
              <Link className="offcanvLink" to={"/contact"}>
                {t("contact")}
              </Link>
            </li>
            <li className="offCanvItem dropdown">
              <Link
                className="offcanvLink dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to={"/shop"}
              >
                {t("shop")}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/men"}>
                    {t("men watches")}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/women"}>
                    {t("women watches")}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/young"}>
                    {t("young watches")}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/wallets"}>
                    {t("wallets")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="offCanvItem dropdown">
              <Link
                className="offcanvLink dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to={"/shop"}
              >
                {t("collectionHH2")}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/gmt"}>
                    gmt
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/aquanaut"}>
                    aquanaut
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/daytona"}>
                    daytona
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/datejust"}>
                    datejust
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/nautilus"}>
                    nautilus
                  </Link>
                </li>
              </ul>
            </li>
            <li className="offCanvItem dropdown">
              <Link
                className="offcanvLink dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("langauge")}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => handleLangChange("en")}
                  >
                    {t("english")} <Flag code="gb" height="10" />
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => handleLangChange("ar")}
                  >
                    {t("arabic")} <Flag code="eg" height="10" />
                  </Link>
                </li>
              </ul>
            </li>
          </div>

          <div className="offcanvFooter row">
            <div className="offFooterHeader col-12">
              <h3>{t("contact")}</h3>
            </div>
            <div className="offFooterBody col-12">
              <div className="socials">
                <Link
                  className="offcanvFooterLink"
                  to={"https://www.facebook.com"}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link
                  className="offcanvFooterLink"
                  to={"https://www.Instagram.com"}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  className="offcanvFooterLink"
                  to={"https://www.Pinterest.com"}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faPinterest} />
                </Link>
              </div>
              <div className="cont">
                <Link className="offcanvFooterLink">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>01033926177</span>
                </Link>
                <Link className="offcanvFooterLink">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>watchshop@gmail.com</span>
                </Link>
                <Link
                  className="offcanvFooterLink"
                  to={"https://maps.app.goo.gl/FZDL3sZzJ8BUYerJ7"}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{t("address")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* navbar */}
      <div className="navBar">
        <div className="container-fluid">
          <div className="navbarInner row">
            <div className="logo col-1">
              <Link to={"/"}>
                <img src="imgs\Ofilan_Watches_Logo_Enlarged_v1.avif" alt="" />
              </Link>
            </div>
            <div className="navList col-5">
              <li className="navItem">
                <Link className="navLink" to={"/"}>
                  {t("home")}
                </Link>
              </li>
              <li className="navItem">
                <Link className="navLink" to={"/contact"}>
                  {t("contact")}
                </Link>
              </li>
              <li className="navItem dropdown">
                <Link
                  className="navLink dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={"/shop"}
                >
                  {t("shop")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/men"}>
                      {t("men watches")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/women"}>
                      {t("women watches")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/young"}>
                      {t("young watches")}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/wallets"}>
                      {t("wallets")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="navItem dropdown">
                <Link
                  className="navLink dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={"/shop"}
                >
                  {t("collectionHH2")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/gmt"}>
                      gmt
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/aquanaut"}>
                      aquanaut
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/daytona"}>
                      daytona
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/datejust"}>
                      datejust
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/nautilus"}>
                      nautilus
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="navItem dropdown">
                <Link
                  className="navLink dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("langauge")}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => handleLangChange("en")}
                    >
                      {t("english")} <Flag code="gb" height="10" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => handleLangChange("ar")}
                    >
                      {t("arabic")} <Flag code="eg" height="10" />
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
