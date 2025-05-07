import "./shoes.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Shoes() {
  const [t] = useTranslation();

  return (
    <>
      <div className="shoes homeSecAnimation">
        <div className="container-fluid">
          <div className="shoesInner row">
            <div className="shoesHeader col-12">
              <h2>{t("shoes")}</h2>
            </div>
            <div className="shoesContents col-12">
              <h3>{t("soon")}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
