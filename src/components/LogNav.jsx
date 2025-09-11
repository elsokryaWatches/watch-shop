import { Link, useLocation } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";

export default function ShopNav() {
  const [t] = useTranslation();
  const location = useLocation();

  const buttons = [
    { path: "/login", text: "login" },
    { path: "/signup", text: "signup" },
  ];

  return (
    <div className="navLogs col-12">
      {buttons.map((button) => (
        <button
          key={button.path}
          className={`navBtn ${
            location.pathname === button.path ? "selected" : ""
          }`}
        >
          <Link to={button.path}>{t(button.text)}</Link>
        </button>
      ))}
    </div>
  );
}
