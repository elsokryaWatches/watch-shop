import "./Log_In.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";
import LogNav from "../LogNav";

export default function Log_In() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(t("allFieldsRequired"));
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === formData.email);

    if (!user) {
      setError(t("incorrectEmail"));
      return;
    }

    if (user.password !== formData.password) {
      setError(t("incorrectPassword"));
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        userName: user.userName,
        email: user.email,
      })
    );

    setFormData({
      email: "",
      password: "",
    });
    setError("");

    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>El Sokrya - Log In</title>
      </Helmet>
      <Navbar />
      <div className="logIn">
        <div className="container-fluid">
          <LogNav />
          <form className="logInForm" method="POST" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="inputContainer row">
              <label className="col-10" htmlFor="email">
                {t("email address")}
              </label>
              <input
                className="col-10"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" name="send" className="logInBtn">
              {t("login")}
            </button>
            <div className="toSignup">
              <h6>{t("loginBottom")}</h6>
              <Link to={"/signup"}>{t("signup")}</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
