import "./Log_In.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";
import LogNav from "../LogNav";

export default function Log_In() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>El Sokkaria - Log In</title>
      </Helmet>
      <Navbar />
      <div className="logIn">
        <div className="container-fluid">
          <LogNav />
          <form className="logInForm" method="POST">
            <div className="inputContainer row">
              <label className="col-10" htmlFor="username">
                {t("username")}
              </label>
              <input
                className="col-10"
                type="text"
                id="username"
                name="LogInUserName"
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
                name="logInPassWord"
                required
              />
            </div>
            <button type="submit" name="send" className="logInBtn">
              {t("login")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
