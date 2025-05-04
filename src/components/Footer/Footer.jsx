import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

import "../../i18n";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const [t] = useTranslation();

  return (
    <>
      <div className="footer center">
        <div className="container-fluid">
          <div className="footerInner row">
            <div className="footerSec col-3">
              <h3>{t("contact")}</h3>
              <ul className="footerList">
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://www.facebook.com"}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                    <span>facebook.com</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://www.Instagram.com"}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                    <span>instagram.com</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://www.Pinterest.com"}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faPinterest} />
                    <span>Pinterest.com</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>01033926177</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>watchshop@gmail.com</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://maps.app.goo.gl/FZDL3sZzJ8BUYerJ7"}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{t("address")}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerSec col-3">
              <h3>{t("our products")}</h3>
              <ul className="footerList">
                <li className="FooterListItem">
                  <Link className="FooterLink" to={"/men"}>
                    {t("men watches")}
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink" to={"/women"}>
                    {t("women watches")}
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink" to={"/young"}>
                    {t("young watches")}
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink" to={"/wallets"}>
                    {t("wallets")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerSec col-3">
              <h3>{t("arabicHH6")}</h3>
              <div className="gallery row">
                <div className="img col-4">
                  <img src="imgs/greenarabicdial.webp" alt="" />
                </div>
                <div className="img col-4">
                  <img src="imgs/IMG_4958.webp" alt="" />
                </div>
                <div className="img col-4">
                  <img
                    src="imgs/TwoToneRoseGoldChocolateDial_06f7ac83-3783-459f-9de0-7e612ac84f64.webp"
                    alt=""
                  />
                </div>
                <div className="img col-4">
                  <img src="imgs/Untitleddesign_9_1.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
