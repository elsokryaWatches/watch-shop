import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import CollectionsNav from "../CollectionNav";
import UpBtn from "../upBtn/UpBtn";

export default function Gmt() {
  const [t] = useTranslation();

  return (
    <>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <CollectionsNav />
            <div className="Watches row col-12">
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img
                    src="imgs/batgirlgmt_f430153f-92c6-4b78-817a-6f833b89e1a1.webp"
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
                  <img src="imgs/batmangmt.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/cokegmt.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/goldgmt.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/rootbeergmt.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/spritegmt.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/twotonegmt.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-md-5 col-lg-3">
                <div className="img">
                  <img src="imgs/pepsigmt.webp" alt="" />
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
      <UpBtn />
    </>
  );
}
