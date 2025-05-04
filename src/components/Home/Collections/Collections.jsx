import "./Collections.css";
import { Link } from "react-router-dom";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Collections() {
  const [t] = useTranslation();

  return (
    <>
      <div className="collection">
        <div className="container-fluid">
          <div className="collectionInner row">
            <div className="collHeader col-12">
              <h6>{t("collectionHH6")}</h6>
              <h2>{t("collectionHH2")}</h2>
            </div>
            <div className="items row col-12">
              <div className="item fromLeft col-2">
                <img src="imgs/pepsigmt.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/gmt"}>gmt</Link>
                </button>
              </div>
              <div className="item fromLeft col-2">
                <img src="imgs/black_aquanaut.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/aquanaut"}>aquanaut</Link>
                </button>
              </div>
              <div className="item center col-2">
                <img src="imgs/panda_daytona.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/daytona"}>daytona</Link>
                </button>
              </div>
              <div className="item fromRight col-2">
                <img src="imgs/greenarabicdial.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/datejust"}>datejust</Link>
                </button>
              </div>
              <div className="item fromRight col-2">
                <img src="imgs/navy_blue_nautilus.webp" alt="" />
                <button className="itemBtn fadeIn">
                  <Link to={"/shop"}>nautilus</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
