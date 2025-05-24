import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
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
            <div className="footerSec col-lg-5 col-12">
              <h3>{t("contact")}</h3>
              <ul className="footerList">
                <li className="FooterListItem">
                  <a
                    className="FooterLink"
                    href="https://wa.me/201550089872?text=أنا%20عميل%20اون%20لاين"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <span>{t("whatsapp")}</span>
                  </a>
                </li>
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://t.me/+UGdVEHUgToXTtkzi"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTelegram} />
                    <span>{t("telegram")}</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://www.facebook.com/share/15gycfcaZc/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                    <span>{t("facebook")}</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link
                    className="FooterLink"
                    to={"https://www.instagram.com/elsokrya_for_watches"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                    <span>{t("instagram")}</span>
                  </Link>
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>01550089872</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerSec col-lg-5 col-12">
              <h3>{t("about us")}</h3>
              <p>{t("aboutUsDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
