import "./Arabic.css";
import { Link } from "react-router-dom";

import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Arabic() {
  const [t] = useTranslation();

  return (
    <>
      <div className="arabicColl">
        <div className="container-fluid">
          <div className="arabCollInner row">
            <div className="arCollHeader col-12">
              <h6>{t("arabicHH6")}</h6>
              <h2>{t("arabicHH2")}</h2>
            </div>
            <div className="items row col-12">
              <div className="item center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/greenarabicdial.webp" alt="" />
                </div>
                <h6>seiko royal green arabic dial mod</h6>
              </div>
              <div className="item center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/IMG_4958.webp" alt="" />
                </div>
                <h6>seiko olive green arabic dial mod</h6>
              </div>
              <div className="item center col-md-5 col-lg-3">
                <div className="img">
                  <img
                    src="imgs/TwoToneRoseGoldChocolateDial_06f7ac83-3783-459f-9de0-7e612ac84f64.webp"
                    alt=""
                  />
                </div>
                <h6>seiko chocolate arabic dial</h6>
              </div>
              <div className="item center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/Untitleddesign_9_1.webp" alt="" />
                </div>
                <h6>seiko white textured arabic dial mod</h6>
              </div>
            </div>
            <div className="toShop center col-10">
              <button className="arabicBtn">
                <Link to={"/shop"}>{t("arabicBtn")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
