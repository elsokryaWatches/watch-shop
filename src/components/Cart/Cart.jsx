import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../UpBtn/UpBtn";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function Cart() {
  const [t] = useTranslation();
  const [orderCodes, setOrderCodes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [landMark, setLandMark] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrderCodes(storedOrders);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmissionMessage(null);

    if (orderCodes.length === 0) {
      setSubmissionMessage(
        t("cartIsEmptyError") ||
          "Your cart is empty. Please add items before submitting."
      );
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      customer: {
        fullName: fullName,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        address: {
          governorate: governorate,
          city: city,
          landMark: landMark,
        },
      },

      productCodes: orderCodes,
      orderDate: new Date(),
      status: "Pending",
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      setSubmissionMessage(
        t("orderSuccessMessage") || "Order submitted successfully!"
      );

      setOrderCodes([]);
      localStorage.removeItem("orders");

      setFullName("");
      setPhoneNumber("");
      setEmailAddress("");
      setGovernorate("");
      setCity("");
      setLandMark("");
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmissionMessage(
        (t("orderErrorMessage") || "Failed to submit order: ") + error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>El Sokarya - Cart</title>
      </Helmet>
      <Navbar />
      <div className="cart">
        <div className="backgroundLayer"></div>
        <div className="container-fluid">
          <div className="cartInner row">
            <form className="cartForm col-10" onSubmit={handleSubmit}>
              <div className="header">
                <img src="/imgs/logo.svg" alt="El Sokrya Logo" />
                <h6>01550089872</h6>
              </div>
              <div className="inputContainer row">
                <label htmlFor="fullName" className="col-10">
                  {t("full name")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="governorate" className="col-10">
                  {t("gov")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="governorate"
                  id="governorate"
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="city" className="col-10">
                  {t("city")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="inputContainer row">
                <label htmlFor="land_Mark" className="col-10">
                  {t("landMark")}
                </label>
                <input
                  className="col-10"
                  type="text"
                  name="landMark"
                  id="land_Mark"
                  value={landMark}
                  onChange={(e) => setLandMark(e.target.value)}
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
                <button
                  className="submitBtn"
                  type="submit"
                  disabled={isSubmitting || orderCodes.length === 0}
                >
                  {isSubmitting
                    ? t("sending") || "Sending..."
                    : t("send") || "Send"}
                </button>

                <button className="editOrders">
                  <Link to={"/cartcheck"}>{t("editCart")}</Link>
                </button>
              </div>
              {submissionMessage && (
                <div
                  className={`submission-message mt-3 ${
                    submissionMessage.includes("Error")
                      ? "text-danger"
                      : "text-success"
                  }`}
                >
                  {submissionMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <UpBtn />
    </>
  );
}
