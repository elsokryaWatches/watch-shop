import "./Watches.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Watches() {
  const [t] = useTranslation();

  return (
    <>
      <div className="watches homeSecAnimation">
        <div className="container-fluid">
          <div className="watchesInner row">
            <div className="watchesHeader col-12">
              <h2>{t("watches")}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
