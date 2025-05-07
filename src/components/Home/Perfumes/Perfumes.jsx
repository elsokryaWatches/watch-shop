import "./Perfumes.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Perfumes() {
  const [t] = useTranslation();

  return (
    <>
      <div className="perfumes homeSecAnimation">
        <div className="container-fluid">
          <div className="perfumesInner row">
            <div className="perfumesHeader col-12">
              <h2>{t("perfumes")}</h2>
            </div>
            <div className="perfumesContents col-12">
              <h3>{t("soon")}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
