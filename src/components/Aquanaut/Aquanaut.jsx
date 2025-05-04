import { Link } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";

export default function Aquanaut() {
  const [t] = useTranslation();

  return (
    <>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="Watches row col-12">
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/chocolateaquanaut.webp" alt="" />
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
                    src="imgs/IMG_3823_393b27ce-9890-4508-b972-522cd1dd31ed.webp"
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
                  <img src="imgs/navyblueaquanaut.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/olivegreenaquanaut.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/silveraquanaut.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/tiffanyblueaquanaut.webp" alt="" />
                </div>
                <div className="info">
                  <h6>seiko royal green arabic dial mod</h6>
                  <h5>1500 EGP</h5>
                  <button className="addBtn">{t("add to cart")}</button>
                </div>
              </div>
              <div className="watchItem center col-3">
                <div className="img">
                  <img src="imgs/black_aquanaut.webp" alt="" />
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
