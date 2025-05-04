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
      <div className="navBar">
        <div className="container-fluid">
          <div className="navbarInner row">
            <div className="logo col-1">
              <Link to={"/"}>
                <img src="imgs\Ofilan_Watches_Logo_Enlarged_v1.avif" alt="" />
              </Link>
            </div>
            <div className="navList col-4">
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
