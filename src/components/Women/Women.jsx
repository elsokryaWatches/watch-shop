import { Link } from "react-router-dom";
import ShopNav from "../ShopNav";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../upBtn/UpBtn";

export default function Women() {
  const [t] = useTranslation();

  return (
    <>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img src="/imgs/pexels-the-5th-50003-179909.jpg" alt="" />
              </div>
              <div className="textLayer">
                <h2>{t("women watches")}</h2>
              </div>
            </div>
            <ShopNav />
            <div className="Watches row col-12">
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img
                    src="imgs/8df3f1cd-4e35-485c-b42a-48ac6f350151_png.webp"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
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
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img
                    src="imgs/a66f7f41-de5e-4379-b2f3-3381e2b352a8_png.webp"
                    alt=""
                  />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/chameleon_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/chocolate_daytona.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/chocolateaquanaut.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/IMG_1283.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/IMG_1285.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/IMG_4957.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/IMG_4958.webp" alt="" />
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
                <Link to={"cart"}>{t("to cart")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
