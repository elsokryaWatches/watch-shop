import { Link } from "react-router-dom";
import "../i18n";
import { useTranslation } from "react-i18next";

export default function shopNav() {
  const [t] = useTranslation();

  return (
    <>
      <div className="navModels col-12">
        <button className="navBtn">
          <Link to={"/men"}>{t("men watches")}</Link>
        </button>
        <button className="navBtn">
          <Link to={"/women"}>{t("women watches")}</Link>
        </button>
        <button className="navBtn">
          <Link to={"/young"}>{t("young watches")}</Link>
        </button>
        <button className="navBtn">
          <Link to={"/wallets"}>{t("wallets")}</Link>
        </button>
      </div>
    </>
  );
}
