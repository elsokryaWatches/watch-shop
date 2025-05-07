import "./Wallets.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Wallets() {
  const [t] = useTranslation();

  return (
    <>
      <div className="wallets homeSecAnimation">
        <div className="container-fluid">
          <div className="walletsInner row">
            <div className="walletsHeader col-12">
              <h2>{t("wallets")}</h2>
            </div>
            <div className="walletsContents col-12">
              <h3>{t("soon")}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
