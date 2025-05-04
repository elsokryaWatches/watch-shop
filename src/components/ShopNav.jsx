import { Link, useLocation } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";

export default function ShopNav() {
  const [t] = useTranslation();
  const location = useLocation();

  const buttons = [
    { path: "/men", text: "men watches" },
    { path: "/women", text: "women watches" },
    { path: "/young", text: "young watches" },
    { path: "/wallets", text: "wallets" },
  ];

  return (
    <div className="navModels col-12">
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
