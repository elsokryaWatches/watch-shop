import "./Header.css";
import { Link } from "react-router-dom";

import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [t] = useTranslation();
  return (
    <>
      <div className="header">
        <div className="backgroundLayer">
          <img src="/imgs/Ofilan_Watches_Web_Banner_1.webp" alt="" />
        </div>
        <div className="container-fluid">
          <div className="headerInner">
            <div className="textOverlay">
              <h5>{t("headerH5")}</h5>
              <h2>{t("headerH2")}</h2>
              <button className="headerBtn">
                <Link to={"/shop"}>{t("headerBtn")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
