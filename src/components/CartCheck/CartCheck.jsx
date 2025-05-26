import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./CartCheck.css";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function CartCheck() {
  const [t] = useTranslation();
  const [orders, setOrders] = useState([]);
  const [orderedWatches, setOrderedWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    const fetchOrderedWatches = async () => {
      try {
        setLoading(true);
        setError(null);

        if (orders.length === 0) {
          setOrderedWatches([]);
          setLoading(false);
          return;
        }

        const watchesRef = collection(db, "watches");
        const q = query(watchesRef, where("code", "in", orders));
        const querySnapshot = await getDocs(q);

        const watchesWithImages = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const watchData = { id: doc.id, ...doc.data() };

            let imageUrl = null;
            if (watchData.images && watchData.images.length > 0) {
              try {
                const imageRef = ref(storage, watchData.images[0]);
                imageUrl = await getDownloadURL(imageRef);
              } catch (error) {
                console.error(`Error fetching image for ${doc.id}:`, error);
              }
            }

            return {
              ...watchData,
              firstImageUrl: imageUrl,
            };
          })
        );

        setOrderedWatches(watchesWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ordered watches:", error);
        setError("Failed to load watches. Please try again.");
        setLoading(false);
      }
    };

    fetchOrderedWatches();
  }, [orders]);

  const handleRemove = (codeToRemove) => {
    const updatedOrders = orders.filter((code) => code !== codeToRemove);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="cartCheck container">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="cartCheck container">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </>
    );
  }

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
                  {watch.firstImageUrl ? (
                    <img
                      src={watch.firstImageUrl}
                      className="card-img-top"
                      alt={watch.model?.en || watch.model}
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                      onContextMenu={(e) => e.preventDefault()}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/imgs/placeholder.jpg";
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      {t("noImageAvailable")}
                    </div>
                  )}
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
                      <Link
                        to={`/product_details/${watch.code}`}
                        state={{ watch }}
                      >
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
        <button className="toShopBtn">
          <Link to={"/shop"}>{t("shop")}</Link>
        </button>
      </div>
    </>
  );
}
