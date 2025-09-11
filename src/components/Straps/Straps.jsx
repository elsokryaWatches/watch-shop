import ShopNav from "../ShopNav";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Straps() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokarya - Straps</title>
      </Helmet>
      <div className="shop">
        <div className="container-fluid">
          <div className="shopInner row">
            <div className="shopHeader col-12">
              <div className="backgroundLayer">
                <img src="/imgs/straps-Bg.jpg" alt="" />
              </div>
              <div className="textLayer">
                <h2>{t("straps")}</h2>
              </div>
            </div>
            <ShopNav />
            <div className="strapes row col-12">
              <div className="soonText col-12">
                <h1>{t("soon")}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
