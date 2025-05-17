import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./CartCheck.css";
import "../../i18n";
import { useTranslation } from "react-i18next";

export default function CartCheck() {
  const [t] = useTranslation();

  const [orders, setOrders] = useState([]);
  const [allWatches, setAllWatches] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    const fetchAllWatches = async () => {
      try {
        const [mfRes, skmeiRes] = await Promise.all([
          fetch("/API/MiniFocus.JSON"),
          fetch("/API/SKMEI.JSON"),
        ]);

        const [mfData, skmeiData] = await Promise.all([
          mfRes.json(),
          skmeiRes.json(),
        ]);

        const combinedWatches = [...mfData.watches, ...skmeiData.watches];
        setAllWatches(combinedWatches);
      } catch (err) {
        console.error("Error fetching watches:", err);
      }
    };

    fetchAllWatches();
  }, []);

  const handleRemove = (codeToRemove) => {
    const updatedOrders = orders.filter((code) => code !== codeToRemove);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const orderedWatches = allWatches.filter((watch) =>
    orders.includes(watch.code)
  );

  return (
    <>
      <Navbar />
      <div className="cartCheck container mt-4">
        <h2>{t("ordered")}</h2>
        {orderedWatches.length === 0 ? (
          <p>{t("emptyCart")}</p>
        ) : (
          <div className="row">
            {orderedWatches.map((watch) => (
              <div className="col-12 col-md-4 col-lg-3 mb-4" key={watch.code}>
                <div className="card h-100 text-center">
                  <img
                    src={watch.images[0]}
                    className="card-img-top"
                    alt={watch.model}
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {watch.brand?.en || watch.brand}{" "}
                      {typeof watch.model === "object"
                        ? watch.model.en
                        : watch.model}
                    </h5>
                    <p className="price">
                      {watch.price?.discount_percentage > 0 ? (
                        <>
                          <span className="text-muted text-decoration-line-through me-2">
                            {watch.price.original} {watch.price.currency}
                          </span>
                          <span className="text-success fw-bold">
                            {watch.price.final} {watch.price.currency}
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold">
                          {watch.price.final} {watch.price.currency}
                        </span>
                      )}
                    </p>

                    <button
                      className="removeBtn"
                      onClick={() => handleRemove(watch.code)}
                    >
                      {t("removeFromCart")}
                    </button>
                    <button className="details">
                      <Link to="/product_details" state={{ watch }}>
                        {t("details")}
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="toCartBtn">
          <Link to={"/cart"}>{t("to cart")}</Link>
        </button>
      </div>
    </>
  );
}
