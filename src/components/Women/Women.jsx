import { Link } from "react-router-dom";
import ShopNav from "../ShopNav";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Women() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokkaria - Women Collection</title>
      </Helmet>
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
            <div className="Watches row col-12"></div>
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
