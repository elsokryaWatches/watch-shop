import "./Log_in.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const handleLogIn = async (e) => {
  e.preventDefault();
  StorageError("");
};

export default function Log_in() {
  const [t, i18n] = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("sucessfull login");
      navigate("/admin");
    } catch (firebaseError) {
      let errorMessage = "An unknown error occurred.";
      switch (firebaseError.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage =
            "Invalid credentials. Please check your username and password.";
          break;
        case "auth/invalid-credential":
          errorMessage =
            "Invalid credentials. Please check your username and password.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many failed login attempts. Please try again later.";
          break;
        default:
          errorMessage = firebaseError.message;
          break;
      }
      setError(errorMessage);
      console.error("Login error:", firebaseError.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>El Sokarya - Log in</title>
      </Helmet>
      <div className="logIn">
        <div className="container-fluid">
          <div className="logInInner row">
            <form
              className="loginForm col-lg-8 col-10 row"
              onSubmit={handleLogIn}
            >
              {error && (
                <p
                  className="error-message col-12"
                  style={{ color: "red", textAlign: "center" }}
                >
                  {error}
                </p>
              )}
              <div className="inputContainer row col-12">
                <label className="col-12" htmlFor="email">
                  {t("email")}
                </label>
                <input
                  className="col-12"
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputContainer row col-12">
                <label className="col-12" htmlFor="password">
                  {t("password")}
                </label>
                <input
                  className="col-12"
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="loginBtn">
                {t("login")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
