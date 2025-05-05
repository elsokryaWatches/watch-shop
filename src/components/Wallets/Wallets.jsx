import "./Wallets.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function Wallets() {
  const [t] = useTranslation();

  return (
    <>
      <Helmet>
        <title>Watch Shop - Wallets Collection</title>
      </Helmet>
      <div className="wallets">
        <h1>{t("soon")}</h1>
      </div>
    </>
  );
}
