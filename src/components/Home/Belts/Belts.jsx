import "./Belts.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Belts() {
  const [t] = useTranslation();

  return (
    <>
      <div className="belts homeSecAnimation">
        <div className="container-fluid">
          <div className="beltsInner row">
            <div className="beltsHeader col-12">
              <h2>{t("belts")}</h2>
            </div>
            <div className="beltsContents col-12">
              <h3>{t("soon")}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
