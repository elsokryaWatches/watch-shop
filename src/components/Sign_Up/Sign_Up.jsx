import "./Sign_Up.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";
import LogNav from "../LogNav";

export default function Sign_Up() {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
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

    if (!formData.userName || !formData.email || !formData.password) {
      setError(t("allFieldsRequired"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("invalidEmail"));
      return;
    }

    if (formData.password.length < 6) {
      setError(t("invalidPassword"));
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setError(t("usernameExist"));
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    setFormData({
      userName: "",
      email: "",
      password: "",
    });
    setError("");

    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>El Sokrya - Sign Up</title>
      </Helmet>
      <Navbar />
      <div className="signup">
        <div className="container-fluid">
          <LogNav />
          <form className="signupForm" method="POST" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="inputContainer row">
              <label className="col-10" htmlFor="username">
                {t("username")}
              </label>
              <input
                className="col-10"
                type="text"
                id="username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
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
            <button type="submit" name="send" className="signUpBtn">
              {t("signup")}
            </button>
            <div className="toLogin">
              <h6>{t("signupBottom")}</h6>
              <Link to={"/login"}>{t("login")}</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
