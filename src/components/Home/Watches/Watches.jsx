import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Watches.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Watches() {
  const [t] = useTranslation();
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    fetch("API/SKMEI.JSON")
      .then((res) => res.json())
      .then((data) => {
        if (data?.watches) {
          setWatches(data.watches.slice(0, 5));
        }
      })
      .catch((err) => console.error("failed to load watches:", err));
  }, []);

  return (
    <>
      <div className="watches homeSecAnimation">
        <div className="container-fluid">
          <div className="watchesInner row">
            <div className="watchesHeader col-12">
              <h2>{t("watches")}</h2>
            </div>
            <div className="watchesContent row col-10">
              {watches.map((watch) => (
                <div className="watch col-lg-2 col-10" key={watch.id}>
                  <img
                    src={watch.images[0]}
                    alt={`${watch.brand.en} ${watch.model.en}`}
                  />
                </div>
              ))}
            </div>
            <div className="btns col-10">
              <button className="toShop">
                <Link to={"/shop"}>{t("shop")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
