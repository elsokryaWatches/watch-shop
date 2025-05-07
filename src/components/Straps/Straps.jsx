import ShopNav from "../ShopNav";
import "./Straps.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";

export default function Straps() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokkaria - Straps</title>
      </Helmet>
      <Navbar />
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
            <form className="strapsForm col-10" method="POST">
              <div className="inputContainer row">
                <label htmlFor="fullName" className="col-10">
                  {t("full name")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="name"
                  id="fullName"
                  required
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="phone" className="col-10">
                  {t("phone nubmer")}
                </label>
                <input
                  className="col-10"
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="email" className="col-10">
                  {t("email address")}
                </label>
                <input
                  className="col-10"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="governorate" className="col-10">
                  {t("gov")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="city" className="col-10">
                  {t("city")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="land_Mark" className="col-10">
                  {t("landMark")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="straps" className="col-10">
                  {t("strapFromTextArea")}
                </label>
                <textarea
                  name="selectedItems"
                  id="selected"
                  className="col-10"
                ></textarea>
              </div>
              <div className="submit">
                <button className="submitBtn" type="submit">
                  {t("send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
