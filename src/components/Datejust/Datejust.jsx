import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import CollectionsNav from "../CollectionNav";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Datejust() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokkaria - Datejust Collection</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <CollectionsNav />
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
                    src="imgs/755dd201-901e-4427-8046-05cd03ad93e5_png.webp"
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
                  <img src="imgs/blackarabicdial.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/greyromandial.webp" alt="" />
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
                  <img
                    src="imgs/IMG_7055_dbc0d3f6-2db7-4461-a1ca-e5ec6c716abb.webp"
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
                  <img src="imgs/royalgreenromandial.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/Skybluearabicdial.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/skyblueromandial.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/wimbledondatejust.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/greenarabicdial.webp" alt="" />
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
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img
                    src="imgs/TwoToneRoseGoldChocolateDial_06f7ac83-3783-459f-9de0-7e612ac84f64.webp"
                    alt=""
                  />
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
                <Link to={"/cart"}>{t("to cart")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
