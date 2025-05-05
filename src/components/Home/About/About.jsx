import "./About.css";
import { Link } from "react-router-dom";

import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function About() {
  const [t] = useTranslation();

  return (
    <>
      <div className="about">
        <div className="container-fluid">
          <div className="aboutInner row">
            <div className="img fadeIn col-md-10 col-lg-4">
              <img src="imgs/Untitled_design_1.webp" alt="" />
            </div>
            <div className="text col-md-10 col-lg-6">
              <h2>{t("about us")}</h2>
              <p>{t("aboutUsDesc")}</p>
              <button className="aboutBtn">
                <Link to={"/contact"}>{t("contact")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
