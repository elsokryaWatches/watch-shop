import "./Wallets.css";
import "../../i18n";
import { useTranslation } from "react-i18next";

export default function Wallets() {
  const [t] = useTranslation();

  return (
    <>
      <div className="wallets">
        <h1>{t("soon")}</h1>
      </div>
    </>
  );
}
