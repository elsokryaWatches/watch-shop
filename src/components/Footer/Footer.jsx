import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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
            <div className="footerSec col-10">
              <h3>{t("contact")}</h3>
              <ul className="footerList">
                <li className="FooterListItem">
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
                </li>
                <li className="FooterListItem">
                  <Link className="FooterLink">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>elsokryaforwatches@gmail.com</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
