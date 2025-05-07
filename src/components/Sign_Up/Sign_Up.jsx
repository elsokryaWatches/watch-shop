import "./Sign_Up.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";
import LogNav from "../LogNav";

export default function Sign_Up() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokkaria - Sign Up</title>
      </Helmet>
      <Navbar />
      <div className="signup">
        <div className="container-fluid">
          <LogNav />
          <form className="signupForm" method="POST">
            <div className="inputContainer row">
              <label className="col-10" htmlFor="username">
                {t("username")}
              </label>
              <input
                className="col-10"
                type="text"
                id="username"
                name="userName"
                required
              />
            </div>
            <div className="inputContainer row">
              <label className="col-10" htmlFor="email">
                {t("email address")}
              </label>
              <input
                className="col-10"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="inputContainer row">
              <label className="col-10" htmlFor="password">
                {t("password")}
              </label>
              <input
                className="col-10"
                type="password"
                id="password"
                name="passWord"
                required
              />
            </div>
            <button type="submit" name="send" className="signUpBtn">
              {t("signup")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
