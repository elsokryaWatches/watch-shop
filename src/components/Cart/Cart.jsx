import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";

export default function Cart() {
  const [t] = useTranslation();
  const [orderCodes, setOrderCodes] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrderCodes(storedOrders);
  }, []);

  return (
    <>
      <Helmet>
        <title>El Sokrya - Cart</title>
      </Helmet>
      <Navbar />
      <div className="cart">
        <div className="backgroundLayer"></div>
        <div className="container-fluid">
          <div className="cartInner row">
            <form className="cartForm col-10" method="POST">
              <div className="header">
                <img src="imgs/logo.svg" alt="" />
                <h6>01550089872</h6>
              </div>
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
                  id="governorate"
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
                  id="city"
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
                  id="land_Mark"
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
                  value={orderCodes.join(", ")}
                ></textarea>
              </div>

              <div className="submit">
                <button className="submitBtn" type="submit">
                  {t("send")}
                </button>

                <button className="editOrders">
                  <Link to={"/cartcheck"}>{t("editCart")}</Link>
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
