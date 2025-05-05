import "./Contact.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import UpBtn from "../upBtn/UpBtn";

export default function Contact() {
  const [t] = useTranslation();

  return (
    <>
      <div className="contact">
        <div className="backgroundLayer"></div>
        <div className="container-fluid">
          <div className="contactInner row">
            <form className="contactForm col-10" action="">
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
                <label htmlFor="msg" className="col-10">
                  {t("your message")}
                </label>
                <textarea
                  className="col-10"
                  name="msg"
                  id="msg"
                  rows={10}
                  required
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
