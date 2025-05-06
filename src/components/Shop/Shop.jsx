import { Link } from "react-router-dom";
import ShopNav from "../ShopNav";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Shop() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokkaria - Shop</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
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
