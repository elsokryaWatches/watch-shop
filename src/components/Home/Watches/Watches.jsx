import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Watches.css";
import "../../../i18n";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

export default function Watches() {
  const [t] = useTranslation();
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "watches"));
        const allWatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const shuffled = allWatches.sort(() => 0.5 - Math.random());
        const randomWatches = shuffled.slice(0, 5);
        setWatches(randomWatches);
        setLoading(false);
      } catch (error) {
        console.log("failed to load watches from firestore", error);
        setError("could not load watches. please try again");
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  if (loading) {
    return (
      <div className="watches homeSecAnimation">
        <div className="container-fluid">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watches homeSecAnimation">
        <div className="container-fluid">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </div>
    );
  }

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
                <div
                  className="watch homeSecAnimation col-lg-2 col-10"
                  key={watch.id}
                >
                  <Link to={`/product_details/${watch.code}`} state={{ watch }}>
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
