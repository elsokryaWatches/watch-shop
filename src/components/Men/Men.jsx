import { Link } from "react-router-dom";
import ShopNav from "../ShopNav";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Men() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>Watch Shop - Men Collection</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img src="/imgs/pexels-pixabay-277319.jpg" alt="" />
              </div>
              <div className="textLayer">
                <h2>{t("men watches")}</h2>
              </div>
            </div>
            <ShopNav />
            <div className="Watches row col-12">
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/black_aquanaut.webp" alt="" />
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
                    src="imgs/black_royal_oak_8dba3736-a84e-4704-aa62-7b7d8c202855.webp"
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
                  <img src="imgs/navy_blue_nautilus.webp" alt="" />
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
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img
                    src="imgs/black_royal_oak_8dba3736-a84e-4704-aa62-7b7d8c202855.webp"
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
                  <img src="imgs/WhiteSeikoSantosMod.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/Untitleddesign_9_1.webp" alt="" />
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
