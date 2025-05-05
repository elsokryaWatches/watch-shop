import "./Wallets.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar/Navbar";

export default function Wallets() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>Watch Shop - Wallets Collection</title>
      </Helmet>
      <Navbar />
      <div className="wallets">
        <h1>{t("soon")}</h1>
      </div>
    </>
  );
}
