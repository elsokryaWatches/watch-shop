import "./Cart.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>Watch Shop - Cart</title>
      </Helmet>
      <div className="cart">
        <div className="backgroundLayer"></div>
        <div className="container-fluid">
          <div className="cartInner row">
            <form className="cartForm col-10" action="">
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
                <label htmlFor="address" className="col-10">
                  {t("FormAddress")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="selected" className="col-10">
                  {t("selected")}
                </label>
                <textarea
                  name="selectedItems"
                  id="selected"
                  className="col-10"
                  readOnly
                  placeholder={t("cartTextArea")}
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
