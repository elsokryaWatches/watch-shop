import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import CollectionsNav from "../CollectionNav";

export default function Nautilus() {
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
                  <img
                    src="imgs/3c3ed1e6-6894-48bd-9339-7c82202768c0_png.webp"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img
                    src="imgs/9c3682d1-3c49-4c77-8646-8280a6cf8103_png.webp"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img
                    src="imgs/18c89bd5-cdf6-4930-afda-494323253aaf_png.webp"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img
                    src="imgs/blacknautilus_b357a5e7-8188-4bd8-8f24-077698962996.webp"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/IMG_1283.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/IMG_1284.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/IMG_1285.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/IMG_1286.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/IMG_1288.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/RoyalGreenNautilus.webp" alt="" />
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
