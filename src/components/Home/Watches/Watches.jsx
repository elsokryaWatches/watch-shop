import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Watches.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";

export default function Watches() {
  const [t] = useTranslation();
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const [skmeiRes, miniFocusRes] = await Promise.all([
          fetch("API/SKMEI.JSON"),
          fetch("API/MiniFocus.JSON"),
        ]);

        const [skmeiData, miniFocusData] = await Promise.all([
          skmeiRes.json(),
          miniFocusRes.json(),
        ]);

        const allWatches = [
          ...(skmeiData?.watches || []),
          ...(miniFocusData?.watches || []),
        ];

        const shuffled = allWatches.sort(() => 0.5 - Math.random());

        const randomWatches = shuffled.slice(0, 5);

        setWatches(randomWatches);
      } catch (error) {
        console.error("Failed to load watches:", error);
      }
    };

    fetchWatches();
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
                  <Link to={"/product_details"} state={{ watch }}>
                    <img
                      src={watch.images[0]}
                      alt={`${watch.brand.en} ${watch.model.en}`}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </Link>
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
