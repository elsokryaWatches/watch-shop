import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import CollectionsNav from "../CollectionNav";

export default function Daytona() {
  const [t] = useTranslation();

  return (
    <>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <CollectionsNav />
            <div className="Watches row col-12">
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/aqua_marine_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/black_panda_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/black_white_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/chameleon_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/champagne_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/chocolate_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/emerald_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/golden_jade.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/platinum_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/rose_gold_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/royal_blue_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/two_tone_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
            </div>
            <div className="toCart col-10">
              <button className="toCartBtn">
                <Link to={""}>{t("to cart")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
