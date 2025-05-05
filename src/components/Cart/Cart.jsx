import "./Cart.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../upBtn/UpBtn";

export default function Cart() {
  return (
    <>
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
                  {t("formAddress")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
